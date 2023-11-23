
import { vertexCode } from "./vertex_shader.js";
import { fragmentCode } from "../fragment_shaders/fragment_shader.js";

// Prepare the canvas and get WebGL context

const canvas = document.getElementById('mycanvas');
const gl = canvas.getContext('experimental-webgl');

// Define the geometry and store it in buffer objects  ----------------

const vertices = [
    -1., 1., 0.,
    -1., -1., 0.,
    1., -1., 0.,
    1., 1., 0.
];

const indices = [3, 2, 1, 3, 1, 0];

const colors = [1,1,1, 1,1,1, 1,1,1];

// Create and store data into vertex buffer
const vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//gl.bindBuffer(gl.ARRAY_BUFFER, null);

//Create and store dara into color buffer
const color_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// Create and store data into index buffer ---
const index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Create and compile Shader programs ----------------

const vertCode = vertexCode;
const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

const fragCode = fragmentCode;
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
 
// Associating attributtes to vertex shader ---

const Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
const Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
const Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

const coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);
gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);

gl.useProgram(shaderProgram);

// Matrix -----------------

function get_projection(angle, a, zMin, zMax) {
    const ang = Math.tan((angle * .5) * Math.PI/180);
    return [
        0.5/ang, 0, 0, 0,
        0, 0.5*a/ang, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
    ];
}

const proj_matrix = get_projection(40, canvas.width/canvas.height,1, 100);
const mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
const view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

//translating z
view_matrix[14] = view_matrix[14]-6; //zoom

// Rotation --------

function rotateZ(m , angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const mv0 = m[0], mv4 = m[4], mv8 = m[8];

    m[0] = c * m[0] - s * m[1];
    m[4] = c * m[4] - s * m[5];
    m[8] = c * m[8] - s * m[9];
    m[1] = c * m[1] + s * mv0;
    m[5] = c * m[5] + s * mv4;
    m[9] = c * m[9] + s * mv8;
}


// Associate the shader programs to buffer objects
//gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

// Drawing the object

let time_old = 0;

const animate = function(time) {
    let dt = time - time_old;
    rotateZ(mov_matrix, dt * 0.002);
    time_old = time;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0., 0., 0., 1.);
    gl.clearDepth(1.0);
    gl.viewport(0., 0., canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(animate);
}

