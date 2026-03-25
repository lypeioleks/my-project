const ball = document.getElementById("ball");

let animationId;
let t = 0;
let dt = 0.016;
let running = false;

function animate() {

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

    ball.setAttribute("cx", x);

    document.getElementById("info").innerText =
        `t = ${t.toFixed(2)} c | x = ${x.toFixed(2)} px`;

    t += dt;

    if (running) {
        animationId = requestAnimationFrame(animate);
    }
}

function start() {
    if (!running) {
        running = true;
        animate();
    }
}

function stop() {
    running = false;
    cancelAnimationFrame(animationId);
}

function reset() {
    stop();
    t = 0;
    ball.setAttribute("cx", 50);
}