export function correctDeltaX (delta, canvas) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1){ delta *= aspectRatio;}
    return delta;
}