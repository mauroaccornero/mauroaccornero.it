export function getResolution (resolution, gl) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1){
        aspectRatio = 1.0 / aspectRatio;
    }
    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
        return {width: max, height: min};
    }else {
        return {width: min, height: max};
    }
}