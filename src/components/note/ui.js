// logica interfaz


import {saveNotes, deleteNote, getNoteById, updateNote} from "./socket.js";


const notesList = document.querySelector('#notes')
const title = document.querySelector("#title")
const description = document.querySelector("#description")

let savedId = "";

const noteUI = note => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${note.title}</h1>
            <div>
                <button class="delete" data-id="${note._id}"> Delete </button>
                <button class="update" data-id="${note._id}"> Update </button>
            </div>
            <p>${note.description}</p>
        </div>
    `
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');
    
    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id))
    
    return div
} 


export const renderNotes = notes => {
    notesList.innerHTML="";
    // A cada nota, le asgina un elmento div
    // lista de notas recorro por cada nota el elemento notelist le añado una porcion de nota
    notes.forEach(note => notesList.append(noteUI(note)))
    
    

}

export const fillForm = note => {
    title.value = note.title;
    description.value = note.description;
    savedId = note._id;
}


// maneja el evento de enviar
export const onHandleSubmit = (event) => {
    // quitar evento de refrescar pagina cuando se envia
    event.preventDefault();
    if(savedId) {
        console.log("Updating");
        updateNote(savedId, title.value, description.value)
    } else {
        saveNotes(title.value, description.value);
    }

    // limpiar los campos
    savedId ="";
    title.value ="";
    description.value ="";
    
};

export const appendNote = note =>{
    notesList.append(noteUI(note));
}