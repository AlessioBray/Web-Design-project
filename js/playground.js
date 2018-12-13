//*************************
//****** Playground *******
//*************************

function Playground(playgroundWrapper)
{
	var playgroundBackground = playgroundWrapper.childNodes[0];
	this.playgroundId =  playgroundBackground.childNodes[0].id;
    this.playgroundMatrix = [];
    for (var i = 0; i < PLAYGROUND_HEIGHT; i++)
        this.playgroundMatrix.push([]);
    for (var r = 0; r < PLAYGROUND_HEIGHT; r++)
        for (var c = 0; c < PLAYGROUND_WIDTH; c++)
            this.playgroundMatrix[r].push(0);
}

Playground.prototype.freezeCells =
    function (cells)
    {
        for (var i = 0; i < cells.length; i++)
        {
            var row = cells[i][0];
            var col = cells[i][1];
            this.playgroundMatrix[row][col] = 1;
        }
    }

//Verifica la presenza di linee complete e restituisce un array contenente gli indici di queste.
Playground.prototype.checkLines =
    function ()
    {
        var lines = [];
    	for (var row = PLAYGROUND_HEIGHT-1; row >= 0; row--)
    	{
        	var blocks = 0;
        	for (var col = 0; col < PLAYGROUND_WIDTH; col++)
        	{
            	if (this.playgroundMatrix[row][col] == 1)
            	{
                	blocks++;
            	}
            	else
            	{
            	    break;
            	}
        	}
        	if (blocks == PLAYGROUND_WIDTH)
        	{
            	lines.push(row);
        	}
    	}
    	return lines;
    }

Playground.prototype.removeLines =
    function (linesArray)
    {
    	for (var i = 0; i < linesArray.length; i++)
        {
            for (var col = 0; col < PLAYGROUND_WIDTH; col++)
            {
                this.playgroundMatrix[linesArray[i]][col] = 0;
            }
        }
        for (var row = linesArray[0]; row >= 0; row--)
        {
            for (var col = 0; col < PLAYGROUND_WIDTH; col++)
            {
                if (this.playgroundMatrix[row][col] == 1)
                {
                    this.playgroundMatrix[row][col] = 0;
                    this.playgroundMatrix[row + linesArray.length][col] = 1;
                }
            }
        }
    }

Playground.prototype.resetPlayground =
    function () 
    {
        for (var r = 0; r < PLAYGROUND_HEIGHT; r++)
            for (var c = 0; c < PLAYGROUND_WIDTH; c++)
                this.playgroundMatrix[r][c] = 0;
    }