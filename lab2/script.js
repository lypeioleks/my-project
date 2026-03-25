function draw() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const v0 = +document.getElementById("v0").value;
    const angle = +document.getElementById("angle").value * Math.PI / 180;
    const g = +document.getElementById("g").value;

    const tFlight = (2 * v0 * Math.sin(angle)) / g;

    let data = [];
    for (let t = 0; t <= tFlight; t += 0.1) {
        let x = v0 * Math.cos(angle) * t;
        let y = v0 * Math.sin(angle) * t - (g * t * t) / 2;
        data.push({ x, y });
    }

    const width = 800;
    const height = 500;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([50, width - 50]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([height - 50, 50]);

    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    // Осі
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${height - 50})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yAxis);

    // Траєкторія (анімація)
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", line);

    const totalLength = path.node().getTotalLength();

    path
        .attr("stroke-dasharray", totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);

    // Точка руху
    const circle = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "red");

    circle.transition()
        .duration(2000)
        .attrTween("transform", function () {
            return function (t) {
                const point = path.node().getPointAtLength(t * totalLength);
                return `translate(${point.x},${point.y})`;
            };
        });
}