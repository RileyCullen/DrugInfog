// dimensions
var infogHeight = 480, infogWidth = 600;
var graphGroupX = (infogWidth / 2) - 40, graphGroupY = 150;
var footerX = 0, footerY = infogHeight - 50;

// other
var textColor = "navy";

// setting up canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", infogWidth * 2);
canvas.setAttribute("height", infogHeight * 2);
ctx.scale(2,2);

/* ACTUAL INFOGRAPHIC CODE */
ctx.fillStyle = "#33cccc";
ctx.fillRect(0, 0, infogWidth, 50);

ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "16px Oswald sans-serif";
ctx.fillText("Rx DRUG MUSUSE has mixed results", infogWidth / 2, 25);

ctx.fillStyle = "lavender";
ctx.fillRect(0, 50, infogWidth, infogHeight);

ctx.fillStyle = "white";
ctx.fillRect(20, 50, infogWidth - 40, infogHeight);

ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "bold 13px Oswald sans-serif";
ctx.fillText("2018 Monitoring the Future College Students and Young Adults " +
    "Survey Results", infogWidth / 2, 75);

ctx.font = "16px Oswald sans-serif";
ctx.fillText("Rx OPIOID MUSUSE: SIGNIFICANT FIVE-YEAR DROP IN BOTH GROUPS*", infogWidth / 2, 125);

ctx.font = "100 16px Oswald sans-serif";
ctx.fillText("PAST YEAR MISUSE", graphGroupX + 120, graphGroupY + 20);

var image = document.getElementById("image2");
ctx.drawImage(image, graphGroupX - 225, graphGroupY + 80, 130, 130);

ctx.fillStyle = "navy";
ctx.fillRect(footerX, footerY, infogWidth, 50);

image = document.getElementById("image");
ctx.drawImage(image, footerX + 10, footerY + 5, 250, 40);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "16px Oswald sans-serif";
ctx.fillText("DRUGABUSE.GOV", infogWidth - 100, footerY + 25);

/* D3 + CANVAS CODE FOR BAR GRAPHS */
var chartWidth = 150, chartHeight = 125;
var xScale = d3.scaleBand()
    .range([0, chartWidth])
    .padding(0.4),
    yScale = d3.scaleLinear()
        .range([chartHeight, 0]);

// Female Graph Code

// Label
ctx.fillStyle = "Slateblue";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "700 12px Oswald sans-serif";
ctx.fillText("FEMALES in thousands", graphGroupX + 15, graphGroupY + 70);

// Drawing the graph
d3.csv("female.csv", function(error, data) {
    if (error) throw error;

    console.log(data);
    var offsetX = graphGroupX - 60, offsetY = graphGroupY + 220, 
        yTop = offsetY - chartHeight;
    // (offsetX, offsetY) == (0, 0) on chart
    var yTicks;

    // Standard D3 set up
    xScale.domain(data.map(function(d) { return d.county; }));
    yScale.domain([0, d3.max(data, function(d) {
        data.forEach(function (d) {
            d.value = parseInt(d.value);
        });
        return d.value;
    })/ 1000]);

    yTicks = yScale.ticks(12);

    // Drawing x-axis
    ctx.fillStyle = "black";
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + chartWidth, offsetY);
    ctx.stroke();

    // Drawing x-axis ticks
    ctx.fillStyle = "black";
    xScale.domain().forEach(d => {
        ctx.moveTo((xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY);
        ctx.lineTo((xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY + 6);
    });
    ctx.stroke();

    // Drawing x-axis labels
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "10px Times New Roman, Times, serif";

    xScale.domain().forEach( (d, i) => {
        ctx.fillText(d, (xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY + 6);
    });

   // Drawing y-axis
   ctx.moveTo(offsetX, yTop);
   ctx.lineTo(offsetX, offsetY);
   ctx.stroke();

   // drawing y-axis ticks
   ctx.fillStyle = "black";
   yTicks.forEach(d => {
        ctx.moveTo(offsetX, yTop + (yScale(d) - 0.5));
        ctx.lineTo(offsetX - 6, yTop + (yScale(d) - 0.5));
   });
   ctx.stroke();

   // drawing y-axis tick labels
   ctx.textAlign = "right";
   ctx.textBaseline = "middle";
   ctx.font = "8px Times New Roman, Times, serif";

   yTicks.forEach(d => {
        ctx.fillText(d, offsetX - 9, (yTop) + yScale(d));
   });

   // drawing the bars
   ctx.fillStyle = "skyblue";
   data.forEach(d => {
        ctx.fillRect(offsetX + xScale(d.county), offsetY, xScale.bandwidth(), -(chartHeight - yScale(d.value / 1000)));
   });
});

// Male chart

ctx.fillStyle = "Slateblue";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "700 12px Oswald sans-serif";
ctx.fillText("MALES in thousands", graphGroupX + 220, graphGroupY + 70);

// D3 code
d3.csv("male.csv", function(error, data) {
    if (error) throw error;

    console.log(data);

    // (offsetX, offsetY) == (0, 0) on chart
    var offsetX = graphGroupX + 140, offsetY = graphGroupY + 220, 
        yTop = offsetY - chartHeight;
    var yTicks;

    // Standard D3 set up
    xScale.domain(data.map(function(d) { return d.county; }));
    yScale.domain([0, d3.max(data, function(d) {
        data.forEach(function (d) {
            d.value = parseInt(d.value);
        });
        return d.value;
    })/ 1000]);

    yTicks = yScale.ticks(12);

    // Drawing x-axis
    ctx.fillStyle = "black";
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + chartWidth, offsetY);
    ctx.stroke();

    // Drawing x-axis ticks
    ctx.fillStyle = "black";
    xScale.domain().forEach(d => {
        ctx.moveTo((xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY);
        ctx.lineTo((xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY + 6);
    });
    ctx.stroke();

    // Drawing x-axis labels
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "10px Times New Roman, Times, serif";

    xScale.domain().forEach( (d, i) => {
        ctx.fillText(d, (xScale(d) + xScale.bandwidth() / 2) + offsetX, offsetY + 6);
    });

   // Drawing y-axis
   ctx.moveTo(offsetX, yTop);
   ctx.lineTo(offsetX, offsetY);
   ctx.stroke();

   // drawing y-axis ticks
   ctx.fillStyle = "black";
   yTicks.forEach(d => {
        ctx.moveTo(offsetX, yTop + (yScale(d) - 0.5));
        ctx.lineTo(offsetX - 6, yTop + (yScale(d) - 0.5));
   });
   ctx.stroke();

   // drawing y-axis tick labels
   ctx.textAlign = "right";
   ctx.textBaseline = "middle";
   ctx.font = "8px Times New Roman, Times, serif";

   yTicks.forEach(d => {
        ctx.fillText(d, offsetX - 9, (yTop) + yScale(d));
   });

   // drawing the bars
   ctx.fillStyle = "skyblue";
   data.forEach(d => {
        ctx.fillRect(offsetX + xScale(d.county), offsetY, xScale.bandwidth(), -(chartHeight - yScale(d.value / 1000)));
   });
});