import { getResolution} from "./getResolution";
import { createFBO} from "./createFBO";

export function initSunraysFramebuffers (sunrays, sunraysTemp, ext, gl, config) {
    let res = getResolution(config.SUNRAYS_RESOLUTION, gl);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    sunrays     = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering, gl);
    sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering, gl);

    return { sunrays, sunraysTemp }
}
