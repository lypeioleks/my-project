const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Додаємо масштаб та осі один раз
const xScale = d3.scaleLinear().range([50, width - 50]);
const yScale = d3.scaleLinear().range([height - 50, 50]);

const xAxis = svg.append("g").attr("transform", `translate(0, ${height - 50})`);
const yAxis = svg.append("g").attr("transform", `translate(50, 0)`);

// Ініціалізація доменів
xScale.domain([0, 100]);
yScale.domain([0, 50]);

xAxis.call(d3.axisBottom(xScale).ticks(10));
yAxis.call(d3.axisLeft(yScale).ticks(10));

function draw() {
    const v0 = parseFloat(document.getElementById("v0").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const g = parseFloat(document.getElementById("g").value);
    const color = document.getElementById("color").value;

    if (v0 <= 0 || g <= 0) {
        alert("Початкова швидкість і g повинні бути більші за 0");
        return;
    }

    const tFlight = (2 * v0 * Math.sin(angle)) / g;

    let data = [];
    for (let t = 0; t <= tFlight; t += 0.05) {
        let x = v0 * Math.cos(angle) * t;
        let y = v0 * Math.sin(angle) * t - (g * t * t) / 2;
        if (y < 0) y = 0;
        data.push({ x, y });
    }

    // Оновлюємо масштаб, якщо треба
    const maxX = d3.max(data, d => d.x);
    const maxY = d3.max(data, d => d.y);

    if (maxX > xScale.domain()[1]) xScale.domain([0, maxX + 10]);
    if (maxY > yScale.domain()[1]) yScale.domain([0, maxY + 10]);

    xAxis.call(d3.axisBottom(xScale).ticks(10));
    yAxis.call(d3.axisLeft(yScale).ticks(10));

    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

    const totalLength = path.node().getTotalLength();

    path
        .attr("stroke-dasharray", totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);

    const circle = svg.append("circle")
        .attr("r", 5)
        .attr("fill", color);

    circle.transition()
        .duration(2000)
        .attrTween("transform", function () {
            return function (t) {
                const point = path.node().getPointAtLength(t * totalLength);
                return `translate(${point.x}, ${point.y})`;
            };
        });
}

// Кнопка очищення графіка
function clearGraph() {
    svg.selectAll("path").remove();
    svg.selectAll("circle").remove();
    xScale.domain([0, 100]);
    yScale.domain([0, 50]);
    xAxis.call(d3.axisBottom(xScale).ticks(10));
    yAxis.call(d3.axisLeft(yScale).ticks(10));
}