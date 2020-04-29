export const getTextureScale = (texture, width, height) => ({
    x: width / texture.width,
    y: height / texture.height
})
