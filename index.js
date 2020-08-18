const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./generateMarkdown.js");
// array of questions for user
const questions = [{
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
];

// function to write README file
function writeToFile(data) {

}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then(function (response) {
            console.log(response.github);
            const queryUrl = `https://api.github.com/users/${response.github}/repos?per_page=100`;

            axios.get(queryUrl).then(function (res) {
                    console.log(res.data[0].owner.avatar_url);
                    response.img = res.data[0].owner.avatar_url;
                    return response

                })
                .then(function (response) {
                    fs.writeFile("ReadMe.md", generateMarkdown(response), function (err) {
                        return err ? console.log(err) : console.log("Success!");
                    });
                    //then create template
                    //then fs write file

                });

        });
}
// function call to initialize program
init();