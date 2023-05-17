// logica interfaz


import {saveNotes, deleteNote, getNoteById, updateNote} from "./socket.js";


const notesList = document.querySelector('#notes')
const title = document.querySelector("#title")
const description = document.querySelector("#description")

let savedId = "";

const colors = ['#FEFAB9','#E0BAB9','#EAE2D7','#CCDCE2','#D2E1D0'];

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
            <div class ="button-container">
            <button class ="btn-color"> <img src="color.png" alt="botonColor"></button>
            <button class ="btn-move-hand"> <img src="move.png" alt="botonMove"> </button>
            </div>
        </div>
        <button class ="btn-stop-hand"> Stop note </button>
    `
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');
    const btnHeart = div.querySelector('#heart');
    
    const btnColor = div.querySelector('.btn-color');
    
    
    const noteMove = div.querySelector('.note');
    

    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id))
    btnHeart.addEventListener('click', e => btnHeart.style.color = 'red')
    btnColor.addEventListener('click', e => noteMove.style.background = getNextColor())
    
    const noteDescription = div.querySelector('.note');
    const btnMoveHand = div.querySelector('.btn-move-hand');
    const btnStopHand = div.querySelector('.btn-stop-hand');

    btnMoveHand.addEventListener('click', e => {

    noteDescription.onmousedown= function(event) {
        // (1) preparar para mover: hacerlo absoluto y ponerlo sobre todo con el z-index
        noteDescription.style.position = 'absolute';
        noteDescription.style.zIndex = 1000;
      
        // quitar cualquier padre actual y moverlo directamente a body
        // para posicionarlo relativo al body
        document.body.append(noteDescription);
      
        // centrar la pelota en las coordenadas (pageX, pageY)
        function moveAt(pageX, pageY) {
          noteDescription.style.left = pageX - noteDescription.offsetWidth / 2 + 'px';
          noteDescription.style.top = pageY - noteDescription.offsetHeight / 2 + 'px';
        }
      
        // mover nuestra pelota posicionada absolutamente bajo el puntero
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) mover la pelota con mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) soltar la pelota, quitar cualquier manejador de eventos innecesario
        noteDescription.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          noteDescription.onmouseup = null;
        };
      
      };


      noteDescription.ondragstart = function() {
        return false;
      };
    })


    btnStopHand.addEventListener('click', e => {

        noteDescription.onmousedown= function(event) {};
          noteDescription.ondragstart = function() {};
        })

    return div
} 


let currentIndex = 0;
const getNextColor = () => {
    const color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length; // Actualizar el índice
    return color;
  };

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