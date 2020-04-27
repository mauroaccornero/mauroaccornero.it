import {multipleSplats} from "./multipleSplats";
import {splatPointer} from "./splatPointer";

export function applyInputs(splatStack, pointers, velocity, gl, blit, dye, splatProgram, canvas, config) {
    if (splatStack.length > 0)
        /* TODO: UPADTE GLOBAL */
        multipleSplats(splatStack.pop(), velocity, gl, blit, dye, splatProgram, canvas, config);

    pointers.forEach(p => {
        if (p.moved) {
            p.moved = false;
            splatPointer(p, config, velocity, gl, blit, dye, splatProgram, canvas);
        }
    });
}
