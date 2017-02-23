var x = 0;

var grid = [];
var numberOfColumns = 50;
var numberOfRows = 50;

var cellWidth;
var cellHeight;

var start;
var end;

var openSet = [];
var closeSet = [];

var path = [];

var noSolution = false;


function removeFromArray(array, target)
{
	for (var i = array.length - 1; i >= 0; i--) 
	{
		if (array[i] == target)
		{
			array.splice(i, 1);
		}
	}
}

function heuristic(pointA, pointB) 
{
	return euclideanDistance(pointA, pointB);
	// return dist(pointA.i, pointA.j, pointB.i, pointB.j);;
}

// An implementation of the Euclidean distance between two points.
function euclideanDistance(pointA, pointB)
{
	return dist(pointA.i, pointA.j, pointB.i, pointB.j);
}


function taxiCabDistance(pointA, pointB)
{
	return abs(pointA.i - pointB.i) + abs(pointA.j - pointB.j);
}

// Initialiser
function setup()
{
	var canvas = createCanvas(600, 600);
	canvas.parent('myContainer');	
	console.log('###### LuckyDriver #######');
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


	// populate the grid.
	for (var i = 0; i < numberOfColumns; i++) 
	{
		grid[i] = new Array(numberOfRows);

		for (var j = 0; j < numberOfRows; j++) 
		{
			grid[i][j] = new Cell(i, j);
		}
	}

	// add cells neighbours.
	for (var i = 0; i < numberOfColumns; i++) 
	{
		for (var j = 0; j < numberOfRows; j++) 
		{
			grid[i][j].addNeighbours(grid);
		}
	}

	start = grid[0][0];
	start.g = 0;
	start.obstacle = false;
	end = grid[numberOfColumns-1][numberOfRows-1];
	// end = grid[6][8];
	end.obstacle = false;

	openSet.push(start);
	// console.log(grid);
}

function draw()
{
	if (openSet.length > 0) 
	{
		// do work.
		var winner = 0;

		for (var i = 0; i < openSet.length; i++) 
		{
			if (openSet[i].f < openSet[winner].f)
			{
				winner = i;
			}
		}

		var current = openSet[winner];

		if (current === end)
		{
			noLoop();
			console.log('DONE');
		}


		// remove current from openSet;
		removeFromArray(openSet, current);
		closeSet.push(current);

		var neighbours = current.neighbours;

		for (var i = 0; i < neighbours.length; i++) 
		{
			var neighbour = neighbours[i];

			if (!closeSet.includes(neighbour) && !neighbour.obstacle)
			// if (!closeSet.includes(neighbour))
			{
				var tentativeG = current.g + heuristic(neighbour, current);
				var newPath = false;

				if (openSet.includes(neighbour))
				{
					if (tentativeG < neighbour.g)
					{
						neighbour.g = tentativeG;
						newPath = true;
						// neighbour.h = heuristic(neighbour, end);
						// neighbour.f = neighbour.g + neighbour.h;
						// neighbour.previous = current;
					}
				}
				else
				{
					neighbour.g = tentativeG;
					newPath = true;
					openSet.push(neighbour);
				}

				if (newPath)
				{
					// Is this the correct position for this update?
					// An educated guess of how long it would take to get us to the end.
					neighbour.h = heuristic(neighbour, end);
					neighbour.f = neighbour.g + neighbour.h;
					neighbour.previous = current;
				}
			}
		}
	}
	else
	{
		console.log('No Solution');
		// noSolution = true;
		noLoop();
		return;
		// we are here.
	}


	background(255);

	// debugging purpose.
	for (var i = 0; i < numberOfColumns; i++) 
	{
		for (var j = 0; j < numberOfRows; j++) 
		{
			grid[i][j].show(color(255));
		}
	}

	// The Close Set is shown in RED.
	for (var i = 0; i < closeSet.length; i++) 
	{
		closeSet[i].show(color(255, 0, 0));
	}

	// The Open Set is shown in GREEN.
	for (var i = 0; i < openSet.length; i++) 
	{
		openSet[i].show(color(0, 255, 0));
	}

	// Find the path.
	path = [];
	var temp = current;
	path.push(temp);

	while(temp.previous)
	{
		path.push(temp.previous);
		temp = temp.previous;
	}

	// The path is shown in BLUE.
	noFill();
	stroke(255, 0, 200);
	strokeWeight(cellWidth / 2);
	beginShape();
	for (var i = 0; i < path.length; i++) 
	{
		// path[i].show(color(0, 0, 255));
		vertex(path[i].i * cellWidth + cellWidth / 2, path[i].j * cellHeight + cellHeight / 2);
	}
	endShape();
}