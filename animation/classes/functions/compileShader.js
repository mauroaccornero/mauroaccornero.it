import { addKeywords } from "./addKeywords";

export const compileShader = (type, source, gl, keywords) => {
    source = addKeywords(source, keywords);

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

/*
  TODO: OPTIMIZE KHR_parallel_shader_compile
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(shader);
    }
*/

    return shader;
};