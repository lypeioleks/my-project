const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawGrid() {
    ctx.strokeStyle = "#ccc";
    ctx.setLineDash([5, 5]);

    for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j <= canvas.height; j += 50) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }

    ctx.setLineDash([]);
}

function drawAxes() {
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
}

function drawTrajectory() {
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const v0 = parseFloat(document.getElementById("velocity").value);
    const a = parseFloat(document.getElementById("acceleration").value);
    const color = document.getElementById("color").value;

    let t = 0;
    let dt = 0.05;

    ctx.strokeStyle = color;
    ctx.beginPath();

    while (true) {
        let x = x0 + v0 * Math.cos(angle) * t;
        let y = y0 + v0 * Math.sin(angle) * t - (a * t * t) / 2;

        if (y < 0) break;

        let canvasX = x * 5;
        let canvasY = canvas.height - y * 5;

        if (t === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }

        t += dt;
    }

    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawAxes();
}

drawGrid();
drawAxes();