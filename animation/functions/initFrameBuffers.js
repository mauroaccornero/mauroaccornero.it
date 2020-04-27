import {getResolution} from "./getResolution";
import {createDoubleFBO} from "./createDoubleFBO";
import {resizeDoubleFBO} from "./resizeDoubleFBO";
import {initBloomFramebuffers} from "./initBloomFramebuffers";
import {initSunraysFramebuffers} from "./initSunraysFramebuffers";
import {createFBO} from "./createFBO";

export function initFramebuffers(config, gl, ext, dye, velocity, divergence, curl, pressure, bloomFramebuffers, bloom, sunrays, sunraysTemp, copyProgram, blit) {
    let simRes = getResolution(config.SIM_RESOLUTION, gl);
    let dyeRes = getResolution(config.DYE_RESOLUTION, gl);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    if (dye == null) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering, gl);
    } else {
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering, copyProgram, gl, blit);
    }
    if (velocity == null) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering, gl);
    } else {
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering, copyProgram, gl, blit);
    }

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);

    let bloomUpdated = initBloomFramebuffers(ext, bloomFramebuffers, bloom, config, gl);
    const srs = initSunraysFramebuffers(sunrays, sunraysTemp, ext, gl, config);
    return {
        dye,
        velocity,
        divergence,
        curl,
        pressure,
        bloom: bloomUpdated.bloom,
        bloomFramebuffers: bloomUpdated.bloomFramebuffers,
        sunrays: srs.sunrays,
        sunraysTemp: srs.sunraysTemp
    }
}
