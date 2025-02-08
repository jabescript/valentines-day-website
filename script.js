document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    const hearts = [];
    const colors = ['#ff3366', '#ff99cc', '#ff6699', '#ffccff'];

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
            ctx.bezierCurveTo(heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size, heart.y + heart.size / 3, heart.x, heart.y + heart.size);
            ctx.bezierCurveTo(heart.x + heart.size, heart.y + heart.size / 3, heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y);
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

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    setInterval(createHeart, 100);
    animate();
});
