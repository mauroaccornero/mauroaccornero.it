import { getResolution} from "./getResolution";
import { createFBO} from "./createFBO";

export function initBloomFramebuffers (ext, bloomFramebuffers, bloom, config, gl) {
    let res = getResolution(config.BLOOM_RESOLUTION, gl);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering, gl);

    bloomFramebuffers.length = 0;
    for (let i = 0; i < config.BLOOM_ITERATIONS; i++)
    {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering , gl);
        bloomFramebuffers.push(fbo);
    }

    return { bloom, bloomFramebuffers}
}