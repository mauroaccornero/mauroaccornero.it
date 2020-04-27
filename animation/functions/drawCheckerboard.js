export function drawCheckerboard (fbo, gl, blit, checkerboardProgram, canvas) {
    checkerboardProgram.bind();
    gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    blit(fbo);
}