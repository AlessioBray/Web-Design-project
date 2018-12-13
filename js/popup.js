//********************
//****** Popup *******
//********************

function Popup(popupBodyId)
{
	this.overlay = document.getElementById('overlay');
	this.popupBody = document.getElementById(popupBodyId);
	var body = document.getElementsByTagName("body");
	this.container = body[0];
}

Popup.prototype.preparation = 
	function (popupBodyId)
	{
		if (this.overlay != null)
			return false;
		this.overlay = document.createElement('div');
		this.overlay.setAttribute('id', 'overlay');
		this.popupBody = document.createElement('div');
		this.popupBody.setAttribute('id', popupBodyId);
		this.popupBody.className = 'popup';
		this.overlay.appendChild(this.popupBody);
		this.container.appendChild(this.overlay);
		return true;
	}

Popup.prototype.deleteAccountPopup = 
	function ()
	{
		if (!this.preparation('deleteAccountPopup'))
			return;
		var h3 = document.createElement('h3');
		var text_h3 = document.createTextNode('Vuoi veramente eliminare il tuo account?');
		h3.appendChild(text_h3);
		this.popupBody.appendChild(h3);
		var p = document.createElement('p');
		var text_p = document.createTextNode('I dati salvati andranno persi');
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var button = document.createElement("button");
		button.setAttribute("onclick", "popup.deletePopup()");
		var text_button = document.createTextNode('NO');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
		button = document.createElement("button");
		button.setAttribute("onclick", "deleteAccount()");
		text_button = document.createTextNode('SI');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
	}

Popup.prototype.startPopup = 
	function ()
	{
		if (!this.preparation('startPopup'))
			return;
		var h2 = document.createElement('h2');
		var text_h2 = document.createTextNode('TETRIS');
		h2.appendChild(text_h2);
		this.popupBody.appendChild(h2);
		var p = document.createElement('p');
		var text_p = document.createTextNode('Fai click sulla sul bottone GIOCA per iniziare');
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var button = document.createElement('button');
		button.setAttribute('onclick', 'popup.returnToProfile()');
		var text_button = document.createTextNode('TORNA AL PROFILO');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
		button = document.createElement('button');
		button.setAttribute('onclick', 'startSingleGame()');
		text_button = document.createTextNode('GIOCA');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);

	}

Popup.prototype.playerUsernamePopup = 
	function ()
	{
		if (!this.preparation('playerUsernamePopup'))
			return;
		var h3 = document.createElement('h3');
		var text_h3 = document.createTextNode('Inserisci lo username del secondo giocatore');
		h3.appendChild(text_h3);
		this.popupBody.appendChild(h3);
		var p = document.createElement('p');
		var text_p = document.createTextNode('Il giocatore ospite giocherà sulla destra');
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var input = document.createElement('input');
		input.setAttribute('id','popupInput');
		input.setAttribute('type','text');
		input.setAttribute('pattern', '^[a-zA-Z0-9]{3,}$');
		input.setAttribute('name', 'username');
		input.setAttribute('onkeyup', "checkPlayerUsername('username')");
		input.setAttribute('required', 'required');
		input.setAttribute('maxlength', '12');
		this.popupBody.appendChild(input);
		p = document.createElement('p');
		p.setAttribute('id','usernameWarning');
		text_p = document.createTextNode('INSERISCI UNO USERNAME ESISTENTE e diverso da quello del profilo con cui si è connessi');
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var button = document.createElement('button');
		button.setAttribute('onclick', 'popup.returnToProfile()');
		var text_button = document.createTextNode('TORNA AL PROFILO');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
	}

Popup.prototype.pausePopup = 
	function ()
	{
		if (!this.preparation('pausePopup'))
			return;
		var h2 = document.createElement('h2');
		var text_h2 = document.createTextNode('GIOCO IN PAUSA');
		h2.appendChild(text_h2);
		this.popupBody.appendChild(h2);
		var p = document.createElement('p');
		var text_p = document.createTextNode('Premi nuovamente "P" per riprendere il gioco, oppure:');
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var button = document.createElement('button');
		button.setAttribute('onclick', 'popup.returnToProfile()');
		var text_button = document.createTextNode('TORNA AL PROFILO');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
	}

Popup.prototype.gameOverPopup = 
	function ()
	{
		if (!this.preparation('gameOverPopup'))
			return;
		var h2 = document.createElement('h2');
		var text_h2 = document.createTextNode('GAME OVER');
		h2.appendChild(text_h2);
		this.popupBody.appendChild(h2);
		var p = document.createElement('p');
		var score;
		var text_p;
		if (gameMode == 0)
		{
			score = game[0].scoreStat.score;
			text_p = document.createTextNode('Il punteggio totalizzato è: ' + score);
		}
		else if (gameMode == 1)
		{
			score = game[0].scoreStat.score + game[1].scoreStat.score;
			text_p = document.createTextNode('Il punteggio totalizzato è: ' + score);
		}
		else if (gameMode == 2)
		{
			var score1 = game[0].scoreStat.score;
			var score2 = game[1].scoreStat.score;
			var h3 = document.createElement('h3');
			var text_h3;
			if (score1 > score2)
				text_h3 = document.createTextNode('Ha vinto: ' + username1);
			else if (score1 < score2)
				text_h3 = document.createTextNode('Ha vinto: ' + username2);
			else
				text_h3 = document.createTextNode('Pareggio');
			h3.appendChild(text_h3);
			this.popupBody.appendChild(h3);
			
			text_p = document.createTextNode('Il punteggio totalizzato da ' + username1 + ' è: ' + score1);
			p.appendChild(text_p);
			this.popupBody.appendChild(p);
			p = document.createElement('p');
			text_p = document.createTextNode('Il punteggio totalizzato da ' + username2 + ' è: ' + score2);
		}
		p.appendChild(text_p);
		this.popupBody.appendChild(p);
		var button = document.createElement('button');
		var text_button = document.createTextNode('TORNA AL PROFILO');
		button.appendChild(text_button);
		button.setAttribute('onclick', 'popup.returnToProfile()');

		this.popupBody.appendChild(button);
		button = document.createElement('button');
		button.setAttribute('onclick', 'restartGame()');
		text_button = document.createTextNode('RIGIOCA');
		button.appendChild(text_button);
		this.popupBody.appendChild(button);
	}

Popup.prototype.deletePopup =
	function ()
	{
		if (this.overlay != null)
		{
			this.container.removeChild(this.overlay);
			this.overlay = null;
		}
	}

Popup.prototype.returnToProfile =
	function ()
	{
		if (gameMode == 1)
			window.location.href = "../php/profile.php?ranking=2";
		else
			window.location.href = "../php/profile.php?ranking=1";
	}