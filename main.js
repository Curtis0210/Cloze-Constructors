// Requires ClozeCard constructor exported from ClozeCard.js.
var ClozeCard = require("./ClozeCard.js");

//Requires firebase module, so we can text storage in node.
var firebase = require("firebase");

// Intialize Firebase.
var config = {apiKey: "AIzaSyDBvuFiJZYPAza2wx8Xy636Cc4fQgfmCgo",
    authDomain: "curtisproject-72746.firebaseapp.com",
    databaseURL: "https://curtisproject-72746.firebaseio.com",
    projectId: "curtisproject-72746",
    storageBucket: "curtisproject-72746.appspot.com",
    messagingSenderId: "1018800762463"

};

firebase.initializeApp(config);

// Creates variable to reference the database.
var database = firebase.database();

// For now, until there's a front end, uses inquirer to add new cards from command.
var inquirer = require('inquirer');

// Captures full text and cloze for cards.
var questions = [
	{
		type: 'input',
		name: 'text',
		message: 'What is the for the Cloze Card?',
		default: function () {
			return 'Add your full text here.';
		}


	},
	{
		type: 'input',
		name: 'cloze',
		message: 'What is the cloze text for the Cloze Card?',
		default: function () {
			return 'Add part of your full text here.';
		}

	},
	{
		type: 'confirm',
		name: 'askAgain',
		message: 'Want to add another Cloze Card?',
		default: true



	}



];


// Uses recurrssion to keep asking questions.
// Stores new Cloze Card in firebase.
function ask() {
	inquirer.prompt(questions).then(function (answers){
		var newCloze = new ClozeCard(answers.text, answers.cloze);
		var fullText = newCloze.fullText;
		var cloze = newCloze.cloze;
		var partialText = newCloze.partial();

// Stores new card in Firebase database.
storeNewCloze(fullText, cloze, partialText);
if (answers.askAgain) {
	ask();

} else {
	console.log("Thanks for adding new flashcard(s)!");
}

	});


}

ask();

// Stores new card in Firebase database.
function storeNewCloze(fullText, cloze, partialText) {
	database.ref().push({
		fullText: fullText,
		cloze: cloze,
		partialText: partialText
	});
};