import {multipleSplats} from "./multipleSplats";
import {splatPointer} from "./splatPointer";

export function applyInputs(splatStack, pointers, parameters, gl, blit, programs, canvas, config) {
    let newSplatStack = splatStack
    if (splatStack.length > 0) {
        newSplatStack.pop();
        multipleSplats(newSplatStack, parameters, gl, blit, programs, canvas, config);
    }

    pointers.forEach(p => {
        if (p.moved) {
            p.moved = false;
            splatPointer(p, config, parameters, gl, blit, programs, canvas);
        }
    });
    return newSplatStack
}
