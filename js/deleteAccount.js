var popup;

function createDeleteAccountPopup()
{
	popup = new Popup('deleteAccountPopup');
	popup.deleteAccountPopup();
}	
		
function deleteAccount()
{
	window.location.href = "../php/deleteAccount.php";
}