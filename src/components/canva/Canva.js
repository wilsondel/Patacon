import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';
import "./style.css"
import { Search } from "../search/Search"


function Canva(props) {

    const [drawing, setDrawing] = useState(false)
    const [erase, setErase] = useState(false)

    useEffect(() => {
        let mouse = {
            click:false,
            move:false,
            pos: {x: 0, y: 0},
            pos_prev: false,
        };
        
        //Canvas
        const canvas = document.getElementById('drawing');
        const context = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight;
            
       

        canvas.width =  canvas.parentNode.clientWidth;
        canvas.height = canvas.parentNode.clientHeight;
        
        context.font = '50px Bebas Neue, sans-serif';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText('Canvas', canvas.width/2, 50);
        
        
        // Socket IO
        const socketClient = io("http://localhost:3000/");
    
    
    
        canvas.addEventListener('mousedown', (e) => { // cuando presiona click
            mouse.click = true;
        })
    
        canvas.addEventListener('mouseup', (e) => { // cuando deja de presionar click
            mouse.click = false;
        })
    
        canvas.addEventListener('mousemove', (e) => { // cuando mueve el mouse
            mouse.pos.x = e.clientX / width;
            mouse.pos.y = e.clientY / height;
            mouse.move = true;
            console.log(mouse);
        })
    
        socketClient.on('draw_line', data => {
            const line = data.line;
            context.beginPath();
            context.lineWith = 2; //ancho linea
            context.moveTo(line[0].x *width, line[0].y * height); // propiedad .x relativo tamaño pantalla *
            context.lineTo(line[1].x *width, line[1].y * height);
            context.stroke();
        });


        socketClient.on('erase_line', data => {
            const line = data.line;
            context.beginPath();
            context.lineWith = 2; //ancho linea
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
        });
    
        function mainLoop(){
            // primera vez no entra
            if (mouse.click && mouse.move && mouse.pos_prev && drawing){
                    socketClient.emit("draw_line", {line: [mouse.pos, mouse.pos_prev] } ) //primer pos => posicion previa / seguda => pos actual
                    mouse.move = false;
            }
            if (erase) {
                socketClient.emit("erase_line", {line: [mouse.pos, mouse.pos_prev] } ) 
                setErase(false)

            }
            // primera vez obtiene posicion para eventualmente enviarla con el if anterior al servidor
            mouse.pos_prev = {x: mouse.pos.x, y:mouse.pos.y};
            setTimeout(mainLoop, 25);
            
        }
        mainLoop();
    },[drawing,erase]);


    const handleClickDraw = () => {
        setErase(false)
        setDrawing(!drawing)
    }

    const handleClickErase= () => {
        setErase(true)
    }

    return(
    <div className='grid-container'>
         
        <Search />
        <div className="canvasContainer"> 
            <canvas id="drawing" className="canvas"></canvas> 
        </div> 
        <div className="mainHome">
        <br/>
        <h2> Life-Board </h2>
            
            <button class="home-button" onClick={handleClickDraw}><span class="material-symbols-outlined">brush</span>Draw</button>
            <button class="home-button" onClick={handleClickErase} ><span class="material-symbols-outlined">backspace</span>Erase</button>
            <br/>
            <div class="buttonAccount"><span class="material-symbols-outlined">account_circle</span>{props.user}</div> 
        </div> 
        
        <div className="mainNote"><h2><br/>Personal Canva</h2></div>
    </div>  
    );
}

export { Canva };