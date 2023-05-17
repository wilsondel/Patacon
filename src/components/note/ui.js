// logica interfaz


import {saveNotes, deleteNote, getNoteById, updateNote} from "./socket.js";


const notesList = document.querySelector('#notes')
const title = document.querySelector("#title")
const description = document.querySelector("#description")

let savedId = "";

const noteUI = note => {
    const div = document.createElement('div')
    div.innerHTML = ` 
        <div class="note">
            <div class="title-note">
                <h1>${note.title}</h1>
                <span id= "heart" class="material-symbols-outlined">favorite</span>
            </div>
            <div class="noteDescription">${note.description}</div>
            <div class ="icon">
                <span class="material-symbols-outlined update" data-id="${note._id}" > edit</span>
                <span class="material-symbols-outlined delete" data-id="${note._id}" >delete</span>
            </div>
            
        </div>
    `
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');
    const btnHeart = div.querySelector('#heart');
    
    
    
    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id))
    btnHeart.addEventListener('click', e => btnHeart.style.color = 'red')
    
    const noteMove = div.querySelector('.note');

    noteMove.onclick= function(event) {
        // (1) preparar para mover: hacerlo absoluto y ponerlo sobre todo con el z-index
        noteMove.style.position = 'absolute';
        noteMove.style.zIndex = 1000;
      
        // quitar cualquier padre actual y moverlo directamente a body
        // para posicionarlo relativo al body
        document.body.append(noteMove);
      
        // centrar la pelota en las coordenadas (pageX, pageY)
        function moveAt(pageX, pageY) {
          noteMove.style.left = pageX - noteMove.offsetWidth / 2 + 'px';
          noteMove.style.top = pageY - noteMove.offsetHeight / 2 + 'px';
        }
      
        // mover nuestra pelota posicionada absolutamente bajo el puntero
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) mover la pelota con mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) soltar la pelota, quitar cualquier manejador de eventos innecesario
        noteMove.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          noteMove.onmouseup = null;
        };
      
      };


      noteMove.ondragstart = function() {
        return false;
      };

    return div
} 



//const [searchText,setSearchText] = useState('');

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