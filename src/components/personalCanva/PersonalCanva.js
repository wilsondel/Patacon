import React, { useEffect } from 'react';

function PersonalCanva() {

    
    
    useEffect(() => {
        const notesList = document.querySelector('#notes')
        const myPersonalNotes = document.querySelector('.myPersonalNotes')
        myPersonalNotes.innerHTML=notesList.innerHTML
    })

    return (
    <>
        <div className ="listNotes">

        </div>
    </>
    );
}

export { PersonalCanva };