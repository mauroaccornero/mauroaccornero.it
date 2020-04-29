import { drawColor} from "./drawColor";
import { drawCheckerboard} from "./drawCheckerboard";
import { drawDisplay} from "./drawDisplay";
import { applyBloom} from "./applyBloom";
import {blur} from "./blur";
import {applySunrays} from "./applySunrays";
import { normalizeColor} from "./normalizeColor";

export const render = (
    target,
    config,
    gl,
    blit,
    canvas,
    displayMaterial,
    ditheringTexture,
    parameters,
    programs
) => {
    const {
        bloomFinalProgram,
        bloomPrefilterProgram,
        bloomBlurProgram,
        sunraysMaskProgram,
        sunraysProgram,
        blurProgram,
        colorProgram,
        checkerboardProgram
    } = programs

    const {
        bloom,
        dye,
        sunrays,
        sunraysTemp,
        bloomFramebuffers,
    } = parameters

    if (config.BLOOM) {
        applyBloom(dye.read, bloom, gl, config, bloomFramebuffers, bloomFinalProgram, bloomPrefilterProgram, bloomBlurProgram, blit);
    }
    if (config.SUNRAYS) {
        applySunrays(dye.read, dye.write, sunrays, gl, sunraysMaskProgram, blit, sunraysProgram, config);
        blur(sunrays, sunraysTemp, 1,gl, blit, blurProgram);
    }

    if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
    }else {
        gl.disable(gl.BLEND);
    }

    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;
    gl.viewport(0, 0, width, height);

    let fbo = target == null ? null : target.fbo;
    if (!config.TRANSPARENT){
        drawColor(fbo, normalizeColor(config.BACK_COLOR), colorProgram, gl, blit);
    }
    if (target == null && config.TRANSPARENT) {
        drawCheckerboard(fbo, gl, blit, checkerboardProgram, canvas);
    }
    drawDisplay(fbo, width, height, gl, blit, config, displayMaterial, ditheringTexture, dye, bloom, sunrays);
}