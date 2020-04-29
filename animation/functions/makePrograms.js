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
    curlShader, displayShaderSource,
    divergenceShader,
    gradientSubtractShader,
    pressureShader,
    splatShader,
    sunraysMaskShader,
    sunraysShader,
    vorticityShader
} from "./shaders";
import {Material} from "../classes/Material";

export const makePrograms = (gl, ext) => {
    const baseVertexShaderPerformance = baseVertexShader(gl)

    let programs = {
        advectionProgram: new Program(baseVertexShaderPerformance, advectionShader(gl, ext), gl),
        bloomBlurProgram: new Program(baseVertexShaderPerformance, bloomBlurShader(gl), gl),
        bloomFinalProgram: new Program(baseVertexShaderPerformance, bloomFinalShader(gl), gl),
        bloomPrefilterProgram: new Program(baseVertexShaderPerformance, bloomPrefilterShader(gl), gl),
        blurProgram: new Program(blurVertexShader(gl), blurShader(gl), gl),
        checkerboardProgram: new Program(baseVertexShaderPerformance, checkerboardShader(gl), gl),
        clearProgram: new Program(baseVertexShaderPerformance, clearShader(gl), gl),
        colorProgram: new Program(baseVertexShaderPerformance, colorShader(gl), gl),
        copyProgram: new Program(baseVertexShaderPerformance, copyShader(gl), gl),
        curlProgram: new Program(baseVertexShaderPerformance, curlShader(gl), gl),
        divergenceProgram: new Program(baseVertexShaderPerformance, divergenceShader(gl), gl),
        gradienSubtractProgram: new Program(baseVertexShaderPerformance, gradientSubtractShader(gl), gl),
        pressureProgram: new Program(baseVertexShaderPerformance, pressureShader(gl), gl),
        splatProgram: new Program(baseVertexShaderPerformance, splatShader(gl), gl),
        sunraysMaskProgram: new Program(baseVertexShaderPerformance, sunraysMaskShader(gl), gl),
        sunraysProgram: new Program(baseVertexShaderPerformance, sunraysShader(gl), gl),
        vorticityProgram: new Program(baseVertexShaderPerformance, vorticityShader(gl), gl),
    }

    let programsArray = Object.entries(programs)

    programsArray.map(program => program[1].setProgram())

    programsArray.map(program => program[1].setUniform())

    const newPrograms = {}
    programsArray.forEach(([programKey, programValue]) => {
        newPrograms[programKey] = programValue
    })

    const displayMaterial = new Material(baseVertexShaderPerformance, displayShaderSource(), gl);

    return {programs: newPrograms, displayMaterial}
}