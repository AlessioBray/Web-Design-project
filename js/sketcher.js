//***********************
//****** Sketcher *******
//***********************

function Sketcher(playgroundWrapper){
    var playgroundBackground = playgroundWrapper.childNodes[0];
	this.playgroundId =  playgroundBackground.childNodes[0].id;
    var sideBoard = playgroundWrapper.childNodes[1];
    var nextTetraminoBox = sideBoard.childNodes[0];
    this.deckId = nextTetraminoBox.childNodes[1].id;
    this.scoreBoard = sideBoard.childNodes[1];
}

Sketcher.prototype.classifyTetramino =
	function (tetramino, className, containerId)
	{
        if (containerId == this.deckId)
            var cells = tetramino.configuration(tetramino.row, tetramino.col-3, tetramino.orientation);
        else
            var cells = tetramino.configuration(tetramino.row, tetramino.col, tetramino.orientation);
    	for (var i = 0; i < cells.length; i++)
    	{
            var coordinate = cells[i];
        	this.classifyCell(coordinate[0], coordinate[1], className, containerId);
    	}
	}

//Funzione che modifica la classe di una cella cambiandone cosi lo stato
Sketcher.prototype.classifyCell =
    function (row, col, className, containerId)
    {
        var cell = getCell(row, col, containerId);
        cell.className = className;
    }

Sketcher.prototype.showTetramino =
	function (tetramino)
	{
        this.classifyTetramino(tetramino, tetramino.character + ' cell', this.playgroundId);
	}

Sketcher.prototype.hideTetramino =
	function (tetramino)
	{
    	this.classifyTetramino(tetramino, 'empty cell', this.playgroundId);
	}

Sketcher.prototype.freezeTetramino =
	function (tetramino)
	{
    	this.classifyTetramino(tetramino, 'frozen cell', this.playgroundId);
	}

Sketcher.prototype.tetraminoOnDeck =
	function (tetramino)
	{
        this.classifyDeck('empty cell');
        this.classifyTetramino(tetramino, tetramino.character + ' cell', this.deckId);
	}

Sketcher.prototype.classifyDeck =
    function (className)
    {
        for (var row = 0; row < DECK_HEIGHT; row++)
        {
            for (var col = 0; col < DECK_WIDTH; col++)
            {
                var cell = getCell(row, col, this.deckId);
                cell.className = className;
            }
        }
    }

//Funzione che rimuove dal campo da gioco eventuali linee completate.
Sketcher.prototype.removeLines =
	function (linesArray)
	{
        for (var i = 0; i < linesArray.length; i++)
        {
            for (var col = 0; col < PLAYGROUND_WIDTH; col++)
            {
                var cell = getCell(linesArray[i], col, this.playgroundId);
                cell.className = 'empty cell';
            }
        }
        for (var row = linesArray[0]; row >= 0; row--)
        {
            for (var col = 0; col < PLAYGROUND_WIDTH; col++)
            {
                var cell = getCell(row, col, this.playgroundId);
                if (cell.className == 'frozen cell')
                {
                    cell.className = 'empty cell';
                    getCell(row + linesArray.length, col, this.playgroundId).className = 'frozen cell';
                }
            }
        }
    }

Sketcher.prototype.classifyPlayground =
    function (className)
    {
        for (var row = 0; row < PLAYGROUND_HEIGHT; row++)
        {
            for (var col = 0; col < PLAYGROUND_WIDTH; col++)
            {
                var cell = getCell(row, col, this.playgroundId);
                cell.className = className;
            }
        }
    }

Sketcher.prototype.updateStat =
    function (scoreStat)
    {
        var scoreBoard_td = this.scoreBoard.getElementsByTagName('td');
        scoreBoard_td[0].innerHTML = scoreStat.score;
        scoreBoard_td[1].innerHTML = scoreStat.linesCleared;
        scoreBoard_td[2].innerHTML = scoreStat.tetris;
        scoreBoard_td[3].innerHTML = scoreStat.level;
    }

Sketcher.prototype.gameOverPlaygroundAndDeck =
    function ()
    {
        this.classifyPlayground('frozen cell');
        this.classifyDeck('frozen cell');
    }

Sketcher.prototype.resetPlaygroundAndDeck =
    function ()
    {
        this.classifyPlayground('empty cell');
        this.classifyDeck('empty cell');
    }

Sketcher.prototype.createGameOverPopup =
    function ()
    {
        popup = new Popup('gameOverPopup');
        popup.gameOverPopup();
    }

Sketcher.prototype.createPlayerUsernamePopup =
    function ()
    {
        popup = new Popup('playerUsernamePopup');
        popup.playerUsernamePopup();
    }

Sketcher.prototype.createStartPopup =
    function ()
    {
        popup = new Popup('startPopup');
        popup.startPopup();
    }

Sketcher.prototype.createPausePopup =
    function ()
    {
        popup = new Popup('pausePopup');
        popup.pausePopup();
    }

Sketcher.prototype.removePausePopup =
    function ()
    {
        popup.deletePopup();
    }