export const fragmentCode = `
    varying highp vec2 vTextureCoord;



    void main(void) {
        highp vec2 st = vTextureCoord;
        st.x = st.x * 0.5 + 0.5;
        st.y = st.y * 0.5 + 0.5;

        // Formas ---------------------------------
        // Cuadrado centro
        highp vec2 bl = step(vec2(0.2), st);
        highp vec2 tr = step(vec2(0.2), 1. - st);
        highp vec3 square = vec3(bl.x * bl.y * tr.x * tr.y);

        // Rectangulos
        highp float rectht = step(0.35, st.y);
        highp float recthb = step(0.35, 1. - st.y);
        highp float recthl = step(0.05, st.x);
        highp float recthr = step(0.05, 1. - st.x);
        highp vec3 recth = vec3(rectht * recthb * recthl * recthr);

        highp float rectvt = step(0.05, st.y);
        highp float rectvb = step(0.05, 1. - st.y);
        highp float rectvl = step(0.35, st.x);
        highp float rectvr = step(0.35, 1. - st.x);
        highp vec3 rectv = vec3(rectvt * rectvb * rectvl * rectvr);

        // Circle
        highp vec2 dist = st - vec2(0.5);
        highp float cr = 1. - smoothstep(0.1 - 0.007, 0.1 + 0.007, dot(dist, dist) * 4.);
        highp vec3 circle = vec3(cr);

        // Color ------------------------------------

        highp vec3 color = mix(square, vec3(1.), recth);
        color = mix(color, vec3(1.), rectv);
        color -= circle;
        

        color *= vec3(0.8, 0.8, 0.65);

        gl_FragColor = vec4(color, 1.);
    }`;

/*
    export const fragmentCode = `
    varying highp vec2 vTextureCoord;

    void main(void) {
        highp vec2 st = vTextureCoord;
        st.x = st.x * 0.5 + 0.5;
        st.y = st.y * 0.5 + 0.5;

        highp vec2 bl = step(vec2(0.2), st);
        highp vec2 tr = step(vec2(0.2), 1. - st);
        highp float pct = bl.x * bl.y * tr.x * tr.y;

        color = vec3(pct) * vec3(0.9, 0.9, 0.8); 

        gl_FragColor = vec4(color, 1.);
    }`;

*/

    //gl_FragColor = vec4(st.x, st.y, 0.5, 1.);