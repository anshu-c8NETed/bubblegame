var timer = 60;
var score = 0;
var hit = 0;


function bubbleMaker() {
  var clutter = "";
  
  for (var i = 1; i <= 126; i++) {
    var rn = Math.floor(Math.random() * 10);
    // Random gradient colors for each bubble
    var hue1 = Math.floor(Math.random() * 360);
    var hue2 = (hue1 + 60) % 360;
    clutter += `<div class="bubble" style="background: linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%)); animation-delay: ${i * 0.01}s">${rn}</div>`;
  }
  
  document.querySelector("#pbtm").innerHTML = clutter;
}


function runTimer() {
  var timerint = setInterval(function() {
    if (timer > 0) {
      timer--;
      var timerElement = document.querySelector("#timervalue");
      timerElement.textContent = timer;
      

      if (timer <= 10) {
        timerElement.style.background = "linear-gradient(135deg, #ff6b6b, #ee5a6f)";
        timerElement.style.color = "white";
        timerElement.style.animation = "pulse 0.5s ease-in-out infinite";
      } else if (timer <= 30) {
        timerElement.style.background = "linear-gradient(135deg, #feca57, #ff9ff3)";
      }
    } else {
      document.querySelector("#pbtm").innerHTML = `
        <div style="text-align: center;">
          <h1 style="margin-bottom: 20px;">GAME OVER</h1>
          <p style="font-size: 24px; color: #667eea; font-weight: 600;">Final Score: ${score}</p>
        </div>
      `;
      clearInterval(timerint);

      createConfetti();
    }
  }, 1000);
}

function getNewHit() {
  hit = Math.floor(Math.random() * 10);
  var hitElement = document.querySelector("#hitval");
  hitElement.textContent = hit;
  

  hitElement.style.animation = "none";
  setTimeout(() => {
    hitElement.style.animation = "pulse 0.5s ease-in-out";
  }, 10);
}

function scoreIncrease() {
  score += 10;
  var scoreElement = document.querySelector("#scoreval");
  scoreElement.textContent = score;
  

  scoreElement.style.animation = "none";
  setTimeout(() => {
    scoreElement.style.animation = "pulse 0.3s ease-in-out";
  }, 10);
}

function createParticles(x, y) {
  for (var i = 0; i < 12; i++) {
    var particle = document.createElement("div");
    particle.className = "particle";
    
    var size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    
    var hue = Math.random() * 360;
    particle.style.background = `hsl(${hue}, 70%, 60%)`;
    
    var angle = (Math.PI * 2 * i) / 12;
    var velocity = Math.random() * 100 + 50;
    var tx = Math.cos(angle) * velocity;
    var ty = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--tx', tx + "px");
    particle.style.setProperty('--ty', ty + "px");
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}


function createScorePopup(x, y) {
  var popup = document.createElement("div");
  popup.className = "score-popup";
  popup.textContent = "+10";
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
  }, 1000);
}


function createConfetti() {
  for (var i = 0; i < 100; i++) {
    setTimeout(() => {
      var confetti = document.createElement("div");
      confetti.className = "particle";
      
      var size = Math.random() * 8 + 4;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-20px";
      
      var hue = Math.random() * 360;
      confetti.style.background = `hsl(${hue}, 70%, 60%)`;
      confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + "px");
      confetti.style.setProperty('--ty', window.innerHeight + "px");
      confetti.style.animation = "particleFade 3s ease-out forwards";
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 30);
  }
}


var style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
  }
`;
document.head.appendChild(style);


document.querySelector("#pbtm").addEventListener("click", function(dets) {
  var clickedNo = Number(dets.target.textContent);
  
  if (clickedNo === hit) {

    var rect = dets.target.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    

    createParticles(x, y);
    createScorePopup(x, y);
    

    scoreIncrease();
    bubbleMaker();
    getNewHit();

  }
});


getNewHit();
runTimer();
bubbleMaker();