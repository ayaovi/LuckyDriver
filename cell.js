function Cell(i, j)
{
	this.i = i;
	this.j = j;

	this.obstacle = false;

	if (random(0) < 0.2)
	{
		this.obstacle = true;
	}

	this.show = function(color)
	{
		if (this.obstacle) 
		{
			fill(0);
			noStroke();
			rect(this.i * cellWidth, this.j * cellHeight, cellWidth - 1, cellHeight - 1);
		}
	}
}