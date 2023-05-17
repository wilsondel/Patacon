import React from 'react';

import { Canva } from "../canva/Canva"
import { Note } from "../note/Note"



function Board({m_strUser}) {
        return (
    <>
        <Note /><br/>
        <Canva user={m_strUser}/><br/>
    </>
    );
}

export { Board };