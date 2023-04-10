import React, { useEffect } from 'react';
import io from 'socket.io-client';
import "./style.css"

function Canva() {

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
    
    
    
        canvas.width =  window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.7;
        
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
    
        function mainLoop(){
            // primera vez no entra
            if (mouse.click && mouse.move && mouse.pos_prev){
                    socketClient.emit("draw_line", {line: [mouse.pos, mouse.pos_prev] } ) //primer pos => posicion previa / seguda => pos actual
                    mouse.move = false;
            }
            // primera vez obtiene posicion para eventualmente enviarla con el if anterior al servidor
            mouse.pos_prev = {x: mouse.pos.x, y:mouse.pos.y};
            setTimeout(mainLoop, 25);
            
        }
        mainLoop();
    },[]);

    return <canvas id="drawing"> </canvas>;
}

export { Canva };