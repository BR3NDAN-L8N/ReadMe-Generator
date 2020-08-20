const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./generateMarkdown.js");
const fs = require("fs");

LicenseData = (owner, licenseText) => {
    this.owner = owner;
    this.year = new Date().getFullYear;
    this.licenseText = licenseText;
}

let licenseApacheText = `
        Copyright ${this.year} ${this.owner} 

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
            http://www.apache.org/licenses/LICENSE-2.0
        
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
    `;
let licenseMitText = `
        Begin license text.
        
        Copyright ${this.year} ${this.owner}

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

        End license text.
    `;
// array of questions for user
let questions = [{
        type: "input",
        message: "File path to save the file? Please include the name of the file. Defaults to 'ReadMe.md' in current folder.",
        name: "filePath",
        default: "ReadMe.md",
    },
    {
        type: "input",
        message: "What is the project's name?",
        name: "projectName"
    },
    {
        type: "input",
        message: "Enter your first and last name or company name.",
        name: "ownerName"
    },
    {
        type: "input",
        message: "Any instructions for installation?",
        name: "installation",
        default: "There are no special instructions for installation."
    },
    {
        type: "input",
        message: "Instructions for usage?",
        name: "usage"
    },
    {
        type: "list",
        message: "Which license would you like this evening? Default is MIT license.",
        name: "license",
        choices: [
            'Apache License 2.0',
            'The MIT License',
        ],
    },
    {
        type: "input",
        message: "Instructions for contributions?",
        name: "contribution"
    },
    {
        type: "input",
        message: "Testing instructions?",
        name: "testing"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "Would you like to enter a LinkedIn URL?",
        name: "linkedIn"
    },
    {
        type: "input",
        message: "Would you like to enter any acknowledgements?",
        name: "thanks"
    },
];

// function to write README file
function writeToFile(response) {
    fs.writeFile(response.filePath, generateMarkdown(response), function (err) {
        return err ? console.log(err) : console.log("You should be all set!");
    });
}

function getGithubURL(response) {
    getLicenseData(response);
    const queryUrl = `https://api.github.com/users/${response.github}/repos?per_page=100`;
    axios.get(queryUrl).then(function (res) {
        response.github = res.data[0].owner.html_url;
        return response
    })
}

function getLicenseData(response) {
    let license = '';
    if (response.license === "Apache License 2.0") {
        license = licenseApacheText;
    } else {
        license = licenseMitText;
    }
    response.license = new LicenseData(response.ownerName, license)
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
            .then(getGithubURL(response)
                .then(writeToFile(response, license)));
}
// function call to initialize program
init();