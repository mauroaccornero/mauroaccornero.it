import { generateColor} from "./generateColor";
import { wrap} from "./wrap";

export const updateColors = (dt, config, pointers, colorUpdateTimer) => {
    if (!config.COLORFUL){ return; }
    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        for(let p = 0; p < pointers.length;p++){
            pointers[p].color = generateColor();
        };
    }
    return {np : pointers, cut: colorUpdateTimer}
}
