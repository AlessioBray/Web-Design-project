//****************************
//****** GameStateFlag *******
//****************************

function GameStateFlag() 
{
	this.gameTimer;
	this.gameOver;
	this.reset();
}

GameStateFlag.prototype.start = 
	function (clockFuction)
	{
		if (this.gameTimer === null)
			this.gameTimer = setInterval(clockFuction, CLOCK_INTERVAL);
	}

GameStateFlag.prototype.increaseLevel = 
	function (clockFuction, level)
	{
		if (this.gameTimer == null)
			return;
		var NEW_CLOCK_INTERVAL = CLOCK_INTERVAL - 75*level;
		clearInterval(this.gameTimer); 
		this.gameTimer = setInterval(clockFuction, NEW_CLOCK_INTERVAL);
	}

GameStateFlag.prototype.pause = 
	function ()
	{
		clearInterval(this.gameTimer); 
		this.gameTimer = null;
	}

GameStateFlag.prototype.isPause =
	function ()
	{
		return this.gameTimer === null && this.gameOver === false;
	}

GameStateFlag.prototype.resume =
	function (clockFuction)
	{
		if (this.isPause())
		{
			this.start(clockFuction);
		}
	}

GameStateFlag.prototype.gameIsOver =
	function ()
	{
		this.gameOver = true;
		this.pause();
	}

GameStateFlag.prototype.isGameOver =
	function ()
	{
		return this.gameTimer === null && this.gameOver === true;
	}

GameStateFlag.prototype.reset =
	function ()
	{
		this.gameTimer = null;
		this.gameOver = false;
	}