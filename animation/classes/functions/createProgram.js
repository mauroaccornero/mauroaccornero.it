export const createProgram = (vertexShader, fragmentShader, gl) => {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

/*
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error('Link failed: ' + gl.getProgramInfoLog(prog));
        console.error('vs info-log: ' + gl.getShaderInfoLog(vertexShader));
        console.error('fs info-log: ' + gl.getShaderInfoLog(fragmentShader));
        throw gl.getProgramInfoLog(program);
    }
*/

    return program;
}