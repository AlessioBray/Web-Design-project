<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name="author" content="Alessio Bray">
		<link rel="shortcut icon" type="image/x-icon" href="../img/tetris_logo.png"/>
		<link rel="stylesheet" href="../css/registration.css" type="text/css" media="screen">
		<script src="../js/checkForm.js"></script>
		<script src="../js/ajax.js"></script>
			<title>Tetris - Registrazione</title>
	</head>
	<body>
		<h1>Registrazione</h1>
		<p id="linkContainer"><a id="indexLink" href="../index.php">Torna alla Home</a></p>
		<form id="registration" name="register" onsubmit="return check()" method="post" action="dataProcessing.php">
			<p>Compilare i seguenti campi:</p>
			<p>
				<label>Indirizzo email: <input style="margin-left:45px;" onkeyup="checkField('email')" placeholder="pweb@esempio.it" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required></label>
			</p>
			<p style="margin:0px; padding:0px; font-size:13px;" id="emailWarning"></p>
			<p>
				<label>Username: <input style="margin-left:75px;" onkeyup="checkField('username')" placeholder="Almeno 3 caratteri" type="text" name="username" pattern="^[a-zA-Z0-9]{3,}$" maxlength="12" required></label>
			</p>
			<p style="margin:0px; padding:0px; font-size:13px; " id="usernameWarning"></p>
			<p>
				<label>Password: <input style="margin-left:80px;" placeholder="Almeno 5 caratteri" type="password" name="password" pattern=".{5,}" required></label>
			</p>
			<p style="margin-bottom:20px;">
				<label>Riscrivi la password: <input onkeyup="checkPassword(this)" type="password" name="rePassword" pattern=".{5,}" required></label>
			</p>
			<button>REGISTRATI</button>
		</form>
	</body>
</html>