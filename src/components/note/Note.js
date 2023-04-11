import React, { useEffect } from 'react';
import io from 'socket.io-client';
import "./style.css"



function Note() {



    return (
    <div>
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