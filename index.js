const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");

function LicenseData(owner, licenseText) {
    this.owner = owner;
    this.year = new Date().getFullYear();
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
let licenseApacheBadge = '[![License][apache]][apache-url]';
let licenseApacheBadgeLink = '[apache]: https://img.shields.io/badge/License-Apache%20License%202.0-blue';
let licenseApacheBadgeUrl = '[apache-url]: http://www.apache.org/licenses/LICENSE-2.0';

let licenseMitText = `
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    `;
let licenseMitBadge = '[![License][mit]][mit-url]';
let licenseMitBadgeLink = '[mit]: https://img.shields.io/badge/License-The%20MIT%20License-blue';
let licenseMitBadgeUrl = '[mit-url]: https://opensource.org/licenses/MIT';

// array of questions for user
let questions = [{
        type: "input",
        message: "File path to save the file? Please include the name of the file. Defaults to './Output/ReadMe.md' in current folder.",
        name: "filePath",
        default: "./Output/ReadMe.md",
    },
    {
        type: "input",
        message: "What is the project's name? Default: ",
        name: "projectName",
        default: "Update Later"
    },
    {
        type: "input",
        message: "Any instructions for installation? Default: ",
        name: "installation",
        default: "There are no special instructions for installing, just clone repo."
    },
    {
        type: "input",
        message: "Instructions for usage? Default: ",
        name: "usage",
        default: "Update Later"
    },
    {
        type: "list",
        message: "Which license would you like this evening?",
        name: "license",
        choices: [
            'Apache License 2.0',
            'The MIT License',
        ],
    },
    {
        type: "input",
        message: "Enter your first and last name or company name to be added to the license. **REQUIRED**",
        name: "ownerName",
        validate: function (input) {
            str = input.toString();
            if (str.length < 1) {
                return "You must enter a valid name or the license will be invalid";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "Instructions for contributions? Default: ",
        name: "contribution",
        default: "After passing tests, check spelling/grammar and write clean code."
    },
    {
        type: "input",
        message: "Testing instructions? Default: ",
        name: "testing",
        default: "No tests, just don't break anything."
    },
    {
        type: "input",
        message: "What is your GitHub username? You must enter a valid Github username or the program won't run **REQUIRED**",
        name: "github",
        validate: function (input) {
            str = input.toString();
            if (str.length < 3) {
                return "Your username is too short.";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is your email? Default: ",
        name: "email",
        default: "Update later"
    },
    {
        type: "input",
        message: "Would you like to enter a LinkedIn URL? Default: ",
        name: "linkedIn",
        default: "Update later"
    },
    {
        type: "input",
        message: "Would you like to enter any acknowledgements? Default: ",
        name: "thanks",
        default: "Update later"
    },
];



// AXIOS THE GITHUB URL
function getGithubURL(response) {
    const queryUrl = `https://api.github.com/users/${response.github}/repos?per_page=1`;
    axios.get(queryUrl).then(function (res) {
        response.github = res.data[0].owner.html_url;
        getLicenseData(response);
    })
}

// COMPILES INFO FOR THE LICENSE
function getLicenseData(response) {
    let license = '';
    let badge = '';
    if (response.license === "Apache License 2.0") {
        license = licenseApacheText;
        badge = licenseApacheBadge;
        licenseLink = licenseApacheBadgeLink;
        badgeUrl = licenseApacheBadgeUrl;
    } else {
        license = licenseMitText;
        badge = licenseMitBadge;
        licenseLink = licenseMitBadgeLink;
        badgeUrl = licenseMitBadgeUrl;
    }
    response.license = new LicenseData(response.ownerName, license);
    response.badge = badge;
    response.licenseLink = licenseLink;
    response.badgeUrl = badgeUrl;

    writeToFile(response);
}

// function to write README file
function writeToFile(response) {
    fs.writeFile(response.filePath, generateMarkdown(response), function (err) {
        return err ? console.log(err) : console.log("You should be all set!");
    });
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then(response => {
            getGithubURL(response)
        });
}

// function call to initialize program
init();