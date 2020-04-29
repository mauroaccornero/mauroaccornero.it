import {getResolution} from "./getResolution";
import {createDoubleFBO} from "./createDoubleFBO";
import {resizeDoubleFBO} from "./resizeDoubleFBO";
import {initBloomFramebuffers} from "./initBloomFramebuffers";
import {initSunraysFramebuffers} from "./initSunraysFramebuffers";
import {createFBO} from "./createFBO";

export const initFramebuffers = (config, gl, ext, parameters, programs, blit) => {
    let simRes = getResolution(config.SIM_RESOLUTION, gl);
    let dyeRes = getResolution(config.DYE_RESOLUTION, gl);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    let dye = parameters.dye
    if (dye == null) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering, gl);
    } else {
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering, programs.copyProgram, gl, blit);
    }

    let velocity = parameters.velocity;
    if (velocity == null) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering, gl);
    } else {
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering, programs.copyProgram, gl, blit);
    }

    const divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);
    const curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);
    const pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST, gl);

    let bloomObject = initBloomFramebuffers(ext, parameters, config, gl);
    const sunraysObject = initSunraysFramebuffers( ext, gl, config);

    return {
        ...parameters,
        dye,
        velocity,
        divergence,
        curl,
        pressure,
        bloom: bloomObject.bloom,
        bloomFramebuffers: bloomObject.bloomFramebuffers,
        sunrays: sunraysObject.sunrays,
        sunraysTemp: sunraysObject.sunraysTemp
    }
}
