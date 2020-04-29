import {generateColor} from "./generateColor";
import { splat} from "./splat";

export const multipleSplats = (amount, parameters, gl, blit, programs, canvas, config) => {
    for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color, parameters, gl, blit, programs,  canvas, config)
    }
}
