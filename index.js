const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./generateMarkdown.js");
const fs = require("fs");

function LicenseData(owner, licenseText) {
    this.owner = owner;
    this.year = new Date().getFullYear;
    this.licenseText = licenseText;
}

let licenseApacheText = `

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

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
        name: "projectName",
        default: "Update Later"
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
        message: "Instructions for usage? Default: ",
        name: "usage",
        default: "Update Later"
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
        message: "What is your GitHub username? **REQUIRED**",
        name: "github",
        validate: function (input) {
            str = input.toString();
            if (str.length < 1) {
                return "You must enter a valid Github username or the program won't run";
            }
            return true;
        }
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
        .then(response => {
            getGithubURL(response);
            getLicenseData(response);
            writeToFile(response);
        });
}
// function call to initialize program
init();

// inquirer.prompt(questions)
//     .then(answers => {
//         // ... Do things here ...
//     });