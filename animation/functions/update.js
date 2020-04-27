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
    dye,
    velocity,
    divergence,
    curl,
    pressure,
    pointers,
    splatStack,
    splatProgram,
    blit,
    curlProgram,
    vorticityProgram,
    divergenceProgram,
    clearProgram,
    pressureProgram,
    gradienSubtractProgram,
    advectionProgram,
    bloom,
    sunrays,
    sunraysTemp,
    colorProgram,
    checkerboardProgram,
    canvas,
    displayMaterial,
    ditheringTexture,
    bloomFramebuffers,
    bloomFinalProgram,
    bloomPrefilterProgram,
    bloomBlurProgram,
    blurProgram,
    sunraysMaskProgram,
    colorUpdateTimer,
    lastUpdateTime,
    sunraysProgram,
    copyProgram
) {
    const dt = calcDeltaTime(lastUpdateTime);
    if (resizeCanvas(canvas)) {
        /* TODO: UPADTE GLOBAL ON RESIZE */
        initFramebuffers(config, gl, ext, dye, velocity, divergence, curl, pressure, bloomFramebuffers, bloom, sunrays, sunraysTemp, copyProgram, blit);
    }
    updateColors(dt, config, pointers, colorUpdateTimer);
    applyInputs(splatStack, pointers, velocity, gl, blit, dye, splatProgram, canvas, config);

    if (!config.PAUSED) {
        step(dt,
            gl,
            config,
            velocity,
            curlProgram,
            blit,
            vorticityProgram,
            divergenceProgram,
            clearProgram,
            pressure,
            pressureProgram,
            gradienSubtractProgram,
            advectionProgram,
            ext,
            dye,
            curl,
            divergence
        );
    }
    render(null,
        config,
        gl,
        dye,
        bloom,
        sunrays,
        sunraysTemp,
        colorProgram,
        blit,
        checkerboardProgram,
        canvas,
        displayMaterial,
        ditheringTexture,
        bloomFramebuffers,
        bloomFinalProgram,
        bloomPrefilterProgram,
        bloomBlurProgram,
        blurProgram,
        sunraysMaskProgram,
        sunraysProgram,
    );
    requestAnimationFrame(() => update(
        config,
        gl,
        ext,
        dye,
        velocity,
        divergence,
        curl,
        pressure,
        pointers,
        splatStack,
        splatProgram,
        blit,
        curlProgram,
        vorticityProgram,
        divergenceProgram,
        clearProgram,
        pressureProgram,
        gradienSubtractProgram,
        advectionProgram,
        bloom,
        sunrays,
        sunraysTemp,
        colorProgram,
        checkerboardProgram,
        canvas,
        displayMaterial,
        ditheringTexture,
        bloomFramebuffers,
        bloomFinalProgram,
        bloomPrefilterProgram,
        bloomBlurProgram,
        blurProgram,
        sunraysMaskProgram,
        colorUpdateTimer,
        lastUpdateTime,
        sunraysProgram,
        copyProgram)
    );
}