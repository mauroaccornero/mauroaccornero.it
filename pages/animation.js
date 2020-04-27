import React, { useRef } from 'react';
import {useAnimation} from "../animation";
import Head from "next/head";

const Animation = () => {
    const ref = useRef(null)
    const {pointers, handleMouseDown, handleMouseUp, handleMouseMove,handleTouchStart, handleTouchEnd, handleTouchMove, canvas } = useAnimation(ref)
return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            </Head>
            <canvas
                onMouseDown={e => handleMouseDown(e, pointers, canvas)}
                onMouseUp={e => handleMouseUp(e, pointers)}
                onMouseMove={e => handleMouseMove(e, pointers, canvas) }
/*
                onTouchStart={e => handleTouchStart(e,pointers,canvas)}
                onTouchEnd={ e => handleTouchEnd(e, pointers)}
                onTouchMove={ e => handleTouchMove(e, pointers, canvas)}
*/
                ref={ref}
            ></canvas>
            <style jsx global>{`
                * {
                user-select: none;
                margin: 0;
                padding: 0;
            }

                html, body {
                overflow: hidden;
                background-color: #000;
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
        </>
    );
};

export default Animation;
