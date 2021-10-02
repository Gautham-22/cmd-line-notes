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
    console.log(chalk.green.bold("Successfully added note!"));
    saveNotes();
}

const removeNote = function(title) {
    if(title == "") {
        console.log(chalk.red.bold("! ") + chalk.gray.bold(" Cannot remove a note with empty title"));
        return;
    }
    try {
        notes = readNotes();
        let length = notes.length;
        notes = notes.filter((note) => note.title != title);
        console.log(notes);
        if(length == notes.length) {
            console.log(chalk.red.bold("! ") + chalk.gray.bold(` There is no note with title ${title}`));
            return;
        }
    } catch(err) {
        console.log(chalk.red.bold("! ") + chalk.gray.bold(" You haven't added any notes"));
        return;
    }
    console.log(chalk.green.bold("Successfully removed note!"));
    saveNotes();
}

const saveNotes = function () {
    notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json",notesJSON);
}

const readNotes = function () {
    let buffer = fs.readFileSync("notes.json");
    return JSON.parse(buffer.toString());
}

module.exports = {
    addNote,
    removeNote
}