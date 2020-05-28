const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");
const util = require("util");
const convertFactory = require('electron-html-to');
const writeFileAsync = util.promisify(fs.writeFile);
const questions = [
  {
    type: "input",
    name: "username",
    message: "What's You're GitHub User Name? ",

  },
  {
    type: "list",
    name: "favColor",
    message: "What's You're Favorate Color ? ",
    choices: ["red", "pink", "blue", "pink"],

  },

];

function promptUser() {
  return inquirer.prompt(questions);
};

function apiCall(username) {
  const queryUrl = `https://api.github.com/users/${username}`;
  return axios.get(queryUrl);
};

function writeToFile(filePath, htmlString) {
  const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });

  conversion({ html: htmlString }, function (err, result) {
    if (err) throw err;

    result.stream.pipe(fs.createWriteStream(filePath));
    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  });
};

async function init() {
  try {
    const answers = await promptUser();
    //  console.log(answers);
    const apiResponse = await apiCall(answers.username);
    //  console.log(apiResponse);
    const data = apiResponse.data;
    data.color = answers.favColor;

    const htmlString = generateHTML(data);

    //create an html file so we can check our work before we convert to a pdf
    await writeFileAsync("./index.html", htmlString);
    //errors will be caught below, otherwise, this console.log will run:
    console.log("made a new file!");

    writeToFile("./portfolio.pdf", htmlString);

  }
  catch (error) {
    throw error;
  }
}

init();




