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
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ":" + seconds;

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time =
      (current_minute < 10 ? "0" + current_minute : current_minute) +
      ":" +
      (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

function initProgressBar() {
  var player = document.getElementById("player");
  var length = player.duration;
  var current_time = player.currentTime;

  // calculate total length of value
  var totalLength = calculateTotalValue(length);
  document.querySelector(".end-time").innerHTML = totalLength;

  // calculate current value time
  var currentTime = calculateCurrentValue(current_time);
  document.querySelector(".start-time").innerHTML = currentTime;

  var progressbar = document.getElementById("seekObj");
  progressbar.value = player.currentTime / player.duration;

  progressbar.addEventListener("click", function (evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  });

  if (player.currentTime == player.duration) {
    document.getElementById("play-btn").classList.remove("pause");
  }
}

function initPlayers(num) {
  // pass num in if there are multiple audio players e.g 'player' + i

  for (var i = 0; i < num; i++) {
    (function () {
      // Variables
      // ----------------------------------------------------------
      // audio embed object
      var playerContainer = document.getElementById("player-container"),
        player = document.getElementById("player"),
        isPlaying = false,
        playBtn = document.getElementById("play-btn"),
        muteBtn = document.getElementById("mute-btn");

      // Set initial volume to 50%
      player.volume = 0.5;

      // Controls Listeners
      // ----------------------------------------------------------
      if (playBtn != null) {
        playBtn.addEventListener("click", function () {
          togglePlay();
        });
      }

      if (muteBtn != null) {
        muteBtn.addEventListener("click", function () {
          toggleMute();
        });
      }

      // Controls & Sounds Methods
      // ----------------------------------------------------------
      function togglePlay() {
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
          document.getElementById("play-btn").classList.remove("pause");
        } else {
          player.play();
          document.getElementById("play-btn").classList.add("pause");
          isPlaying = true;
        }
      }

      function toggleMute() {
        player.muted = !player.muted;
        muteBtn.textContent = player.muted ? "Unmute" : "Mute";
      }

      player.addEventListener("timeupdate", initProgressBar);
    })();
  }
}

initPlayers(document.querySelectorAll("#player-container").length);