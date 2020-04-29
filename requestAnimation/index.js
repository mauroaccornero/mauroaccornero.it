import React,{useRef, useState} from 'react'
import {resizeCanvas} from "../animation/functions/resizeCanvas";
import {config as animationConfig} from "../animation/config";
import {getWebGLContext} from "../animation/functions/getWebGLContext";
import {isMobile} from "../animation/functions/isMobile";
import {createTextureAsync} from "../animation/functions/createTextureAsync";
import {makePrograms} from "../animation/functions/makePrograms";
import {Material} from "../animation/classes/Material";
import {baseVertexShader, displayShaderSource} from "../animation/functions/shaders";
import {updateKeywords} from "../animation/classes/functions/updateKeywords";
import {initFramebuffers} from "../animation/functions/initFrameBuffers";
import {multipleSplats} from "../animation/functions/multipleSplats";
import {pointerPrototype} from "../animation/functions/pointerPrototype";
import {calcDeltaTime} from "../animation/functions/calcDeltaTime";
import {updateColors} from "../animation/functions/updateColors";
import {applyInputs} from "../animation/functions/applyInputs";
import {step} from "../animation/functions/step";
import {render} from "../animation/functions/render";
import {scaleByPixelRatio} from "../animation/functions/scaleByPixelRatio";
import {updatePointerDownData} from "../animation/functions/updatePointerDownData";
import {updatePointerMoveData} from "../animation/functions/updatePointerMoveData";
import {updatePointerUpData} from "../animation/functions/updatePointerUpData";

export const useAnimationFrame = canvasRef => {
    const [config, setConfig] = useState(animationConfig);
    const [splatStack, setSplatStack] = useState([]);
    const pointer = pointerPrototype()
    const pointers = useRef([pointer])
    const requestRef = useRef();

    const update = (config,gl,ext,parameters,pointers,splatStack,programs,blit,canvas,displayMaterial,ditheringTexture,colorUpdateTimer,lastUpdateTime) => {
        const dt = calcDeltaTime(lastUpdateTime);
        let internalParameters = {...parameters}

        if (resizeCanvas(canvas)) {
            internalParameters = initFramebuffers(config, gl, ext, internalParameters, programs, blit);
        }

        updateColors(dt, config, pointers, colorUpdateTimer);

        const newSplatStack = applyInputs(splatStack, pointers, internalParameters, gl, blit, programs, canvas, config);

        if (!config.PAUSED) {
            step(dt,
                gl,
                config,
                blit,
                ext,
                internalParameters,
                programs
            );
        }
        render(null,
            config,
            gl,
            blit,
            canvas,
            displayMaterial,
            ditheringTexture,
            internalParameters,
            programs
        );
        const cb = () => update(config,gl,ext,parameters,pointers,splatStack,programs,blit,canvas,displayMaterial,ditheringTexture,colorUpdateTimer,lastUpdateTime)
        requestRef.current = requestAnimationFrame(cb);
    }

    const animate = () => {
        const canvas = canvasRef.current
        resizeCanvas(canvas)
        const {gl, ext} = getWebGLContext(canvas);
        if (isMobile()) { setConfig(config => ({...config, DYE_RESOLUTION: 512}))}

        if (typeof ext.supportLinearFiltering !== "undefined" && ext.supportLinearFiltering) {
            setConfig(config => ({...config, DYE_RESOLUTION: 512}))
            setConfig(config => ({...config, SHADING: false}))
            setConfig(config => ({...config, BLOOM: false}))
            setConfig(config => ({...config, SUNRAYS: false}))
        }

        const blit = (() => {
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            return (destination) => {
                gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            }
        })();

        let parameters = {
            dye: null,
            velocity: null,
            divergence: {},
            curl: {},
            pressure: {},
            bloom: {},
            bloomFramebuffers: [],
            sunrays: {},
            sunraysTemp: {},
        }

        let ditheringTexture = createTextureAsync('/textures/LDR_LLL1_0.png', gl);
        const programs = makePrograms(gl, ext)
        const displayMaterial = new Material(baseVertexShader(gl), displayShaderSource(), gl);
        updateKeywords(config, displayMaterial);
        parameters = initFramebuffers(config, gl, ext, parameters, programs, blit);
        multipleSplats(parseInt(Math.random() * 20) + 5, parameters, gl, blit, programs, canvas, config);

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;

        update(
            config,
            gl,
            ext,
            parameters,
            pointers.current,
            splatStack,
            programs,
            blit,
            canvas,
            displayMaterial,
            ditheringTexture,
            colorUpdateTimer,
            lastUpdateTime,
        );
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handleMouseDown = e  => {
        let posX = scaleByPixelRatio(e.nativeEvent.offsetX);
        let posY = scaleByPixelRatio(e.nativeEvent.offsetY);
        let pointer = pointers.current.find(p => p.id == -1);
        if (pointer == null) {
            pointer = pointerPrototype();
        }
        const newPointer = updatePointerDownData(pointer, -1, posX, posY, canvasRef.current);
        pointers.current = [newPointer]
    };

    const handleMouseMove = e => {
        let pointer = pointers.current[0];
        if (!pointer.down) {
            return;
        }
        let posX = scaleByPixelRatio(e.nativeEvent.offsetX);
        let posY = scaleByPixelRatio(e.nativeEvent.offsetY);
        const newPointer = updatePointerMoveData(pointer, posX, posY, canvasRef.current);
        pointers.current = [newPointer]
    }

    const handleMouseUp = () => {
        let pointer = pointers.current[0];
        const newPointer = updatePointerUpData(pointer);
        pointers.current = [newPointer]
    };
    return { handleMouseMove, handleMouseUp, handleMouseDown }
}

export const RequestComponent = () => {
    const ref = useRef(null);
    const {handleMouseMove, handleMouseDown, handleMouseUp} = useAnimationFrame(ref)
    return (<>
        <canvas
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            ref={ref}></canvas>
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
        </>)
}