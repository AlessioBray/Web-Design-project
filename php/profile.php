<?php
	session_start();
	include "session.php";
	include "profileData.php";
	$rankingType = $_GET['ranking'];
	if (!isLogged())
	{
		header('Location: ../index.php');
		exit;
	}
?>
<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name="author" content="Alessio Bray">
		<meta name = "keywords" content = "tetris, profile">
		<link rel="shortcut icon" type="image/x-icon" href="../img/tetris_logo.png" />
		<link rel="stylesheet" href="../css/profile.css" type="text/css" media="screen">
		<script src="../js/ajax.js"></script>
		<script src="../js/deleteAccount.js"></script>
		<script src="../js/popup.js"></script>
		<title>Tetris - Profilo</title>
	</head>
	<body>
		<section id="profileData">
			<div id="username">
				<?php 
					echo "<h2>Profilo di: ".$username."</h2>";
				?>
				<button title="Elimina Account" id="deleteAccount" onclick="createDeleteAccountPopup()"></button>
			</div>	
			<table>
				<caption>Dati profilo (Singolo)</caption>
				<colgroup><col><col>
				<tbody>
					<tr>
						<td>Partite giocate 
						<td>
							<?php
								echo $row['gamesPlayed1'];
							?>
					<tr>
						<td>Posizione in classifica
						<td>
							<?php
								if ($row['rank1'] == 0)
									echo "NON CLASSIFICATO";
								else
									echo $row['rank1'];
							?>
					<tr>
						<td>Punteggio migliore
						<td>
							<?php
								echo $row['bestScore1'];
							?>
					<tr>
						<td>Numero di linee massimo
						<td>
							<?php
								echo $row['highestLinesCleared'];
							?>
					<tr>
						<td>Numero tetris massimo
						<td>
							<?php
								echo $row['highestTetris'];
							?>
					<tr>
						<td>Livello massimo raggiunto
						<td>
							<?php
								echo $row['highestLevel']." / 20";
							?>
				</tbody>
			</table>
			<table>
				<caption>Dati profilo (Doppio)</caption>
				<colgroup><col><col>
				<tbody>
					<tr>
						<td>Partite giocate 
						<td>
							<?php
								echo $row['gamesPlayed2'];
							?>
					<tr>
						<td>Posizione in classifica
						<td>
							<?php
								if ($row['rank2'] == 0)
									echo "NON CLASSIFICATO";
								else
									echo $row['rank2'];
							?>
					<tr>
						<td>Punteggio migliore
						<td>
							<?php
								echo $row['bestScore2'];
							?>
				</tbody>
			</table>
			<div class="buttons">
				<a class="gameLink"  href="game.php?gameMode=0">Singolo Giocatore</a>
				<a class="gameLink"  href="game.php?gameMode=1">Doppio Giocatore</a>
				<a class="gameLink" href="game.php?gameMode=2">Amichevole</a>
				<a id="logout" href="logout.php">ESCI</a>
			</div>
			<div class="buttons">
				<?php
					if ($rankingType == 1)
						echo '<a class="rankingLink" href="profile.php?ranking=2">Mostra classifica: Doppio giocatore</a>';
					else if ($rankingType == 2)
						echo '<a class="rankingLink" href="profile.php?ranking=1">Mostra classifica: Singolo giocatore</a>';
				?>
			</div>
		</section>
		<section id="ranking">
			<h2>Classifica</h2>
			<table>
				<caption>
					Classifica giocatori
					<?php
						if ($rankingType == 1)
							echo '(Singolo)';
						else if ($rankingType == 2)
							echo '(Doppio)';
					?>
				</caption>
				<colgroup><col><col>
					<?php
						echo '<col><col>';
					?>
				<thead>
					<tr>
						<th>Posizione</th>
						<?php
							if ($rankingType == 1)
							{
								echo '<th>Username</th>';
								echo '<th>Livello</th>';
							}	
							else if ($rankingType == 2)
							{
								echo '<th>Username 1</th>';
								echo '<th>Username 2</th>';
							}	
						?>
						<th>Punteggio</th>
				</thead>
				<tbody>
					<?php
						include "ranking.php";
					?>
				</tbody>
			</table>
		</section>
	</body>
</html>