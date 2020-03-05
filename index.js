const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf  = require("./pdf.js");
const generateHTML = require("./generateHTML.js");


function writeToFile(fileName, user, color, stars) {
    fs.writeFile(fileName, generateHTML.generateHTML(user, color, stars), function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("developer profiled");
        }
    })
}

const questions = [
    "Enter your GitHub username",
    "Choose your favourite color"
];

function init() {
    inquirer.prompt([ {
        name:"username",
        message:questions[0]
      },
    {
        type: "list",
        name: "color",
        message: questions[1],
        choices: ["green", "blue", "pink", "red"]
    }
    ]).then(answers => {
console.log(`Username: ${answers.username}
Favourite color: ${answers.color}`)
axios.all([axios.get(`https://api.github.com/users/${answers.username}`),
axios.get(`https://api.github.com/users/${answers.username}/starred`)])
    .then( responses => {
        writeToFile(`${answers.username}.html`, 
        answers.color, 
        responses[0].data, 
        responses[1].data.length);
    })
    .catch(function(error) {
        console.log(error);
    })

    pdf.createPDF(answers.username);
});
}

init();
