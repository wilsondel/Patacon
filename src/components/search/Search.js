import React, { useState }  from "react";
import "./style.css"
import Swal from 'sweetalert2'

const Search = () =>{

    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = ()  => {

        const notesList = document.querySelector('#notes');
        if (String(notesList.innerHTML).includes(searchTerm)) {
            Swal.fire(
                'The note exists! 😄',
                'success'
            )
        } else {
            Swal.fire(
                'The note does not exist🤔',
                'warning'
            )
        }
    

    }


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

    return (
        <div className="search">
            <span className="material-symbols-outlined" onClick={handleClick}>search</span>
            <input 
            type="text" 
            placeholder="search...😏 "  
            value={searchTerm}
            onChange={handleInputChange}
            />
        </div>
    )


}

export  {Search} ;









