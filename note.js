const fs= require('fs');

var fetchNotes= () => {
	try{
		var notesString= fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e){
		return [];
	}
};
var saveNotes= (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote= (title, body) => {
	var notes= fetchNotes();
	var note= {title, body};
  var duplicateNotes= notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
	  notes.push(note);
	  saveNotes(notes);
		return note;
  }
 };

var getAll= () => {
	return fetchNotes();
}

var readNote= (title) => {
	var notes= fetchNotes();
	var found= notes.filter((note) => note.title === title);
	return found[0];
}

var removeNote= (title) => {
	var notes= fetchNotes();
	//  """"Other Method""""
  // 	var found= notes.filter((title) => notes.title === title);
  // 	notes.pop(found);
  // 	saveNotes(notes);
 var filteredNotes= notes.filter((note) =>note.title !== title);
 saveNotes(filteredNotes);

   return notes.length !== filteredNotes.length;
};


var logNote= (note) => {
	console.log('---');
	console.log('Title: '+ note.title);
	console.log('Body: '+ note.body);
}
module.exports= {
	addNote,
	getAll,
	readNote,
	removeNote,
	logNote
};
