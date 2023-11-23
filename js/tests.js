const container = document.querySelector('.container');

let st1offset = 0.;
const o = 0.;

function mostrarPosicionMouse(event) {

    const border = (window.innerWidth - container.offsetWidth)/2.;
    const posX = event.clientX - border + 1.5;
    const posY = event.clientY;
    const ref = window.innerWidth/2.;

    const x = ref - posX - border;


    const xnormalize = (x/(container.offsetWidth/2)) * 0.19;

    st1offset = xnormalize;
    console.log(st1offset);
    return st1offset;
  }
  

  container.addEventListener('mousemove', mostrarPosicionMouse);