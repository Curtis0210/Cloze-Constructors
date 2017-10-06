// Requires BasicCard constructor exported from BasicCard.js.
var BasicCard = require("./BasicCard.js");

// Constructor function for creating ClozeCard objects.
var ClozeCard = function(text, cloze) {

	// This is a scope-safe constructor.
	// First checks if object is a new instance, i.e., inckudes new operator.
	if (this instanceof ClozeCard) {

		this.fullText = text;
		this.cloze = cloze;

	// Creates partial text for Cloze flashcard.
	this.partial = function() {
		if (this.fullText.includes(this.cloze)) {
			return this.fullText.replace(this.cloze, '...');

		} else {
			// Broken cloze message returned when text doesn't contain cloze.
			var brokenClozeMessage = "'Oops! The full text: '" + this.fullText + "' doesn't contain the cloze: '" + this.cloze + "'.'";
			return brokenClozeMessage;
		}
	};
	// If the new operator missing, creates new instance of object correctly.

	} else {
		return new ClozeCard(text, cloze);
	}

};


// Test BasicCard constructor
	var firstPresident = new BasicCard("Who was the first president of the US?", "George Washington");
	console.log(firstPresident.front);
	console.log(firstPresident.back);

// Test ClozeCard constructor that works.
	var firstPresidentCloze = new Clozecard("George Wasington was the first president of the US.", "George Washington");
	console.log(firstPresidentCloze.fullText);
	console.log(firstPresidentCloze.cloze);
	console.log(firstPresidentCloze.partial());

// Test ClozeCard constructor when text doesn't contain cloze.
	var typoPresidentCloze = new ClozeCard("Barack Obama was the last president of the US.", "Barack Obama");
	console.log(typoPresidentCloze.fullText);
	console.log(typoPresidentCloze.cloze);
	console.log(typoPresidentCloze.partial());

// Test constructor is scope-safe.
	var missingNewCloze = ClozeCard("James Joyce wrote Ulysses", "James Joyce");
	console.log(missingNewCloze.fullText);
	console.log(missingNewCloze.cloze);
	console.log(misingNewCloze.partial());

// Export ClozeCard constructor which gets used in main.js
	module.exports = ClozeCard;