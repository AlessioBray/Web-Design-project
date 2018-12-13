<?php 
	include "databaseConnection.php";
	$username = $_SESSION['username'];
	$query = "SELECT gamesPlayed1, rank1, bestScore1, highestLevel, highestLinesCleared, highestTetris, gamesPlayed2, rank2, bestScore2 FROM user WHERE username ='". $username ."'";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$row = $result->fetch_assoc();
	$mysqli->close();
?>