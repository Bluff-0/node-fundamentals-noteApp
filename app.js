const fs= require('fs');
const _= require('lodash');
const yargs= require('yargs');
const notes= require('./note.js');
const titleOptions={
	describe: 'Title of note',
	demand: true,
	alias: 't'
}
const bodyOptions= {
	describe: 'Body of the Note',
	demand: true,
	alias: 'b'
}
// var command= process.argv[2];
const argv= yargs
									.command('add','Add a New Note', {
										title: titleOptions,
										 body: bodyOptions
									})
									.command('list', 'List all Notes')
									.command('read', 'Read all Notes',{
										title:titleOptions
									})
									.command('remove', 'Remove a Note', {
										title: titleOptions,
									})
									.help()
									.argv;
var command= argv._[0];


if (command === 'add') {
	note= notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note Created');
		notes.logNote(note);
	} else {
		console.log('Note title taken')
	}
} else if (command === 'list'){
	var allNotes= notes.getAll();
	console.log('Printing ', allNotes.length, 'note(s)');
	allNotes.forEach((note)=> notes.logNote(note));
} else if (command === 'read') {
	var reading= notes.readNote(argv.title);
  if(reading){
		console.log('Note Found');
		notes.logNote(reading);
	} else {
		console.log(argv.title,' Not Found');
	}
} else if (command === 'remove') {
	var noteRemove= notes.removeNote(argv.title);
	var message= noteRemove ? 'Note was Removed' : 'Note not Found';
	console.log(message);
} else {
	console.warn('Command note recognized');
}
