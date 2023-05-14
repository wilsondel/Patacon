import React, { useEffect } from 'react';
import io from 'socket.io-client';
import "./style.css"

import {loadNotes, onNewNote, onSelected} from './socket.js';
import {onHandleSubmit, renderNotes, appendNote,fillForm} from './ui.js';


function Note() {
    

    useEffect(() => {
        onNewNote(appendNote);
        loadNotes(renderNotes);
        onSelected(fillForm);
        // Form notes
        const noteForm = document.querySelector('#noteForm')
        noteForm.addEventListener('submit', onHandleSubmit)

    },[])

    return (
    <div>
        
    </div>
    );
}

export { Note };