var x = 0;

var grid = [];
var numberOfColumns = 20;
var numberOfRows = 20;

var cellWidth;
var cellHeight;



function setup()
{
	var canvas = createCanvas(600, 600);
	canvas.parent('myContainer');
	// background(0);
	// line(15, 25, 70, 90);

	// drawingContext.shadowOffsetX = 5;
	// drawingContext.shadowOffsetY = -5;
	// drawingContext.shadowBlur = 10;
	// drawingContext.shadowColor = "black";
	// background(150);
	// ellipse(width/2, height/2, 50, 50);

	cellWidth = width / numberOfColumns;
	cellHeight = height / numberOfRows;

	for (var i = 0; i < numberOfColumns; i++) 
	{
		grid[i] = new Array(numberOfRows);

		for (var j = 0; j < grid[i].length; j++) 
		{
			grid[i][j] = new Cell(i, j);
		}
	}

	for (var i = 0; i < numberOfColumns; i++) 
	{
		for (var j = 0; j < numberOfRows; j++) 
		{
			grid[i][j].show(color(255, 0, 0, 50));
		}
	}

	console.log('###### LuckyDriver #######');
}

function draw()
{
	// ellipse(x, height/2, 20, 20);
	// x = x + 1;
}