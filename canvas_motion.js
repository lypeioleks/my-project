const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId;
let t = 0;
let dt = 0.016;
let running = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x0 = 50;
    let v0 = parseFloat(document.getElementById("velocity").value);
    let a = parseFloat(document.getElementById("acceleration").value);
    let type = document.getElementById("motionType").value;

    let x;

    if (type === "uniform") {
        x = x0 + v0 * t;
    } else {
        x = x0 + v0 * t + (a * t * t) / 2;
    }

    ctx.beginPath();
    ctx.arc(x, 100, 15, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    document.getElementById("info").innerText =
        `t = ${t.toFixed(2)} c | x = ${x.toFixed(2)} px`;

    t += dt;

    if (running) {
        animationId = requestAnimationFrame(draw);
    }
}

function start() {
    if (!running) {
        running = true;
        draw();
    }
}

function stop() {
    running = false;
    cancelAnimationFrame(animationId);
}

function reset() {
    stop();
    t = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}