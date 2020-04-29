import { resizeCanvas} from "./resizeCanvas";
import { calcDeltaTime } from "./calcDeltaTime";
import { initFramebuffers} from "./initFrameBuffers";
import { applyInputs} from "./applyInputs";
import { step } from "./step";
import { updateColors} from "./updateColors";
import { render} from "./render";

export function update (
    config,
    gl,
    ext,
    parameters,
    pointers,
    splatStack,
    programs,
    blit,
    canvas,
    displayMaterial,
    ditheringTexture,
    colorUpdateTimer,
    lastUpdateTime,
) {
    const dt = calcDeltaTime(lastUpdateTime);
    let internalParameters = {...parameters}

    if (resizeCanvas(canvas)) {
        internalParameters = initFramebuffers(config, gl, ext, internalParameters, programs, blit);
    }

    updateColors(dt, config, pointers, colorUpdateTimer);

    const newSplatStack = applyInputs(splatStack, pointers, internalParameters, gl, blit, programs, canvas, config);

    if (!config.PAUSED) {
        step(dt,
            gl,
            config,
            blit,
            ext,
            internalParameters,
            programs
        );
    }
    render(null,
        config,
        gl,
        blit,
        canvas,
        displayMaterial,
        ditheringTexture,
        internalParameters,
        programs
    );
    requestAnimationFrame(() => update(
        config,
        gl,
        ext,
        internalParameters,
        pointers,
        newSplatStack,
        programs,
        blit,
        canvas,
        displayMaterial,
        ditheringTexture,
        colorUpdateTimer,
        lastUpdateTime,
    )
    );
}