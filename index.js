const fs=require("fs");
const inquirer=require("inquirer");
const axios =require("axios");
// const html =require("./generateHTML.js");





const questions = [
     {
    type: "input",
    name:"username",
    message:"What's You're GitHub User Name? " ,
    
  },
  {
    type: "list",
    name:"favColor",
    message:"What's You're Favorate Color ? " ,
    choices: ["Red", "Pink", "Blue","Pink"],
    
  },


  
];


function writeToFile(fileName, data) {
 
}

function init() {

  
inquirer
.prompt(questions)
.then(function({username,favColor}) {
  console.log(username,favColor);
    
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    console.log(queryUrl);

    // axios
    //   .get(queryUrl)
    //   .then(function(res) {
    //     const repoNames = res.data.map(function(repo) {
    //       return repo.name;
    //     });

    //     const repoNamesStr = repoNames.join("\n");

    //     fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //       if (err) {
    //         throw err;
    //       }

    //       console.log(`Saved ${repoNames.length} repos`);
    //     }); 
    //   });
  });


    
}

init();








// ==============================================================================================================================
// ==============================================================================================================================
