function checkPlayerUsername (string)
{
	var input = document.getElementById('popupInput');
	var url = "../php/checkPlayerUsername.php?";
	var data = string + "=" + input.value;
	ajax = new Ajax();
	if (!ajax.verifyField("GET", url, true, data, createWarning, input))
	{
		var p = document.getElementById('usernameWarning');
		if (p.lastChild != null)
			p.removeChild(p.lastChild);
		var text_p = document.createTextNode('INSERISCI UNO USERNAME ESISTENTE e diverso da quello del profilo con cui si è connessi');
		p.appendChild(text_p);
		var button = document.getElementById('popupButton');
		if (button != null)
		{
			var div = document.getElementById('playerUsernamePopup');
			div.removeChild(button);
		}
	}
}
		
function createWarning()
{
	if(xmlHttp.readyState == 4)
	{	
		var warning = document.getElementById('usernameWarning');
		if (warning.lastChild != null) 
			warning.removeChild(warning.lastChild);
		if (xmlHttp.responseText != "OK")
		{
			var text = document.createTextNode(xmlHttp.responseText);
			warning.appendChild(text);
			var button = document.getElementById('popupButton');
			if (button != null)
			{
				var div = document.getElementById('playerUsernamePopup');
				div.removeChild(button);
			}
		}
	}
	var input = document.getElementById('popupInput');
	if (input.checkValidity() && xmlHttp.responseText == "OK")
	{
		var button = document.getElementById('popupButton');
		if (button == null)
		{
			var div = document.getElementById('playerUsernamePopup');
			button = document.createElement("button");
			var button_text = document.createTextNode('GIOCA');
			button.setAttribute('id','popupButton');
			button.setAttribute("onclick", "startDoubleGame()");
			button.appendChild(button_text);
			div.appendChild(button);
		}
	}
}