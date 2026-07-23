
const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize(){

canvas.width = innerWidth;
canvas.height = innerHeight;

}

resize();

window.addEventListener("resize",resize);

const stars=[];

const STAR_COUNT=900;

for(let i=0;i<STAR_COUNT;i++){

stars.push({

angle:Math.random()*Math.PI*2,

distance:Math.random()*canvas.width*0.55,

size:Math.random()*2.2,

speed:0.0002+Math.random()*0.0008,

alpha:.4+Math.random()*.6,

});

}

let rotation=0;

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

const cx=canvas.width/2;

const cy=canvas.height/2;

rotation+=0.0004;

for(let s of stars){

s.angle+=s.speed;

const spiral=s.distance*0.015;

const x=cx+
Math.cos(s.angle+rotation)*
(s.distance+spiral*Math.cos(s.angle*3));

const y=cy+
Math.sin(s.angle+rotation)*
(s.distance+spiral*Math.sin(s.angle*3));

ctx.beginPath();

ctx.arc(x,y,s.size,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;

ctx.shadowBlur=15;

ctx.shadowColor="#ffffff";

ctx.fill();

}

requestAnimationFrame(draw);

}

draw();
