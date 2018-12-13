<?php
	session_start();
	include "./php/session.php";
	if (isLogged())
	{
		header('Location: ./php/profile.php?ranking=1');
		exit;
	}	
?>
<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name="author" content="Alessio Bray">
		<meta name = "keywords" content = "tetris">
		<link rel="shortcut icon" type="image/x-icon" href="./img/tetris_logo.png"/>
		<link rel="stylesheet" type="text/css" href="./css/index.css" media="screen">
		<title>Tetris - Home</title>
	</head>
	<body>
		<img alt="LogoTetris" src="./img/tetris.png">
		<section>
			<p id="linkContainer"><a id="rulesLink" href="./html/rules.html">REGOLE DEL GIOCO</a></p>
			<div id="login">
				<p style="text-shadow:none; color:white; font-weight:bold; text-align:center; padding:20px;">LOGIN</p>
				<form action="./php/login.php" method="post">
					<p style="margin-bottom:7px">
						<label>Username<input type="text" name="username" pattern="^[a-zA-Z0-9]{3,}$" maxlength="12" required></label>
					</p>
					<p>
						<label>Password<input type="password" name="password" pattern=".{5,}" required></label>
					</p>
					<h5>Non sei registrato? <a class="link" href="./php/registration.php">Clicca qui</a></h5>
					<button id="enter">ACCEDI</button>
					<?php
						if (isset($_GET['registration']))
						{
							echo '<div>';
							echo "<p style='color:red; font-weight:bold; text-align:center;
							text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>Registrazione effettuata</p>";
							echo '</div>';
						} 
						else if (isset($_GET['errorMessage']) && $_GET['field'] == 3)
						{
							echo '<div>';
							echo "<span style='color:red; font-weight:bold;
							text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>" . $_GET['errorMessage'] . "</span>";
							echo '</div>';
						}
						else if (isset($_GET['errorMessage']) && $_GET['field'] == 1)
						{
							echo '<div>';
							echo "<span style='color:red; font-weight:bold;
							text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>" . $_GET['errorMessage'] . "</span>";
							echo '</div>';
						}
						else if (isset($_GET['errorMessage']) && $_GET['field'] == 2)
						{
							echo '<div>';
							echo "<span style='color:red; font-weight:bold;
							text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>" . $_GET['errorMessage'] . "</span>";
							echo '</div>';
						}
					?>
				</form>
			</div>
		</section>
	</body>
</html>