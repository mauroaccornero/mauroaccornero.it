import { HSVtoRGB } from "./HSVtoRGB";

export const generateColor = () => {
    let c = HSVtoRGB(Math.random(), 1.0, 1.0);
    return {
        r: c.r * 0.15,
        g: c.g * 0.15,
        b: c.b * 0.15,
    };
}

