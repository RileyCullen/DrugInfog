var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 200 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var chart1 = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart1")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// get the data
d3.csv("female.csv", function (error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.county; }));
    y.domain([0, 50000/1000]);

    // append the rectangles for the bar chart
    chart1.selectAll(".barF")
        .data(data)
        .enter().append("rect")
        .attr("class", "barF")
        .attr("x", function (d) { return x(d.county); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.value / 1000); })
        .attr("height", function (d) { return height - y(d.value / 1000); });

    // add the x Axis
    chart1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    chart1.append("g")
        .call(d3.axisLeft(y));

    chart1.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "12px")
        .style('font-family', '"Oswald", sans-serif')
        .style('font-weight', '700')
        .style('fill', 'SlateBlue')
        .text("FEMALES in thousands");
});


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var chart2 = d3.select("#chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



// get the data
d3.csv("male.csv", function (error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.county; }));
    y.domain([0, 50]);

    // append the rectangles for the bar chart
    chart2.selectAll(".barM")
        .data(data)
        .enter().append("rect")
        .attr("class", "barM")
        .attr("x", function (d) { return x(d.county); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.value / 1000); })
        .attr("height", function (d) { return height - y(d.value / 1000); });

    // add the x Axis
    chart2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    chart2.append("g")
        .call(d3.axisLeft(y));

    chart2.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "12px")
        .style('font-family', '"Oswald", sans-serif')
        .style('font-weight', '700')
        .style('fill', 'SlateBlue')
        .text("MALES in thousands");
});

