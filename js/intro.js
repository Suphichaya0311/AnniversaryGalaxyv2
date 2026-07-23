const startBtn = document.getElementById("startBtn");
const intro = document.querySelector(".intro");

startBtn.onclick = () => {

intro.style.transition="1.2s";

intro.style.opacity="0";

intro.style.transform="translate(-50%,-50%) scale(.75)";

document.body.classList.add("zoom");

setTimeout(()=>{

location.href="galaxy.html";

},3000);

}
