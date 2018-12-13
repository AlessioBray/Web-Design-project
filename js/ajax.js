var ajax;
var xmlHttp;

function Ajax() {}

Ajax.prototype.createObjectXMLHttpRequest = 
	function ()
	{
		xmlHttp = null;
		try 
		{ 
			xmlHttp = new XMLHttpRequest(); 
		} 
		catch (evt)
		{
			try
			{ 
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE (recent versions)
			} 
			catch (evt)
			{
				try
				{ 
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE (older versions)
				}
				catch (evt)
				{
					xmlHttp = null; 
				}
			}
		}
		return xmlHttp;
	}
	
Ajax.prototype.verifyField = 
	function (method, url, isAsync, string, callbackFunction, input)
	{
		xmlHttp = this.createObjectXMLHttpRequest();
		if (input.checkValidity())
		{
			xmlHttp.open(method, url + string, isAsync);
			xmlHttp.onreadystatechange = callbackFunction;
			xmlHttp.send(null);
			return true;
		}
		return false;	
	}

Ajax.prototype.updateData = 
	function (method, url, isAsync, variableArray, valueArray)
	{
		xmlHttp = this.createObjectXMLHttpRequest();
		var urlData = url;
		if (variableArray != null && valueArray != null && variableArray.length == valueArray.length)
		{
			urlData = urlData + "?" + variableArray[0] + "=" + valueArray[0];
			for (var i =  1 ; i < variableArray.length ; i++)
				urlData = urlData + "&" + variableArray[i] + "=" + valueArray[i];
		}
		xmlHttp.open(method, urlData, isAsync);
		xmlHttp.send(null);
	}