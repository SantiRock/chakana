export const vertexCode = `
    attribute vec3 coordinates;
    varying vec2 vTextureCoord;
    uniform mat4 u_xformMatrix;


    void main(void) {
        vTextureCoord = coordinates.xy;
    
        gl_Position =  u_xformMatrix * vec4(coordinates, 1.);
    }`;


    // gl_Position = vec4(coordinates, 1.0);