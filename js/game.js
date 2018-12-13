//*******************
//****** Game *******
//*******************

var game = [null, null];

var popup;
var username2;
var firstGame = true;

function begin()
{
	loadPlayground(gameMode);
	if (gameMode == 0)
		game[0] = new Game(document.getElementById('playgroundWrapper'));
	else if (gameMode == 1 || gameMode == 2)
	{
		game[0] = new Game(document.getElementById('playgroundWrapper_1'));
		game[1] = new Game(document.getElementById('playgroundWrapper_2'));
	}
	else
		return;
}

function loadPlayground(gameMode)
{
    //Stabilisco il numero di giocatori in modo da caricare il numero corretto di campi da gioco
    var playersNumber;
    if (gameMode == 0)
    {
		playersNumber = 1;
    }
    else if (gameMode == 1 || gameMode == 2)
    {
        playersNumber = 2;
    }
    else
        return;
	for (var p = 1 ; p <= playersNumber; p++)
	{
		var wrapper = document.createElement('div');
		if (playersNumber == 1)
			wrapper.setAttribute('id', 'playgroundWrapper');
		else
			wrapper.setAttribute('id', 'playgroundWrapper_' + p.toString());
		wrapper.className = 'playgroundWrapper';

		//Creazione del campo da gioco
		var playgroundBackground = document.createElement('div');
		playgroundBackground.className = 'playgroundBackground';
		var playground = document.createElement('div');
		playground.className = 'playground';
		if (playersNumber == 1)
			playground.setAttribute('id', 'playground');
		else
			playground.setAttribute('id', 'playground_' + p.toString());
		for (var i = 0; i < PLAYGROUND_HEIGHT; i++)
		{
			var row = document.createElement('div');
			for (var j = 0; j < PLAYGROUND_WIDTH; j++)
			{
				var cell = document.createElement('div');
				if (playersNumber == 1)
					cell.setAttribute('id', '(' + 'playground' + ')' + 'row' + i + 'col' + j);
				else
					cell.setAttribute('id', '(' + 'playground_' + p.toString() + ')' + 'row' + i + 'col' + j);
				cell.className = 'empty cell';
				row.appendChild(cell);
			}
			playground.appendChild(row);
		}
		playgroundBackground.appendChild(playground);
		wrapper.appendChild(playgroundBackground);

		//Creazione della sideboard
		var sideBoard = document.createElement('div');
		sideBoard.className = 'sideBoard';
        if (playersNumber == 1)
            sideBoard.setAttribute('id', 'sideBoard');
        else
            sideBoard.setAttribute('id', 'sideBoard_' + p.toString());
		var paragraph, text_p;
		//Creazione del nextTetraminoBox
		var nextTetraminoBox = document.createElement('div');
		nextTetraminoBox.className = 'nextTetraminoBox';
        if (playersNumber == 1)
            nextTetraminoBox.setAttribute("id", "nextTetraminoBox");
        else
            nextTetraminoBox.setAttribute("id", "nextTetraminoBox_" + p.toString());
        paragraph = document.createElement('p');
        text_p = document.createTextNode('Next tetramino:');
        paragraph.appendChild(text_p);
        nextTetraminoBox.appendChild(paragraph);
        var deck = document.createElement('div');
        deck.className = 'deck';
        if (playersNumber == 1)
            deck.setAttribute("id", "deck");
        else
            deck.setAttribute("id", "deck_" + p.toString());
        for (var i = 0; i < DECK_HEIGHT; i++)
        {
            var row = document.createElement("div");
            for (var j = 0; j < DECK_WIDTH; j++)
            {
                var cell = document.createElement('div');
                if (playersNumber == 1)
                    cell.setAttribute('id', '(' + 'deck' + ')' + 'row' + i + 'col' + j);
                else
                    cell.setAttribute('id', '(' + 'deck_' + p.toString() + ')' + 'row' + i + 'col' + j);
                cell.className = 'empty cell';
                row.appendChild(cell);
            }
            deck.appendChild(row);
        }
        nextTetraminoBox.appendChild(deck);
        sideBoard.appendChild(nextTetraminoBox);
        //Creazione della scoreBoard
        var scoreBoard = document.createElement('div');
        scoreBoard.className = 'scoreBoard';
        if (playersNumber == 1)
            scoreBoard.setAttribute('id', 'scoreBoard');
        else
            scoreBoard.setAttribute('id', 'scoreBoard_' + p.toString());
        var table = document.createElement('table');
        var th_text = ['Punteggio:', 'Linee:', 'Tetris', 'Livello:'];
        var td_class = ['scoreBox', 'linesBox', 'tetrisBox', 'levelBox'];
        var text_td = '0';
        for (var i = 0; i < th_text.length; i++)
        {
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(th_text[i]));
            tr.appendChild(th);
            var td = document.createElement('td');
            td.className = td_class[i];
            td.innerHTML = text_td;
            tr.appendChild(td);
            table.appendChild(tr);
        }
        scoreBoard.appendChild(table);
        sideBoard.appendChild(scoreBoard);
        //Creazione della controlBoard
        var controlBoard = document.createElement('div');
        controlBoard.className = 'controlBoard';
        if (playersNumber == 1)
            controlBoard.setAttribute('id', 'controlBoard');
        else
            controlBoard.setAttribute('id', 'controlBoard_' + p.toString());
        var table = document.createElement('table');
        var th_text = ['Muovi a sinistra:', 'Muovi a destra:', 'Ruota a sinistra:', 'Ruota a destra:', 'Muovi in basso:', 'Pausa:'];
        var td_text = [['A', '\u2190'], ['D', '\u2192'], ['Q', '\u2191'], ['E', '\u2193'], ['S', 'SPACE'], ['P', 'P']];
        for (var i = 0; i < th_text.length; i++)
        {
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(th_text[i]));
            tr.appendChild(th);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(td_text[i][p-1]));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        controlBoard.appendChild(table);
        sideBoard.appendChild(controlBoard);

        wrapper.appendChild(sideBoard);

        var body = document.getElementsByTagName('body');
        body[0].appendChild(wrapper);
    }
}

function startSingleGame()
{
    popup.deletePopup();
    game[0].start();
}

function startDoubleGame()
{
    var input = document.getElementById('popupInput');
    username2 = input.value;
    popup.deletePopup();
    game[0].start();
    game[1].start();
}

function restartGame()
{
    firstGame = false;
    popup.deletePopup();
    if (gameMode === 0)
    {
        game[0].scoreStat.resetStat();
        game[0].sketcher.updateStat(game[0].scoreStat);
        game[0].playground.resetPlayground();
        game[0].sketcher.resetPlaygroundAndDeck();
        game[0].tetramino = game[0].createTetramino();
        game[0].nextTetramino = game[0].createTetramino();
        game[0].gameStateFlag.reset();

        game[0].sketcher.createStartPopup();
    }   
    else if (gameMode === 1 || gameMode === 2)
    {
        game[0].scoreStat.resetStat();
        game[0].sketcher.updateStat(game[0].scoreStat);
        game[0].playground.resetPlayground();
        game[0].sketcher.resetPlaygroundAndDeck();
        game[0].tetramino = game[0].createTetramino();
        game[0].nextTetramino = game[0].createTetramino();
        game[0].gameStateFlag.reset();

        game[1].scoreStat.resetStat();
        game[1].sketcher.updateStat(game[1].scoreStat);
        game[1].playground.resetPlayground();
        game[1].sketcher.resetPlaygroundAndDeck();
        game[1].tetramino = game[0].createTetramino();
        game[1].nextTetramino = game[0].createTetramino();
        game[1].gameStateFlag.reset();
        
        game[0].sketcher.createPlayerUsernamePopup();
    }
}

function Game (playgroundWrapper)
{
    this.playground = new Playground(playgroundWrapper);
	this.tetramino = this.createTetramino();
	this.nextTetramino = this.createTetramino();
	
	this.gameStateFlag = new GameStateFlag();
	this.scoreStat = new ScoreStat();
	this.sketcher = new Sketcher(playgroundWrapper);
    this.scoreStat.resetStat();
    this.sketcher.updateStat(this.scoreStat);
    
    if (gameMode === 0)
        this.sketcher.createStartPopup();
    else if (gameMode === 1 || gameMode === 2)
        this.sketcher.createPlayerUsernamePopup();
}

Game.prototype.start =
	function ()
	{
        if (firstGame)
            window.addEventListener('keydown', this.playerInputHandler.bind(this), false);
		this.sketcher.showTetramino(this.tetramino);
		this.sketcher.tetraminoOnDeck(this.nextTetramino);
		if (this.gameStateFlag.isPause())
			this.gameStateFlag.start(this.clock.bind(this));    
	}

Game.prototype.clock =
	function ()
	{
		if (this.checkCollision(this.tetramino.dropped()))
    	{
            this.playground.freezeCells(this.tetramino.configuration(this.tetramino.row, this.tetramino.col, this.tetramino.orientation));
        	this.sketcher.freezeTetramino(this.tetramino);
            var linesArray = this.playground.checkLines();
            if (linesArray.length > 0)
            {
                this.playground.removeLines(linesArray);
                this.sketcher.removeLines(linesArray);
            }
        	if (this.scoreStat.updateStat(linesArray.length))  
                this.gameStateFlag.increaseLevel(this.clock.bind(this), this.scoreStat.level);
                
			this.sketcher.updateStat(this.scoreStat);

        	this.tetramino = this.nextTetramino;
        	this.nextTetramino = this.createTetramino();

        	if (this.checkCollision(this.tetramino.rested()))
        	{
            	this.gameOver();
        	}
        	else
        	{
            	this.sketcher.tetraminoOnDeck(this.nextTetramino);
            	this.sketcher.showTetramino(this.tetramino);
        	}
    	}
    	else
    	{
        	this.sketcher.hideTetramino(this.tetramino);
        	this.tetramino.drop();
        	this.sketcher.showTetramino(this.tetramino);
    	}
	}

Game.prototype.gameOver =
    function ()
    {   
        if (gameMode == 0)
        {
            this.gameStateFlag.gameIsOver();
            ajax = new Ajax();
            ajax.updateData("GET","../php/updateDatabase.php", true, ["gameMode", "score", "linesCleared", "tetris", "level"], [gameMode, game[0].scoreStat.score, game[0].scoreStat.linesCleared, game[0].scoreStat.tetris, game[0].scoreStat.level]);
            this.sketcher.gameOverPlaygroundAndDeck();
            this.sketcher.createGameOverPopup();
        }
        else if (gameMode == 1 || gameMode == 2) 
        {
            this.gameStateFlag.gameIsOver();
            this.sketcher.gameOverPlaygroundAndDeck();
            if (game[0].gameStateFlag.isGameOver() && game[1].gameStateFlag.isGameOver())
            {
                if (gameMode == 1)
                {
                    var totalScore = game[0].scoreStat.score + game[1].scoreStat.score;
                    ajax = new Ajax();
                    ajax.updateData("GET","../php/updateDatabase.php", true, ["gameMode", "username2", "score"], [gameMode, username2, totalScore]);
                }
                this.sketcher.createGameOverPopup();
            }
        }
    }

Game.prototype.playerInputHandler =
	function (evt)
    {
        var keycode = evt.keyCode || evt.which;
        if (this.gameStateFlag.isGameOver())
            return;
        else if (this.gameStateFlag.isPause() && keycode == P_KEY)
        {
            this.sketcher.removePausePopup();
            this.gameStateFlag.resume(this.clock.bind(this));
            return;
        }
        else if (keycode == P_KEY)
        {
            this.pause()
        }
        else if (this.gameStateFlag.isPause())
        {
            return;
        }

        if (this === game[0])
        {
            if (keycode == S_KEY)
            {
                this.clock();
            }
            else if (keycode == Q_KEY)
            {
                this.rotateTetramino(LEFT);
            }
            else if (keycode == E_KEY)
            {
                this.rotateTetramino(RIGHT);
            }
            else if (keycode == A_KEY)
            {
                this.translateTetramino(LEFT);
            }
            else if (keycode == D_KEY)
            {
                this.translateTetramino(RIGHT);
            }
        }
        else if ((gameMode === 1 || gameMode === 2) && this === game[1])
        {
            if (keycode == SPACEBAR)
            {
                this.clock();
            }
            else if (keycode == UP_ARROW)
            {
                this.rotateTetramino(LEFT);
            }
            else if (keycode == DOWN_ARROW)
            {
                this.rotateTetramino(RIGHT);
            }
            else if (keycode == LEFT_ARROW)
            {
                this.translateTetramino(LEFT);
            }
            else if (keycode == RIGHT_ARROW)
            {
                this.translateTetramino(RIGHT);
            }
        }
    }

Game.prototype.createTetramino =
	function ()
	{
    	var index = Math.floor(Math.random() * 7);
    	switch(index)
    	{
    		case 0:
        		return new Tetramino_O();
    		case 1:
        		return new Tetramino_I();
    		case 2:
        		return new Tetramino_J();
		    case 3:
		    	return new Tetramino_L();
    		case 4:
        		return new Tetramino_T();
    		case 5:
    			return new Tetramino_S();
    		case 6:
        		return new Tetramino_Z();
   		}
	}

Game.prototype.checkCollision =
    function (cells)
    {
        for (var i = 0; i < cells.length; i++)
        {
            var row = cells[i][0];
            var col = cells[i][1];
            if ((row >= PLAYGROUND_HEIGHT) || (col < 0) || (col >= PLAYGROUND_WIDTH))
            {
                return true;
            }
            if (this.playground.playgroundMatrix[row][col] == 1)
            {
                return true
            }
        }
        return false;
    }

Game.prototype.rotateTetramino =
    function (delta)
    {
        if (!this.checkCollision(this.tetramino.rotated(delta)))
        {
            this.sketcher.hideTetramino(this.tetramino);
            this.tetramino.rotate(delta);
            this.sketcher.showTetramino(this.tetramino);
        }
    }

Game.prototype.translateTetramino =
    function (delta)
    {
        if (!this.checkCollision(this.tetramino.translated(delta)))
        {
            this.sketcher.hideTetramino(this.tetramino);
            this.tetramino.translate(delta);
            this.sketcher.showTetramino(this.tetramino);
        }
    }

Game.prototype.pause = 
    function (evt)
    {
        this.gameStateFlag.pause();
        this.sketcher.createPausePopup();
    }