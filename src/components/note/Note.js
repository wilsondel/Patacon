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
        <h1>Test</h1>
        <form id="noteForm">
            <label for="title" type="text">Title</label>
            <input type="text" id="title" name="title" /><br/><br/>
            <textarea type="text" id="description" rows="4"></textarea>
            <button>Send</button>
        </form>
        <ul id="notes"></ul>

    </div>
    );
}

export { Note };