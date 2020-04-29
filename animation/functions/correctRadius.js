export const correctRadius = (radius, canvas) => {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) { radius *= aspectRatio;}
    return radius;
}
