export default class MouseDraw{
  constructor () {

  }
  draw (){
    const canvas = document.getElementById('mouseEvnet')
    const ctx = canvas.getContext('2d')
  
    window.addEventListener("resize", setupCanvas);
  
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
  
    const pointer = {
      x: .5 * window.innerWidth,
      y: .5 * window.innerHeight,
    }
  
    //숫자가 낮을수록 느림
    const params = {
      spring:  0.4,
      pointsNumber: 30,
      friction: .5,
      baseWidth : .4,
    };
  
    //꼬리의 길이
    const trail = new Array(params.pointsNumber);
  
    for (let i = 0; i < params.pointsNumber; i++) {
        trail[i] = {
            x: pointer.x,
            y: pointer.y,
            dx: 0,
            dy: 0,
        }
    }
  
  
    window.addEventListener("click", e => {
      updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener("mousemove", e => {
      updateMousePosition(e.clientX, e.clientY);
    });
  
    function updateMousePosition(eX, eY) {
      pointer.x = eX;
      pointer.y = eY;
    }
  
    setupCanvas();
  
  
    const p = {x: 0, y: 0}; // coordinate to draw
  
    update(0);
  
    function update(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
        trail.forEach((p, pIdx) => {
          const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
          const spring = pIdx === 0 ? .4 * params.spring : params.spring;
          p.dx += (prev.x - p.x) * spring;
          p.dy += (prev.y - p.y) * spring;
          p.dx *= params.friction;
          p.dy *= params.friction;
  
  
          p.x += p.dx;
          p.y += p.dy;
      
      
          if (pIdx === 0) {
              // start the line on the first point
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
          }
      });
  
      for( let i = 0; i < trail.length - 1; i++){
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        const lineWidth = params.baseWidth * (params.pointsNumber - i);
        ctx.lineWidth = lineWidth
        ctx.stroke();
      }

        window.requestAnimationFrame(update);
    }
  }
}