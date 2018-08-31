const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }
    catch(e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }

}
var getAll = () => {
    return fetchNotes();
}
var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title === title;
    });
    return filteredNotes[0];
}
var removeNote = (title) => {
    //fetch the notes
    var notes = fetchNotes();

    try {
        //filter notes, removing the one with title argument
        var filteredNotes = notes.filter((note) => note.title !== title);

        //Save new notes array
        saveNotes(filteredNotes);

        return notes.length !== filteredNotes.length;
    } catch(e) {
        return false;
    }
}

var logNote = (note) => {
    debugger;
    console.log('--------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log('--------------');
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}