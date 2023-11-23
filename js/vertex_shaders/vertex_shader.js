export const vertexCode = `
    attribute vec3 coordinates;
    varying vec2 vTextureCoord;


    void main(void) {
        vTextureCoord = coordinates.xy;
    
        gl_Position =  vec4(coordinates, 1.);

    }`;


    // gl_Position = vec4(coordinates, 1.0);