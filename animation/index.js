import {useCallback, useEffect, useRef, useState} from "react";
/* config */
import {config as animationConfig} from "./config";

/* canvas utils */
import {resizeCanvas} from "./functions/resizeCanvas";
import {isMobile} from "./functions/isMobile";

/*prototype*/
import {pointerPrototype} from "./functions/pointerPrototype";

/* webgl utils */
import {getWebGLContext} from "./functions/getWebGLContext";

/* classes */
import {Material} from "./classes/Material";
import {Program} from "./classes/Program";
import {updateKeywords} from "./classes/functions/updateKeywords";

/* shaders */
import {
    advectionShader,
    baseVertexShader,
    blurShader,
    bloomBlurShader,
    bloomFinalShader,
    bloomPrefilterShader,
    blurVertexShader,
    checkerboardShader,
    clearShader, colorShader,
    copyShader,
    curlShader,
    displayShaderSource,
    divergenceShader,
    gradientSubtractShader,
    pressureShader,
    splatShader,
    sunraysMaskShader,
    sunraysShader,
    vorticityShader
} from "./functions/shaders";

/* functions */
import {initFramebuffers} from "./functions/initFrameBuffers";
import {multipleSplats} from "./functions/multipleSplats";
import {createTextureAsync} from "./functions/createTextureAsync";
import {update} from "./functions/update";
import {scaleByPixelRatio} from "./functions/scaleByPixelRatio";
import {updatePointerDownData} from "./functions/updatePointerDownData";
import {updatePointerMoveData} from "./functions/updatePointerMoveData";
import {updatePointerUpData} from "./functions/updatePointerUpData";


export const useAnimation = (canvasRef) => {
    const [config, setConfig] = useState(animationConfig);
    const pointer = pointerPrototype()
    const [pointers, setPointers] = useState([pointer]);
    const [splatStack, setSplatStack] = useState([]);



    useEffect(() => {
        const canvas = canvasRef.current
        resizeCanvas(canvas)
        const {gl, ext} = getWebGLContext(canvas);
        if (isMobile()) {
            setConfig(config => {
                return ({...config, DYE_RESOLUTION: 512})
            })
        }
        if (typeof ext.supportLinearFiltering !== "undefined" && ext.supportLinearFiltering) {
            setConfig(config => {
                return ({...config, DYE_RESOLUTION: 512})
            })
            setConfig(config => {
                return ({...config, SHADING: false})
            })
            setConfig(config => {
                return ({...config, BLOOM: false})
            })
            setConfig(config => {
                return ({...config, SUNRAYS: false})
            })
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

        let dye;
        let velocity;
        let divergence;
        let curl;
        let pressure;
        let bloom;
        let bloomFramebuffers = [];
        let sunrays;
        let sunraysTemp;

        let ditheringTexture = createTextureAsync('/textures/LDR_LLL1_0.png', gl);

        const blurProgram = new Program(blurVertexShader(gl), blurShader(gl), gl);
        const copyProgram = new Program(baseVertexShader(gl), copyShader(gl), gl);
        const clearProgram = new Program(baseVertexShader(gl), clearShader(gl), gl);
        const colorProgram = new Program(baseVertexShader(gl), colorShader(gl), gl);
        const checkerboardProgram = new Program(baseVertexShader(gl), checkerboardShader(gl), gl);
        const bloomPrefilterProgram = new Program(baseVertexShader(gl), bloomPrefilterShader(gl), gl);
        const bloomBlurProgram = new Program(baseVertexShader(gl), bloomBlurShader(gl), gl);
        const bloomFinalProgram = new Program(baseVertexShader(gl), bloomFinalShader(gl), gl);
        const sunraysMaskProgram = new Program(baseVertexShader(gl), sunraysMaskShader(gl), gl);
        const sunraysProgram = new Program(baseVertexShader(gl), sunraysShader(gl), gl);
        const splatProgram = new Program(baseVertexShader(gl), splatShader(gl), gl);
        const advectionProgram = new Program(baseVertexShader(gl), advectionShader(gl, ext), gl);
        const divergenceProgram = new Program(baseVertexShader(gl), divergenceShader(gl), gl);
        const curlProgram = new Program(baseVertexShader(gl), curlShader(gl), gl);
        const vorticityProgram = new Program(baseVertexShader(gl), vorticityShader(gl), gl);
        const pressureProgram = new Program(baseVertexShader(gl), pressureShader(gl), gl);
        const gradienSubtractProgram = new Program(baseVertexShader(gl), gradientSubtractShader(gl), gl);

        const displayMaterial = new Material(baseVertexShader(gl), displayShaderSource(), gl);

        updateKeywords(config, displayMaterial);
        let fb = initFramebuffers(config, gl, ext, dye, velocity, divergence, curl, pressure, bloomFramebuffers, bloom, sunrays, sunraysTemp, copyProgram, blit);
        dye = fb.dye
        velocity = fb.velocity
        divergence = fb.divergence
        curl = fb.curl
        pressure = fb.pressure
        bloom = fb.bloom
        bloomFramebuffers = fb.bloomFramebuffers
        sunrays = fb.sunrays
        sunraysTemp = fb.sunraysTemp
        multipleSplats(parseInt(Math.random() * 20) + 5, velocity, gl, blit, dye, splatProgram, canvas, config);

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;
        update(
            config,
            gl,
            ext,
            dye,
            velocity,
            divergence,
            curl,
            pressure,
            pointers,
            splatStack,
            splatProgram,
            blit,
            curlProgram,
            vorticityProgram,
            divergenceProgram,
            clearProgram,
            pressureProgram,
            gradienSubtractProgram,
            advectionProgram,
            bloom,
            sunrays,
            sunraysTemp,
            colorProgram,
            checkerboardProgram,
            canvas,
            displayMaterial,
            ditheringTexture,
            bloomFramebuffers,
            bloomFinalProgram,
            bloomPrefilterProgram,
            bloomBlurProgram,
            blurProgram,
            sunraysMaskProgram,
            colorUpdateTimer,
            lastUpdateTime,
            sunraysProgram,
            copyProgram
        );
    }, []);

    const handleMouseDown = (e, pointers, canvas) => {
        let posX = scaleByPixelRatio(e.nativeEvent.offsetX);
        let posY = scaleByPixelRatio(e.nativeEvent.offsetY);
        let pointer = pointers.find(p => p.id == -1);
        if (pointer == null) {
            pointer = pointerPrototype();
        }
        const newPointer = updatePointerDownData(pointer, -1, posX, posY, canvas);
        setPointers([newPointer])
    };


    const handleMouseMove = (e, pointers, canvas) => {
        let pointer = pointers[0];
        if (!pointer.down){ return;}
        let posX = scaleByPixelRatio(e.nativeEvent.offsetX);
        let posY = scaleByPixelRatio(e.nativeEvent.offsetY);
        const newPointer = updatePointerMoveData(pointer, posX, posY, canvas);
        setPointers([newPointer])
    };


    const handleMouseUp = (e, pointers) => {
        const newPointer = updatePointerUpData(pointers[0]);
        setPointers([newPointer])
    };

    const handleTouchStart = (e, pointers, canvas) => {
        e.preventDefault();
        const touches = e.nativeEvent.targetTouches;
        const newPointers = []
        while (touches.length >= pointers.length) {
            pointers.push( pointerPrototype());
        }
        for (let i = 0; i < touches.length; i++) {
            let posX = scaleByPixelRatio(touches[i].pageX);
            let posY = scaleByPixelRatio(touches[i].pageY);
            newPointers.push(updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY, canvas))
        }
        setPointers([...newPointers])
    };

    const handleTouchMove = (e, pointers, canvas) => {
        e.preventDefault();
        const touches = e.nativeEvent.targetTouches;
        const newPointers = []
        for (let i = 0; i < touches.length; i++) {
            let pointer = pointers[i + 1];
            if (!pointer.down){ continue; }
            let posX = scaleByPixelRatio(touches[i].pageX);
            let posY = scaleByPixelRatio(touches[i].pageY);
            newPointers.push(updatePointerMoveData(pointer, posX, posY, canvas))
        }
        setPointers([...newPointers])
    };

    const handleTouchEnd = (e, pointers) => {
        const touches = e.nativeEvent.changedTouches;
        const newPointers = []
        for (let i = 0; i < touches.length; i++){
                let pointer = pointers.find(p => p.id == touches[i].identifier);
                if (pointer == null){continue;}
                newPointers.push(updatePointerUpData(pointer));
            }


        setPointers([...newPointers])


         /*
        for (let i = 0; i < touches.length; i++) {
            pointers = pointers.map((pointer, pointerkey) => {
                if (pointer.id === touches[i].identifier) {
                    return updatePointerUpData(pointer)
                }
                return pointer
            })
        }*/


    };

    return {
        pointers,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        handleTouchStart,
        handleTouchEnd,
        handleTouchMove,
        canvas: canvasRef.current
    }
}