import { getResolution} from "./getResolution";
import { createFBO} from "./createFBO";

export const initSunraysFramebuffers = ( ext, gl, config) => {
    let res = getResolution(config.SUNRAYS_RESOLUTION, gl);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    let sunrays     = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering, gl);
    let sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering, gl);

    return { sunrays, sunraysTemp }
}
