import {randomColor, pickColor} from './ui';
import * as State from './state';

const NOTE_PROTOTYPE = document.querySelector(".post-it.prototype");

function Note(data={}){
    let root = NOTE_PROTOTYPE.cloneNode(true);
    root.classList.remove("prototype");
    
    let text = root.querySelector(".content");
    let textarea = root.querySelector("textarea");
    let editButton = root.querySelector(".edit-btn");
    let deleteButton = root.querySelector(".delete-btn");
    let colorButton = root.querySelector(".color-btn");
    
    let content = data.content || '';
    let backgroundColor = data.backgroundColor || randomColor();

    return {
        content,
        backgroundColor,
        elements: {root,text,textarea,editButton,deleteButton,colorButton},

        toggleEditMode(flag){
            if(flag){
                this.elements.root.classList.add("edit-mode");
                this.elements.textarea.focus();
            }else{
                this.elements.root.classList.remove("edit-mode");
            }
        },

        focus(){
            this.elements.textarea.focus()
        },

        remove(){
            this.elements.root.remove();
        },

        render(){
            this.elements.text.innerText = this.content;
            this.elements.textarea.value = this.content;
            this.elements.root.style.backgroundColor = this.backgroundColor;
        },

        init(){
            this.elements.editButton
                .addEventListener("click", () => {
                    this.toggleEditMode(true);
                })

            this.elements.deleteButton
                .addEventListener("click", () => {
                    this.remove();
                    State.deleteNote(this);
                })

            this.elements.colorButton
                .addEventListener("click", () => {
                    pickColor()
                    .then(color => {
                        this.backgroundColor = color
                        this.render()
                        State.persist()
                    })
                    .catch(error => console.log(error))
                })

            this.elements.root
                .addEventListener("focusout", event => {
                    this.content = this.elements.textarea.value;
                    this.elements.text.innerText = this.content;
                    this.toggleEditMode(false)
                    this.render();
                    State.persist();
                });
        
            this.elements.textarea
                .addEventListener("change", event => {
                    this.content = this.elements.textarea.value;
                });
        }
    };
}

export default Note;