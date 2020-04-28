import {splat} from "./splat";

export function splatPointer(pointer, config, parameters, gl, blit, programs, canvas) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color, parameters, gl, blit, programs, canvas, config);
}
