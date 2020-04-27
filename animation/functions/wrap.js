export function wrap(value, min, max) {
    let range = max - min;
    if (range == 0){ return min; }
    return (value - min) % range + min;
}
