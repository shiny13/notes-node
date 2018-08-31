//const os = require('os');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

/*var user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}. You are ${notes.age}. `, 
    function(err){
    if (err) {
        console.log('Unable to write to file');
    }
});*/

//Test method
/*var res = notes.addNote();
console.log(res);
console.log(`add result: ${notes.add(2,4)}`);*/

//lo dash examples 
/*console.log(`Shahnawaz isString: ${_.isString('Shahnawaz')}`);
console.log(`10 isString: ${_.isString(10)}`);
var filteredArray = _.uniq(['Anna', 1, 2, 'Anna', 1, 4, 2, 2, 3]);
console.log(filteredArray);*/

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
                .command('add', 'Add a new note', {
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('list', 'List all notes')
                .command('read', 'Read a note', {
                    title: titleOptions
                })
                .command('remove', 'Remove a note', {
                    title: titleOptions
                })
                .help()
                .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created!');
        notes.logNote(note);
    } else {
        console.log('Note already exists.');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found!');
        notes.logNote(note);
    } else {
        console.log('Note not found.');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note was not found';
    console.log(message);
} else {
    console.log('Command not recognised');
}
