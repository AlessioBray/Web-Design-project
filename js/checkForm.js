var warning;
var elementName;

var emailValidity = false;
var usernameValidity = false;
var passwordValidity = false;


function check()
{
	if (emailValidity == false || usernameValidity == false || passwordValidity == false)
			return false;
	else 
			return true;
}

function checkField(fieldName)
{
	var input = document.forms[0][fieldName];
	var url = "../php/verifyField.php?";
	var data = fieldName + "=" + input.value;
	elementName = fieldName;
	warning = document.getElementById(fieldName + "Warning");
	ajax = new Ajax();
	if (!ajax.verifyField("GET", url, true, data, registrationWarning, input))
	{
		if (warning.lastChild != null) 
			warning.removeChild(warning.lastChild);
		var element = document.forms[0][fieldName];
		element.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
		if (elementName == "email")
			emailValidity = false;
		else
			usernameValidity = false;
	}
}

function checkPassword(repassword)
{
	var password = document.forms["register"]["password"];
	if (repassword.value == password.value)
	{
		passwordValidity = true;
		password.style.backgroundColor = "rgba(0, 193, 0, 0.6)";
		repassword.style.backgroundColor = "rgba(0, 193, 0, 0.6)";
	}
	else
	{
		passwordValidity = false;
		password.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
		repassword.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
	}
}

function registrationWarning()
{
	if (xmlHttp.readyState === 4) //L'operazione è stata portata a termine
	{	
		var element = document.forms["register"][elementName];
		if (warning.lastChild != null) 
				warning.removeChild(warning.lastChild);

		if (xmlHttp.responseText === "OK")
		{
			element.style.backgroundColor = "rgba(0, 193, 0, 0.6)";
			if (elementName == "email")
				emailValidity = true;
			else
				usernameValidity = true;
		}
		else
		{
			element.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
			var text = document.createTextNode(xmlHttp.responseText);
			warning.appendChild(text);
			if (elementName == "email")
				emailValidity = false;
			else
				usernameValidity = false;
		}
	}
}