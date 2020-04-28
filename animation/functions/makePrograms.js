import {Program} from "../classes/Program";
import {
    advectionShader,
    baseVertexShader,
    bloomBlurShader,
    bloomFinalShader,
    bloomPrefilterShader,
    blurShader,
    blurVertexShader,
    checkerboardShader,
    clearShader,
    colorShader,
    copyShader,
    curlShader,
    divergenceShader, gradientSubtractShader,
    pressureShader,
    splatShader,
    sunraysMaskShader,
    sunraysShader,
    vorticityShader
} from "./shaders";

export const makePrograms = (gl, ext) => {
    const advectionProgram = new Program(baseVertexShader(gl), advectionShader(gl, ext), gl);
    const bloomBlurProgram = new Program(baseVertexShader(gl), bloomBlurShader(gl), gl);
    const bloomFinalProgram = new Program(baseVertexShader(gl), bloomFinalShader(gl), gl);
    const bloomPrefilterProgram = new Program(baseVertexShader(gl), bloomPrefilterShader(gl), gl);
    const blurProgram = new Program(blurVertexShader(gl), blurShader(gl), gl);
    const checkerboardProgram = new Program(baseVertexShader(gl), checkerboardShader(gl), gl);
    const clearProgram = new Program(baseVertexShader(gl), clearShader(gl), gl);
    const colorProgram = new Program(baseVertexShader(gl), colorShader(gl), gl);
    const copyProgram = new Program(baseVertexShader(gl), copyShader(gl), gl);
    const curlProgram = new Program(baseVertexShader(gl), curlShader(gl), gl);
    const divergenceProgram = new Program(baseVertexShader(gl), divergenceShader(gl), gl);
    const gradienSubtractProgram = new Program(baseVertexShader(gl), gradientSubtractShader(gl), gl);
    const pressureProgram = new Program(baseVertexShader(gl), pressureShader(gl), gl);
    const splatProgram = new Program(baseVertexShader(gl), splatShader(gl), gl);
    const sunraysMaskProgram = new Program(baseVertexShader(gl), sunraysMaskShader(gl), gl);
    const sunraysProgram = new Program(baseVertexShader(gl), sunraysShader(gl), gl);
    const vorticityProgram = new Program(baseVertexShader(gl), vorticityShader(gl), gl);

    return {
        advectionProgram,
        bloomBlurProgram,
        bloomFinalProgram,
        bloomPrefilterProgram,
        blurProgram,
        checkerboardProgram,
        clearProgram,
        colorProgram,
        copyProgram,
        curlProgram,
        divergenceProgram,
        gradienSubtractProgram,
        pressureProgram,
        splatProgram,
        sunraysMaskProgram,
        sunraysProgram,
        vorticityProgram,
    }
}