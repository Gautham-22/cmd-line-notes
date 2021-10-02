const fs = require("fs");
const chalk = require("chalk");

let notes = [], notesJSON;

const addNote = (title,body) => {
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
    console.log(chalk.green.inverse("Successfully added note!"));
    saveNotes();
}

const removeNote = (title) => {
    if(title == "") {
        console.log(chalk.red.bold("! ") + chalk.gray.bold(" Cannot remove a note with empty title"));
        return;
    }
    try {
        notes = readNotes();
        let length = notes.length;
        notes = notes.filter((note) => note.title != title);
        if(length == notes.length) {
            console.log(chalk.red.inverse("No note found!"));
            return;
        }
    } catch(err) {
        console.log(chalk.red.inverse("No note found!"));
        return;
    }
    console.log(chalk.green.inverse("Successfully removed note!"));
    saveNotes();
}

const listNotes = () => {
    try {
        notes = readNotes();
        if(!notes.length) {
            console.log(chalk.red.inverse("No notes found!"));
            return;
        }
        console.log(chalk.inverse("Your notes:"));
        notes.forEach(note => console.log((note.title)));
    } catch(err) {
        console.log(chalk.red.inverse("No notes found!"));
    }
}

const readNote = (title) => {
    if(title == "") {
        console.log(chalk.red.bold("Error!") + "\t" + chalk.gray.bold("Cannot find a note with empty title"));
        return;
    }
    try {
        notes = readNotes();
        let foundNote = notes.find((note) => note.title == title);
        if(!foundNote) {
            console.log(chalk.red.inverse("No note found with given title!"));
            return;
        }
        console.log(chalk.inverse(foundNote.title));
        console.log(foundNote.body);
    } catch(err) {
        console.log(chalk.red.inverse("No notes found!"));
    }
}

const saveNotes = () => {
    notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json",notesJSON);
}

const readNotes = () => {
    let buffer = fs.readFileSync("notes.json");
    return JSON.parse(buffer.toString());
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}