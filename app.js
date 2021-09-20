// console.log(process.argv); // to print command line arguments

const yargs = require("yargs");

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
    handler: function(argv) {
        console.log("adding a note, ",argv);
    }
});

yargs.command({  // remove command
    command: "remove",
    describe: "Remove a note",
    handler: function() {
        console.log("removing a note")
    }
});

yargs.command({  // list command
    command: "list",
    describe: "List your notes",
    handler: function() {
        console.log("listing notes")
    }
});

yargs.command({  // read command
    command: "read",
    describe: "Read a note",
    handler: function() {
        console.log("reading a note")
    }
});

yargs.parse();