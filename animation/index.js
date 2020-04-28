import {useEffect, useState} from "react";
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
import {updateKeywords} from "./classes/functions/updateKeywords";

/* shaders */
import {
    baseVertexShader,
    displayShaderSource,
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
import {makePrograms} from "./functions/makePrograms";


export const useAnimation = (canvasRef) => {
    const [config, setConfig] = useState(animationConfig);
    const pointer = pointerPrototype()
    const [pointers, setPointers] = useState([pointer]);
    const [splatStack, setSplatStack] = useState([]);


    useEffect(() => {
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
            pointers,
            splatStack,
            programs,
            blit,
            canvas,
            displayMaterial,
            ditheringTexture,
            colorUpdateTimer,
            lastUpdateTime,
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
        if (!pointer.down) {
            return;
        }
        let posX = scaleByPixelRatio(e.nativeEvent.offsetX);
        let posY = scaleByPixelRatio(e.nativeEvent.offsetY);
        const newPointer = updatePointerMoveData(pointer, posX, posY, canvas);
        console.log(newPointer)
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
            pointers.push(pointerPrototype());
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
            if (!pointer.down) {
                continue;
            }
            let posX = scaleByPixelRatio(touches[i].pageX);
            let posY = scaleByPixelRatio(touches[i].pageY);
            newPointers.push(updatePointerMoveData(pointer, posX, posY, canvas))
        }
        setPointers([...newPointers])
    };

    const handleTouchEnd = (e, pointers) => {
        const touches = e.nativeEvent.changedTouches;
        const newPointers = []
        for (let i = 0; i < touches.length; i++) {
            let pointer = pointers.find(p => p.id == touches[i].identifier);
            if (pointer == null) {
                continue;
            }
            newPointers.push(updatePointerUpData(pointer));
        }
        setPointers([...newPointers])
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