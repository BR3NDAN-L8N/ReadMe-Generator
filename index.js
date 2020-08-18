const inquirer = require("inquirer");
const generateMarkdown = require("./generateMarkdown.js");
// array of questions for user
const questionsText = inquirer.prompt([{
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
            name: "installation"
        },
        {
            type: "input",
            message: "Instructions for usage?",
            name: "usage"
        },
        {
            type: "input",
            message: "Would you like to add media to demo the project?",
            name: "demoMedia"
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
        }
    ])
    .then(function (response) {
        writeToFile(response);
    });

// function to write README file
function writeToFile(data) {
    fs.writeFile("ReadMe.md", generateMarkdown(data), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });
}

// function to initialize program
function init() {

}

// function call to initialize program
init();