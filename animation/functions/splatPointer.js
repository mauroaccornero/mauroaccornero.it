import { splat} from "./splat";

export function splatPointer (pointer, config, velocity, gl, blit, dye, splatProgram, canvas) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color, velocity, gl, blit, dye, splatProgram,canvas, config);
}