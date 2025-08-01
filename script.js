// Read cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let [key, value] = c.split("=");
    if (key === name) return parseInt(value);
  }
  return 0; // default if not found
}

// Set a cookie
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

let count = getCookie("clickCount");
let activeButtons = 0;
let maxButtons = 30;
const buttonPrefab = document.getElementById("buttonPrefab")
const counter = document.getElementById("counter");
const button = document.getElementById("clickButton");
const IGGY = document.getElementById("IGGY");

function choosePosition( newButton){
  const buttonWidth = newButton.offsetWidth;
  const buttonHeight = newButton.offsetHeight;

  const minX = -300;
  var minY = IGGY.getBoundingClientRect().top + 325;

  const maxX = + 350;
  
  const newX = Math.floor(Math.random() * (maxX - minX) + minX);
  
  var maxY = minY + 300;
  if (newX > 100) minY += 100, maxY -= 50;
  if (newX < -200) minY += 50;
  

  const newY = Math.floor(Math.random() * (maxY - minY) + minY);

  const allignX = window.innerWidth / 2 - buttonWidth / 2;

  newButton.style.left = `${allignX}px`;
  newButton.style.top = `${newY}px`;
  newButton.style.transform = `translate(${newX}px, 0px)`;
}

function taieAntena(newButton){
  console.log("taiat");
  newButton.remove();
  count++;
  activeButtons--;
  counter.textContent = count;
  setCookie("clickCount", count);
}

function spawnButton(){
  if (activeButtons >= maxButtons) return false;
  activeButtons++;
  const newButton = buttonPrefab.cloneNode(true);
  document.body.appendChild(newButton);
  newButton.id = "";
  newButton.style.display = "block";
  choosePosition(newButton);
}
// Main game logic

window.addEventListener("load", ()=>{
  counter.textContent = count;
  spawnButton();
});

setInterval(spawnButton, 500);
