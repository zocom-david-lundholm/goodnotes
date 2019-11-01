import * as State from './state';
import Note from './Note'

const COLORS = ['lightblue', 'peachpuff', 'pink', 'powderblue', 'papayawhip', 'mistyrose', 'lavenderblush'];
const NOTE_CONTAINER = document.querySelector(".post-its");

function randomColor(){
    return COLORS[ Math.floor( Math.random()*COLORS.length )];
}

function renderNote(note){
    note.render();

    if(!document.body.contains(note.elements.root)){
        NOTE_CONTAINER.append(note.elements.root);
    }
}

function toggleLayout(){
    if(NOTE_CONTAINER.classList.contains("grid")){
        NOTE_CONTAINER.classList.remove("grid");
        NOTE_CONTAINER.classList.add("column");
    }else{
        NOTE_CONTAINER.classList.add("grid");
        NOTE_CONTAINER.classList.remove("column");
    }
}

function addNote(){
    let note = new Note();
    note.init();
    note.toggleEditMode(true);
    
    State.addNote(note);
    renderNote(note);
    
    note.focus();
}

function initUI(){
    document.querySelector(".controls .add")
        .addEventListener("click", addNote);

    document.querySelector(".controls .layout")
        .addEventListener("click", toggleLayout);

    State.listNotes()
        .forEach(note => {
            note.init();
            renderNote(note);
        });
}

function createColors(overlay){
    let colors = []
    let container = overlay.querySelector("section")
    for(let color of COLORS){
        let element = document.createElement("div")
        colors.push(element)
        element.style.backgroundColor = color
        element.classList.add("color")
        element.setAttribute("color", color)
        container.append(element)
    }
    return colors
}

function createColorPicker(){
    let overlay = document.createElement("div")
    let colorsContainer = document.createElement("section")
    overlay.classList.add("colors-overlay")
    colorsContainer.classList.add("colors")
    overlay.append(colorsContainer)
    document.body.append(overlay)
    return overlay
}

function pickColor(){
    return new Promise( (resolve, reject) => {
        let overlay = createColorPicker();
        let colors = createColors(overlay)
        colors.forEach( element => {
            element.addEventListener("click", () => {
                let color = element.getAttribute("color")
                overlay.remove()
                resolve(color)
            });
        })
        overlay.addEventListener("click", () => {
            reject()
            overlay.remove()
        })
    });
}


export { 
    randomColor, 
    renderNote, 
    initUI,
    toggleLayout,
    pickColor
};