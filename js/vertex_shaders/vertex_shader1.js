export const vertexCode = `
    attribute vec3 coordinates;

    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;

    attribute vec3 vColor

    varying vec2 vTextureCoord;
    varying vec3 vColor;
    
    void main(void) {
        vTextureCoord = coordinates.xy;
    
        gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(coordinates, 1.);
        gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(coordinates, 1.);
        vColor = color;
    }`;


    // gl_Position = vec4(coordinates, 1.0);