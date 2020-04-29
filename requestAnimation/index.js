import React,{useRef, useState} from 'react'
import {resizeCanvas} from "../animation/functions/resizeCanvas";

export const useAnimationFrame = canvasRef => {
    const requestRef = useRef();
    const coordsRef = useRef({x:0, y:0})

    const update = (canvas, time, coords, something) => {
        let ctx = canvas.getContext("2d");
        const deltaTime = Math.round(time * 100) / 100
        let somethingB = time < 3000 ? something : "updated more then 3000"
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText(`requestAnimationFrame: ${deltaTime}`, 10, 30);
        ctx.fillText(`mouse pos: x: ${coords.x} y: ${coords.y}`, coords.x, coords.y);
        ctx.fillText(`something: ${somethingB}`, 10, 110);

        requestRef.current = requestAnimationFrame(animate);
    }

    const animate = time => {
        const canvas = canvasRef.current
        const coords = coordsRef.current
        const something = "starting"
        resizeCanvas(canvas)
        update(canvas, time, coords, something)
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handleMouseMove = (e) => {
        coordsRef.current = {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}
        /*console.log(e.nativeEvent.offsetX);
        console.log(e.nativeEvent.offsetY);*/
    }

    return { handleMouseMove }
}

export const RequestComponent = () => {
    const ref = useRef(null);

    const {handleMouseMove} = useAnimationFrame(ref)

    return (<>
        <canvas onMouseMove={handleMouseMove} ref={ref}></canvas>
        <style jsx global>{`
                * {
                user-select: none;
                margin: 0;
                padding: 0;
            }

                html, body {
                overflow: hidden;
                background-color: #fff;
            }

                body {
                margin: 0;
                position: fixed;
                width: 100%;
                height: 100%;
            }
            canvas{
                width: 100%;
                height: 100vh;
            }
            `}</style>
        </>)
}