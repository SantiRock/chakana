export const fragmentCode = `
    varying highp vec2 vTextureCoord;

    void main(void) {
        highp vec2 st = vTextureCoord;
        st.x = st.x * 0.5 + 0.5;
        st.y = st.y * 0.5 + 0.5;

        highp vec2 st1 = vTextureCoord;
        st1.x = st1.x * 0.5 + 0.5;
        st1.y = st1.y * 0.5 + 0.5;

        st1.x += 0.;

        // Formas ---------------------------------
        // Chakana 1
        // Cuadrado centro
        highp vec2 bl = step(vec2(0.3), st);
        highp vec2 tr = step(vec2(0.3), 1. - st);
        highp vec3 square = vec3(bl.x * bl.y * tr.x * tr.y);

        // Rectangulos
        highp float rectht = step(0.4, st.y);
        highp float recthb = step(0.4, 1. - st.y);
        highp float recthl = step(0.2, st.x);
        highp float recthr = step(0.2, 1. - st.x);
        highp vec3 recth = vec3(rectht * recthb * recthl * recthr);

        highp float rectvt = step(0.2, st.y);
        highp float rectvb = step(0.2, 1. - st.y);
        highp float rectvl = step(0.4, st.x);
        highp float rectvr = step(0.4, 1. - st.x);
        highp vec3 rectv = vec3(rectvt * rectvb * rectvl * rectvr);

        // Circle
        highp vec2 dist = st - vec2(0.5);
        highp float cr = 1. - smoothstep(0.1 - 0.02, 0.02 + 0.1, dot(dist, dist) * 10.);
        highp vec3 circle = vec3(cr);

        // Chakana 2 --------------
        // Cuadrado centro
        highp vec2 bl1 = step(vec2(0.31), st1);
        highp vec2 tr1 = step(vec2(0.31), 1. - st1);
        highp vec3 square1 = vec3(bl1.x * bl1.y * tr1.x * tr1.y);

        // Rectangulos
        highp float rectht1 = step(0.41, st1.y);
        highp float recthb1 = step(0.41, 1. - st1.y);
        highp float recthl1 = step(0.21, st1.x);
        highp float recthr1 = step(0.21, 1. - st1.x);
        highp vec3 recth1 = vec3(rectht1 * recthb1 * recthl1 * recthr1);

        highp float rectvt1 = step(0.21, st1.y);
        highp float rectvb1 = step(0.21, 1. - st1.y);
        highp float rectvl1 = step(0.41, st1.x);
        highp float rectvr1 = step(0.41, 1. - st1.x);
        highp vec3 rectv1 = vec3(rectvt1 * rectvb1 * rectvl1 * rectvr1);

        // Circle
        highp vec2 dist1 = st1 - vec2(0.5);
        highp float cr1 = 1. - smoothstep(0.08 - 0.005, 0.005 + 0.08, dot(dist1, dist1) * 10.);
        highp vec3 circle1 = vec3(cr1);


        // Color ------------------------------------

        highp vec3 color = mix(square, vec3(1.), recth);
        color = mix(color, vec3(1.), rectv);
        color += circle;

        highp vec3 color1 = mix(square1, vec3(1.), recth1);
        color1 = mix(color1, vec3(1.), rectv1);
        color1 += circle1;

        color -= color1;

        color *= vec3(0.9, 0.8, 0.9);

        gl_FragColor = vec4(color, 1.);
    }`;
