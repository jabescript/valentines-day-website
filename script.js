document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const hearts = [];
  const colors = ["#ff3366", "#ff99cc", "#ff6699", "#ffccff"];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createHeart() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height - canvas.height;
    const size = Math.random() * 20 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    hearts.push({ x, y, size, color });
  }

  function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
      ctx.fillStyle = heart.color;
      ctx.beginPath();
      ctx.moveTo(heart.x, heart.y);
      ctx.bezierCurveTo(
        heart.x - heart.size / 2,
        heart.y - heart.size / 2,
        heart.x - heart.size,
        heart.y + heart.size / 3,
        heart.x,
        heart.y + heart.size
      );
      ctx.bezierCurveTo(
        heart.x + heart.size,
        heart.y + heart.size / 3,
        heart.x + heart.size / 2,
        heart.y - heart.size / 2,
        heart.x,
        heart.y
      );
      ctx.fill();
      heart.y += 2;
      if (heart.y > canvas.height) {
        hearts.splice(index, 1);
      }
    });
  }

  function animate() {
    drawHearts();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  setInterval(createHeart, 100);
  animate();
});

function calculateTotalValue(length) {
  const minutes = Math.floor(length / 60);
  const seconds = Math.floor(length % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function calculateCurrentValue(currentTime) {
  const minutes = Math.floor(currentTime / 60).toString().padStart(2, "0");
  const seconds = Math.floor(currentTime % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function initProgressBar() {
  const player = document.getElementById("player");
  const progressbar = document.getElementById("seekObj");
  const currentTime = calculateCurrentValue(player.currentTime);
  const totalLength = calculateTotalValue(player.duration);

  document.querySelector(".start-time").textContent = currentTime;
  document.querySelector(".end-time").textContent = totalLength;
  progressbar.value = player.currentTime / player.duration;

  progressbar.addEventListener("click", function (evt) {
    const percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  });

  if (player.currentTime === player.duration) {
    document.getElementById("play-btn").classList.remove("pause");
  }
}

function initPlayers() {
  const player = document.getElementById("player");
  const playBtn = document.getElementById("play-btn");
  const muteBtn = document.getElementById("mute-btn");

  player.volume = 0.5;

  playBtn?.addEventListener("click", togglePlay);
  muteBtn?.addEventListener("click", toggleMute);

  function togglePlay() {
    if (player.paused) {
      player.play();
      playBtn.classList.add("pause");
      playBtn.textContent = "Pause";
    } else {
      player.pause();
      playBtn.classList.remove("pause");
      playBtn.textContent = "Play";
    }
  }

  function toggleMute() {
    player.muted = !player.muted;
    muteBtn.textContent = player.muted ? "Unmute" : "Mute";
  }

  player.addEventListener("timeupdate", initProgressBar);
}

initPlayers();