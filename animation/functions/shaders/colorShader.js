export const colorShader = {
    type: "FRAGMENT_SHADER",
    source: `
        precision mediump float;
    
        uniform vec4 color;
    
        void main () {
            gl_FragColor = color;
        }
    `,
    keywords: null
}
