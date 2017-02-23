function Cell(i, j)
{
	this.i = i;
	this.j = j;

	this.f = 0;
	this.g = 0;
	this.h = 0;

	this.neighbours = [];
	this.prevous = undefined;

	this.obstacle = false;

	if (random(1) < 0.2)
	{
		this.obstacle = true;
	}

	this.addNeighbours = function(grid)
	{
		var i = this.i;
		var j = this.j;

		if (i > 0)
		{
			this.neighbours.push(grid[i - 1][j]);
		}
		if (i < numberOfColumns - 1)
		{
			this.neighbours.push(grid[i + 1][j]);
		}
		if (j > 0)
		{
			this.neighbours.push(grid[i][j - 1]);
		}
		if (j < numberOfRows - 1)
		{
			this.neighbours.push(grid[i][j + 1]);
		}
		if (i > 0 && j > 0) 
		{
			this.neighbours.push(grid[i - 1][j - 1]);
		}
		if (i < numberOfColumns - 1 && j > 0) 
		{
			this.neighbours.push(grid[i + 1][j - 1]);
		}
		if (i > 0 && j < numberOfRows - 1) 
		{
			this.neighbours.push(grid[i - 1][j + 1]);
		}
		if (i < numberOfColumns - 1 && j < numberOfRows - 1) 
		{
			this.neighbours.push(grid[i + 1][j + 1]);
		}
	}

	this.show = function(color)
	{
		// if (this.obstacle) 
		// {
		// 	fill(255);
		// 	noStroke();
		// 	// stroke(0);
		// 	rect(this.i * cellWidth, this.j * cellHeight, cellWidth - 1, cellHeight - 1);
		// }
		// else
		// {
		// 	fill(color);
		// 	rect(this.i * cellWidth, this.j * cellHeight, cellWidth - 1, cellHeight - 1);
		// }

		fill(color);

		if (this.obstacle)
		{
			fill(0);
		}

		noStroke();
		rect(this.i * cellWidth, this.j * cellHeight, cellWidth - 1, cellHeight - 1);
	}
}