import Note from './Note'

let data;

function addNote(note){
    data.notes.push(note);
    persist();
}

function listNotes(){
    return data.notes;
}

function listDeletedNotes(){
    return data.deletedNotes;
}

function deleteNote(note){
    let currLen = data.notes.length;
    data.notes = data.notes.filter(n => n != note);
    if(currLen != data.notes.length){
        data.deletedNotes.push(note);
    }
    persist();
}

function emptyTrash(){
    data.deletedNotes = [];
}

function persist(){
    window.localStorage.setItem("goodnotes", 
        JSON.stringify(
            data
        )
    );
}

function loadPersistedState(){
    let storedData =  window.localStorage.getItem("goodnotes")
    if(storedData){
        storedData = JSON.parse(storedData);
        data = {
            notes: storedData.notes.map(obj => new Note(obj)),
            deletedNotes: storedData.deletedNotes.map(obj => new Note(obj))
        }
    }else{
        data = {notes:[],deletedNotes:[]}
    }
}

export {addNote, listNotes, deleteNote, loadPersistedState, emptyTrash, persist};