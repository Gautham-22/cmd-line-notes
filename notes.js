const fs = require("fs");
const chalk = require("chalk");

let notes = [], notesJSON;

const addNote = function (title,body) {
    if(title == "" || body == "") {
        console.log(chalk.red.bold("Error!") + "\t" + chalk.gray.bold("Cannot add a note with empty title or body"));
        return;
    }
    const note = { title, body };
    try {
        notes = readNotes();
    } catch(err) {
        console.log("Allocating new storage location...");
    }
    notes.push(note);
    saveNote();
}

const saveNote = function () {
    notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json",notesJSON);
}

const readNotes = function () {
    let buffer = fs.readFileSync("notes.json");
    return JSON.parse(buffer.toString());
}

module.exports = {
    addNote
}