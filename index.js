const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./generateMarkdown.js");
const fs = require("fs");
// array of questions for user
const questions = [{
        type: "input",
        message: "File path to save the file? Please include the name of the file",
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
        message: "Is there a link for the deployed Project?",
        name: "deployedLink"
    },
    {
        type: "input",
        message: "Would you like to add media to demo the project?",
        name: "demoMedia"
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
        message: "Which license would you like this evening?",
        name: "license",
        choices: [
            'License 1',
            'License 2',
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
    const queryUrl = `https://api.github.com/users/${response.github}/repos?per_page=100`;
    axios.get(queryUrl).then(function (res) {
        response.github = res.data[0].owner.html_url;
        return response
    })
}

function getLicenseData(response) {

}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then(getLicenseData(response)
            .then(getGithubURL(response)
                .then(writeToFile(response))));
}
// function call to initialize program
init();