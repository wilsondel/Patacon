import io from 'socket.io-client';


// funciones interactuar con backend

//el servidor esta en el localhost entonces no es necesario escribir la direccion 
//funcion conexion backend
const socket = io("http://localhost:9001/"); // puede enviar o escuchar eventos 
//console.log(socket);


export const loadNotes = (callback) => {
    socket.on("server:loadnotes", callback)
};

//emite evento para enviar datos de title, description, ...
export const saveNotes = (title, description) => {
    socket.emit('client:newnote', {
        title, description
    })
};

export const onNewNote = (callback) => {
    socket.on('server:newnote', callback);
};

export const deleteNote = id => {
    socket.emit('client:deletenote', id);
}

export const getNoteById = id => {
    socket.emit('client:getnote', id);
}

export const onSelected = (callback) => {
    socket.on('server:selectedNote', callback)
    
}

export const updateNote = (id, title, description) => {
    socket.emit('client:updateNote', {
            _id : id, 
            title, 
            description
        })
    
}