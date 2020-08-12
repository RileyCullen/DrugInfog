// desc: This function bolds the text from 0 to rightBound and makes the text from
//       rightBound to text.length normal 
//
// parameters:
// -----------
// ctx : canvas context 
//      ctx allows function to draw text to the canvas
// text : string
//      The text we want to output to the screen
// x : int
//      X position of text
// y : int
//      Y position of text
// font : string
//      Font of text the function will output
// color : string
//      Color of text the function will output
// rightBound : int
//      Right most character we want to make bold
function LeftBold(ctx, text, x, y, font, fontSize, color, rightBound) 
{
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "bold " + fontSize + "px " + font;
    ctx.fillText(text.substring(0, rightBound), x - (ctx.measureText(text).width) / 2, y);

    ctx.font = fontSize + "px " + font;
    console.log("text length: " + text.length);
    ctx.fillText(text.substring(rightBound, text.length), (x - ctx.measureText(text).width / 2
        + ctx.measureText(text.substring(0, rightBound)).width) - 3, y);
}

function SetTextElement(name, text, xPos, yPos, fontVal, fontSize, fillVal, clearVal)
{
    return {
        elementName: name,
        currentValue: text,
        font: fontVal,
        fontSize: fontSize,
        fillStyle: fillVal,
        clearStyle: clearVal,
        textX: xPos,
        textY: yPos,
        textWidth: ctx.measureText(text).width,
        x: (xPos - (ctx.measureText(text).width / 2)) * 2,
        y: (yPos - (fontSize / 2)) * 2,
        width: ((xPos - (ctx.measureText(text).width / 2)) + ctx.measureText(text).width) * 2,
        height: ((yPos - (fontSize / 2)) + fontSize) * 2
    };
}

function GetMousePosition(e)
{
    var canvasBounds = canvas.getBoundingClientRect();
    return {
        x: e.clientX - canvasBounds.left,
        y: e.clientY - canvasBounds.top
    };
}

function ClearText(textElement) 
{
    ctx.font = textElement.font;
    ctx.fillStyle = textElement.clearStyle;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (var i = 0; i < 8; i++) {
        ctx.fillText(textElement.currentValue, textElement.textX, textElement.textY);
    }
}

function UpdateText(textElement)
{
    var currentText = document.getElementById("inputField").value;
    ctx.font = textElement.font;
    ctx.fillStyle = textElement.fillStyle;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(currentText, textElement.textX, textElement.textY);
    return SetTextElement(textElement.elementName, currentText, 
        textElement.textX, textElement.textY, textElement.fontVal, textElement.fontSize,
        textElement.fillStyle, textElement.clearStyle);
}

function CreateHighlightRect(textElement)
{
    ctx.strokeStyle = "red";
    ctx.strokeRect((textElement.x / 2) - 5, (textElement.y / 2) - 5, textElement.textWidth + 10, textElement.fontSize + 10);
}

function RemoveHighlightRect(textElement)
{
    ctx.strokeStyle = textElement.clearStyle;
    for (var i = 0; i < 8; i++) {
        ctx.strokeRect((textElement.x / 2) - 5, (textElement.y / 2) - 5, textElement.textWidth + 10, textElement.fontSize + 10);
    }
}

document.getElementById("inputButton").addEventListener("click", () => {
    if (selectedText != -1) {
        ClearText(textElementArr[selectedText]);
        RemoveHighlightRect(textElementArr[selectedText]);
        textElementArr[selectedText] = UpdateText(textElementArr[selectedText]);
    }
});

document.getElementById("canvas").addEventListener("click", e => {
    var pos = GetMousePosition(e);
    for (var i = 0; i < textElementArr.length; i++) {
        if ((pos.x > textElementArr[i].x && pos.x < textElementArr[i].width) && (pos.y > textElementArr[i].y && pos.y < textElementArr[i].height)) {
            if (selectedText != -1) RemoveHighlightRect(textElementArr[selectedText]);
            CreateHighlightRect(textElementArr[i]);
            document.getElementById("selectorDisplay").value = textElementArr[i].elementName;
            selectedText = i;
            return;
        }
    }
    RemoveHighlightRect(textElementArr[selectedText]);
    document.getElementById("selectorDisplay").value = "None";
    selectedText = -1;
});

// dimensions
var infogHeight = 480, infogWidth = 600;
var graphGroupX = (infogWidth / 2) - 40, graphGroupY = 150;
var footerX = 0, footerY = infogHeight - 50;

var textElementArr = new Array(4);
var selectedText = -1;

// other
var textColor = "navy", textFont = "'Oswald', sans-serif";

// setting up canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", infogWidth * 2);
canvas.setAttribute("height", infogHeight * 2);
ctx.scale(2,2);

/* ACTUAL INFOGRAPHIC CODE */
ctx.fillStyle = "#33cccc";
ctx.fillRect(0, 0, infogWidth, 50);

var currentTitle = "Rx DRUG MUSUSE has mixed results";
/*LeftBold(ctx, currentTitle, (infogWidth / 2) + 9.35, 25, textFont, 16, textColor, 14);
ctx.fillStyle = "lavender";
ctx.fillRect(0, 50, infogWidth, infogHeight);*/ 

ctx.font = "16px " + textFont;
ctx.fillStyle = textColor;
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.fillText(currentTitle, (infogWidth / 2), 25);

textElementArr[0] = SetTextElement("Title", currentTitle, (infogWidth / 2), 25, "16px " + textFont, 16, textColor, "#33cccc"); 

ctx.fillStyle = "lavender";
ctx.fillRect(0, 50, infogWidth, infogHeight);

ctx.fillStyle = "white";
ctx.fillRect(20, 50, infogWidth - 40, infogHeight);

ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "bold 13px " + textFont;
ctx.fillText("2018 Monitoring the Future College Students and Young Adults " +
    "Survey Results", (infogWidth / 2), 75);
textElementArr[1] = SetTextElement("Description", "2018 Monitoring the Future College Students and Young Adults " +
    "Survey Results", (infogWidth / 2), 75, "bold 13px " + textFont, 13, textColor, "white");


var text = "Rx OPIOID MUSUSE: SIGNIFICANT FIVE-YEAR DROP IN BOTH GROUPS*"
// LeftBold(ctx, text, (infogWidth / 2) + 12.75, 125, textFont, 16, textColor, 17)
ctx.font = "16px " + textFont;
ctx.fillText(text, (infogWidth / 2), 125);
textElementArr[2] = SetTextElement("Subtitle", text, (infogWidth / 2), 125, "16px " + textFont, 16, textColor, "white");

ctx.font = "100 16px " + textFont;
ctx.fillText("PAST YEAR MISUSE", graphGroupX + 120, graphGroupY + 20);
textElementArr[3] = SetTextElement("Graph Title", "PAST YEAR MISUSE", graphGroupX + 120, graphGroupY + 20, "100 16px " + textFont, 16, textColor, "white");

var bottleImg = new Image();
bottleImg.onload = function() {
    ctx.drawImage(bottleImg, graphGroupX - 225, graphGroupY + 80, 130, 130);
}
bottleImg.src = "src/bottle.png";

ctx.fillStyle = "navy";
ctx.fillRect(footerX, footerY, infogWidth, 50);

var logoImg = new Image();
logoImg.onload = function() {
    ctx.drawImage(logoImg, footerX + 10, footerY + 5, 180, 40);
}
logoImg.src = "src/nida-logo.svg";

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "16px " + textFont;
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
ctx.font = "700 12px " + textFont;
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
        console.log("d: " + d);
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
ctx.font = "700 12px " + textFont;
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