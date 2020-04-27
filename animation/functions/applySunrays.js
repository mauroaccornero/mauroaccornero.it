export function applySunrays(source, mask, destination, gl, sunraysMaskProgram, blit, sunraysProgram, config) {
    gl.disable(gl.BLEND);
    sunraysMaskProgram.bind();
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    gl.viewport(0, 0, mask.width, mask.height);
    blit(mask.fbo);

    sunraysProgram.bind();
    gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
    gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
    gl.viewport(0, 0, destination.width, destination.height);
    blit(destination.fbo);
}