const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

resize();
window.addEventListener("resize", resize);

// ======================
// GALAXY STARS
// ======================

const stars = [];
const STAR_COUNT = 1200;

for(let i=0;i<STAR_COUNT;i++){

  stars.push({

    angle: Math.random()*Math.PI*2,
    distance: Math.random()*canvas.width*0.6,
    size: Math.random()*2.2,
    speed: 0.00015 + Math.random()*0.0007,
    alpha: 0.3 + Math.random()*0.7

  });

}

let rotation = 0;

// ======================
// DRAW GALAXY
// ======================

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const cx = canvas.width/2;
  const cy = canvas.height/2;

  rotation += 0.00025;

  // nebula glow
  const g = ctx.createRadialGradient(
    cx, cy, 0,
    cx, cy, canvas.width*0.35
  );

  g.addColorStop(0,"rgba(120,100,255,0.25)");
  g.addColorStop(0.4,"rgba(80,120,255,0.12)");
  g.addColorStop(1,"rgba(0,0,0,0)");

  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let s of stars){

    s.angle += s.speed;

    const spiral = s.distance*0.018;

    const x = cx +
      Math.cos(s.angle+rotation) *
      (s.distance + spiral*Math.cos(s.angle*3));

    const y = cy +
      Math.sin(s.angle+rotation) *
      (s.distance + spiral*Math.sin(s.angle*3));

    ctx.beginPath();

    ctx.arc(x,y,s.size,0,Math.PI*2);

    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;

    ctx.shadowBlur = 18;
    ctx.shadowColor = "#ffffff";

    ctx.fill();

  }

  requestAnimationFrame(draw);

}

draw();

// ======================
// MEMORY STARS
// ======================

const memoryLayer = document.getElementById("memoryLayer");

const memoryPositions = [

  [15,20],[28,35],[40,18],[60,25],[75,15],
  [82,38],[68,50],[50,40],[30,55],[18,70],
  [40,75],[58,72],[78,68],[88,52],[72,85],
  [52,88],[32,86],[12,52],[22,15],[62,8]

];

memoryPositions.forEach((pos,index)=>{

  const star = document.createElement("div");

  star.className = "memoryStar";

  star.style.left = pos[0] + "%";
  star.style.top = pos[1] + "%";

  star.style.animationDelay = (Math.random()*2)+"s";

  star.onclick = ()=>{

    alert(`Memory ${String(index+1).padStart(2,"0")} ✨`);

  };

  memoryLayer.appendChild(star);

});

// ======================
// SHOOTING STAR
// ======================

function createShootingStar(){

  const s = document.createElement("div");

  s.style.position = "fixed";
  s.style.width = "2px";
  s.style.height = "120px";
  s.style.background = "linear-gradient(transparent, white)";
  s.style.left = (-10 + Math.random()*20) + "%";
  s.style.top = (Math.random()*35) + "%";
  s.style.transform = "rotate(45deg)";
  s.style.pointerEvents = "none";
  s.style.zIndex = "5";

  document.body.appendChild(s);

  s.animate([

    {
      transform:"translate(-200px,-200px) rotate(45deg)",
      opacity:0
    },

    {
      opacity:1,
      offset:0.1
    },

    {
      transform:"translate(1800px,1000px) rotate(45deg)",
      opacity:0
    }

  ],{
    duration:2500,
    easing:"linear"
  });

  setTimeout(()=>s.remove(),2600);

}

setInterval(createShootingStar,2200);
