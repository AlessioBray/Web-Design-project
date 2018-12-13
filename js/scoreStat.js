//************************
//****** ScoreStat *******
//************************

function ScoreStat()
{
	this.score;
	this.linesCleared;
	this.tetris;
	this.level;
}

ScoreStat.prototype.resetStat =
	function ()
	{
		this.score = 0;
		this.linesCleared = 0;
		this.tetris = 0;
		this.level = 0;
		
	}
ScoreStat.prototype.updateStat = 
	function (linesCleared)
	{
		var clearedLinesScores = [0, 100, 300, 500, 800];
        this.score += 10 + clearedLinesScores[linesCleared];
        this.linesCleared += linesCleared;
        if (linesCleared == 4)
        	this.tetris++;
        var previusLevel = this.level;
        this.level = Math.min(Math.floor(this.linesCleared/5), 10);
        return this.level != previusLevel;
	}