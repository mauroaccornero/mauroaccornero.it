import { createFBO} from "./createFBO";

export function resizeFBO (target, w, h, internalFormat, format, type, param, gl, blit, copyProgram) {
    let newFBO = createFBO(w, h, internalFormat, format, type, param, gl);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));

    blit(newFBO.fbo);
    return newFBO;
}