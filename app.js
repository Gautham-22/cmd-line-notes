// console.log(process.argv); // to print command line arguments

const yargs = require("yargs");
const { addNote, removeNote, listNotes, readNote } = require("./notes");

yargs.command({  // add command
    command: "add",
    describe: "Add a note",
    builder: {  // object declaring the options the command accepts,
        title : {
            describe: "Title of the note",
            demandOption: true,
            type: "string"
        },
        body : {
            describe: "Body of the note",
            demandOption: true,
            type: "string"
        }   
    },
    handler(argv) {  // similar to handler: function() {}
        addNote(argv.title,argv.body);
    }
});

yargs.command({  // remove command
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
});

yargs.command({  // list command
    command: "list",
    describe: "List your notes",
    handler() {
        listNotes();
    }
});

yargs.command({  // read command
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
});

yargs.parse();