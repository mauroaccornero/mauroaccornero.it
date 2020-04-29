import {advectionShader} from "./advectionShader";
import {baseVertexShader} from "./baseVertexShader";
import {bloomBlurShader} from "./bloomBlurShader";
import {bloomFinalShader} from "./bloomFinalShader";
import {bloomPrefilterShader} from "./bloomPrefilterShader";
import {blurShader} from "./blurShader";
import {blurVertexShader} from "./blurVertexShader";
import {checkerboardShader} from "./checkerboardShader";
import {clearShader} from "./clearShader";
import {colorShader} from "./colorShader";
import {copyShader} from "./copyShader";
import {curlShader} from "./curlShader";
import {displayShaderSource} from "./displayShaderSource";
import {divergenceShader} from "./divergenceShader";
import {gradientSubtractShader} from "./gradientSubtractShader";
import {pressureShader} from "./pressureShader";
import {splatShader} from "./splatShader";
import {sunraysMaskShader} from "./sunraysMaskShader";
import {sunraysShader} from "./sunraysShader";
import {vorticityShader} from "./vorticityShader";

export const shaders = {
    advectionShader,
    baseVertexShader,
    bloomPrefilterShader,
    bloomFinalShader,
    bloomBlurShader,
    blurShader,
    blurVertexShader,
    checkerboardShader,
    clearShader,
    colorShader,
    copyShader,
    curlShader,
    displayShaderSource,
    divergenceShader,
    gradientSubtractShader,
    pressureShader,
    splatShader,
    sunraysShader,
    sunraysMaskShader,
    vorticityShader
}
