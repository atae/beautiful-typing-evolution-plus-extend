// @ts-nocheck
import anime from "animejs";

const animation = () => {
var c = document.getElementById("c");
//Sets canvase and canvase size
var ctx = c.getContext("2d");
var cH;
var cW;
//Canvas Background
var bgColor = "#FFBE53";

//When do these get used?
var animations = [];
var circles = [];

// Chooses color randomly based on preset array
var colorPicker = (function() {
var colors = ["#2980B9", "#FFBE53", "#16a085"];
var textColors = colors.slice(1).push(colors[0]);
var index = 0;
function next() {
  index = index++ < colors.length-1 ? index : 0;
  return colors[index];
}
function current() {
  return colors[index]
}
function text() {
  return textColors[index]
}
return {
  next: next,
  current: current
}
})();

function removeAnimation(animation) {
var index = animations.indexOf(animation);
if (index > -1) animations.splice(index, 1);
}

// fills the page depending on the size of the page, goes out in a circle
function calcPageFillRadius(x, y) {
var l = Math.max(x - 0, cW - x);
var h = Math.max(y - 0, cH - y);
return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

//Looks at clicks to start the event hopefully
function addClickListeners() {
// touch start starts when touch surface is touched?
document.addEventListener("touchstart", handleEvent);
let counter = 0;
let color = "#2ecc71";
document.addEventListener("keydown", (e) => {
  // debugger
// if ($('.currentText').text().length <= 2){
  counter ++;
  $('.currentText').css("color", color)
  if (counter % 30 === 0 || e.key == "1") {
    handleEvent(e)    // handleEvent;
  }
// } else {
  // $('.currentText').off('change',handleEvent);
}
)
document.addEventListener("mousedown", handleEvent);
let a = setInterval(() => {handleEvent({touches: null})}, Math.random()*100 + 140)
window.setTimeout(()=> {clearInterval(a)}, 2000)
};

const handleEvent = (e) => {

  if (e.touches) {
    e.preventDefault();
    e = e.touches[0];
  }
  // goes through color
  let pageX = Math.random() * cW
  let pageY = Math.random() * cH
  var currentColor = colorPicker.current();
  var nextColor = colorPicker.next();
  // expands the color depending on the position of e
  var targetR = calcPageFillRadius(pageX, pageY );
  var rippleSize = Math.min(200, (cW * .4));
  var minCoverDuration = 750;

  var pageFill = new Circle({
    x: pageX,
    y: pageY,
    r: 0,
    fill: nextColor
  });
  var fillAnimation = anime({
    targets: pageFill,
    r: targetR,
    duration:  Math.max(targetR / 2 , minCoverDuration ),
    easing: "easeOutQuart",
    complete: function(){
      bgColor = pageFill.fill;
      removeAnimation(fillAnimation);
    }
  });

  var ripple = new Circle({
    x: pageX,
    y: pageY,
    r: 0,
    fill: currentColor,
    stroke: {
      width: 3,
      color: currentColor
    },
    opacity: 1
  });
  var rippleAnimation = anime({
    targets: ripple,
    r: rippleSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: removeAnimation
  });

  var particles = [];
  for (var i=0; i<32; i++) {
    var particle = new Circle({
      x: pageX,
      y: pageY,
      fill: currentColor,
      r: anime.random(24, 48)
    })
    particles.push(particle);
  }
  var particlesAnimation = anime({
    targets: particles,
    x: function(particle){
      return particle.x + anime.random(rippleSize, -rippleSize);
    },
    y: function(particle){
      return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
    },
    r: 0,
    easing: "easeOutExpo",
    duration: anime.random(1000,1300),
    complete: removeAnimation
  });
  animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
for(var key in b) {
  if(b.hasOwnProperty(key)) {
    a[key] = b[key];
  }
}
return a;
}

var Circle = function(opts) {
extend(this, opts);
}

Circle.prototype.draw = function() {
ctx.globalAlpha = this.opacity || 1;
ctx.beginPath();
ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
if (this.stroke) {
  ctx.strokeStyle = this.stroke.color;
  ctx.lineWidth = this.stroke.width;
  ctx.stroke();
}
if (this.fill) {
  ctx.fillStyle = this.fill;
  ctx.fill();
}
ctx.closePath();
ctx.globalAlpha = 1;
}

var animate = anime({
duration: Infinity,
update: function() {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cW, cH);
  animations.forEach(function(anim) {
    anim.animatables.forEach(function(animatable) {
      animatable.target.draw();
    });
  });
}
});

var resizeCanvas = function() {
cW = window.innerWidth;
cH = window.innerHeight;
c.width = cW * devicePixelRatio;
c.height = cH * devicePixelRatio;
ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
resizeCanvas();
if (window.CP) {
  // CodePen's loop detection was causin' problems
  // and I have no idea why, so...
  window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
}
window.addEventListener("resize", resizeCanvas);
addClickListeners();
if (!!window.location.pathname.match(/fullcpgrid/)) {
  // startFauxClicking();
}
handleInactiveUser();
})();

function handleInactiveUser() {
var inactive = setTimeout(function(){
  // fauxClick(cW/2, cH/2);
}, 2000);

function clearInactiveTimeout() {
  clearTimeout(inactive);
  document.removeEventListener("mousedown", clearInactiveTimeout);
  document.removeEventListener("touchstart", clearInactiveTimeout);
}

document.addEventListener("mousedown", clearInactiveTimeout);
document.addEventListener("touchstart", clearInactiveTimeout);
}

// function startFauxClicking() {
// setTimeout(function(){
//   fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
//   startFauxClicking();
// }, anime.random(200, 900));
// }
//
// function fauxClick(x, y) {
// var fauxClick = new Event("mousedown");
// fauxClick.pageX = x;
// fauxClick.pageY = y;
// document.dispatchEvent(fauxClick);
//
// }
}

export default animation
export const changeBackground = () => {
  handleEvent();
}