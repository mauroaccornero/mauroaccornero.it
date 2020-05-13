export const calcDeltaTime = lastUpdateTime => {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    return dt;
}
