import React,{useRef, useState} from 'react'
import {resizeCanvas} from "./functions/resizeCanvas";
import {config as animationConfig} from "./config";
import {getWebGLContext} from "./functions/getWebGLContext";
import {isMobile} from "./functions/isMobile";
import {createTextureAsync} from "./functions/createTextureAsync";
import {makePrograms} from "./functions/makePrograms";
import {Material} from "./classes/Material";
import {baseVertexShader, displayShaderSource} from "./functions/shaders";
import {updateKeywords} from "./classes/functions/updateKeywords";
import {initFramebuffers} from "./functions/initFrameBuffers";
import {multipleSplats} from "./functions/multipleSplats";
import {pointerPrototype} from "./functions/pointerPrototype";
import {calcDeltaTime} from "./functions/calcDeltaTime";
import {updateColors} from "./functions/updateColors";
import {applyInputs} from "./functions/applyInputs";
import {step} from "./functions/step";
import {render} from "./functions/render";
import {scaleByPixelRatio} from "./functions/scaleByPixelRatio";
import {updatePointerDownData} from "./functions/updatePointerDownData";
import {updatePointerMoveData} from "./functions/updatePointerMoveData";
import {updatePointerUpData} from "./functions/updatePointerUpData";

const useAnimation = canvasRef => {
    const [config, setConfig] = useState(animationConfig);
    const [splatStack, setSplatStack] = useState([]);
    const pointer = pointerPrototype()
    const pointers = useRef([pointer])
    const requestRef = useRef();
    const gl = useRef()
    const ext = useRef()

    const update = (config,parameters,splatStack,programs,blit,displayMaterial,ditheringTexture,colorUpdateTimer,lastUpdateTime) => {
        const dt = calcDeltaTime(lastUpdateTime);
        let internalParameters = {...parameters}

        if (resizeCanvas(canvasRef.current)) {
            console.log("sfdsasad")
            internalParameters = initFramebuffers(config, gl.current, ext.current, internalParameters, programs, blit);
        }

        updateColors(dt, config, pointers, colorUpdateTimer);

        const newSplatStack = applyInputs(splatStack, pointers.current, internalParameters, gl.current, blit, programs, canvasRef.current, config);

        if (!config.PAUSED) {
            step(dt,
                gl.current,
                config,
                blit,
                ext.current,
                internalParameters,
                programs
            );
        }

        render(null,
            config,
            gl.current,
            blit,
            canvasRef.current,
            displayMaterial,
            ditheringTexture,
            internalParameters,
            programs
        );

        const cb = () => update(config,internalParameters,newSplatStack,programs,blit,displayMaterial,ditheringTexture,colorUpdateTimer,lastUpdateTime)
        requestRef.current = requestAnimationFrame(cb);
    }

    const animate = () => {
        resizeCanvas(canvasRef.current)
        const webGLContext = getWebGLContext(canvasRef.current);
        gl.current = webGLContext.gl
        ext.current = webGLContext.ext
        if (isMobile()) { setConfig(config => ({...config, DYE_RESOLUTION: 512}))}
        if (typeof ext.supportLinearFiltering !== "undefined" && ext.supportLinearFiltering) {
            setConfig(config => ({...config,
                DYE_RESOLUTION: 512,
                SHADING: false,
                BLOOM: false,
                SUNRAYS: false
            }))
        }

        const blit = (() => {
            gl.current.bindBuffer(gl.current.ARRAY_BUFFER, gl.current.createBuffer());
            gl.current.bufferData(gl.current.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.current.STATIC_DRAW);
            gl.current.bindBuffer(gl.current.ELEMENT_ARRAY_BUFFER, gl.current.createBuffer());
            gl.current.bufferData(gl.current.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.current.STATIC_DRAW);
            gl.current.vertexAttribPointer(0, 2, gl.current.FLOAT, false, 0, 0);
            gl.current.enableVertexAttribArray(0);
            return (destination) => {
                gl.current.bindFramebuffer(gl.current.FRAMEBUFFER, destination);
                gl.current.drawElements(gl.current.TRIANGLES, 6, gl.current.UNSIGNED_SHORT, 0);
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

        let ditheringTexture = createTextureAsync('/textures/LDR_LLL1_0.png', gl.current);
        const programs = makePrograms(gl.current, ext.current)
        const displayMaterial = new Material(baseVertexShader(gl.current), displayShaderSource(), gl.current);
        updateKeywords(config, displayMaterial);
        parameters = initFramebuffers(config, gl.current, ext.current, parameters, programs, blit);
        multipleSplats(parseInt(Math.random() * 20) + 5, parameters, gl.current, blit, programs, canvasRef.current, config);

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;

        update(
            config,
            parameters,
            splatStack,
            programs,
            blit,
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
        if (pointer == null) {pointer = pointerPrototype();}
        const newPointer = updatePointerDownData(pointer, -1, posX, posY, canvasRef.current);
        pointers.current = [newPointer]
    };

    const handleMouseMove = e => {
        let pointer = pointers.current[0];
        if (!pointer.down) { return;}
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

export const Animation = () => {
    const ref = useRef(null);
    const {handleMouseMove, handleMouseDown, handleMouseUp} = useAnimation(ref)
    return (<>
        <canvas
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            ref={ref} />
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