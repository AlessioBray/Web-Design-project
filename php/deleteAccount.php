<?php
	session_start();
	include "profileData.php";
	include "databaseConnection.php";

//Elimino l'utente dal database
	$query = "DELETE FROM user WHERE username = '".$username."'";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}

//Elimino le partite dell'utente in modalità singolo giocatore dal database
	$query = "DELETE FROM game1 WHERE playerUsername = '".$username."'";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}

//Aggiorno il contatore delle partite in modalità doppio giocatore degli utenti che hanno giocato con l'utente eliminato
//e il punteggio migliore in modalità doppio giocatore degli utenti che hanno giocato con l'utente eliminato
	$query = "SELECT playerUsername1, playerUsername2 FROM game2 WHERE playerUsername1 = '".$username."' OR playerUsername2 = '".$username."'";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	while ($row = $result->fetch_assoc())
	{
	//Aggiorno il contatore delle partite in modalità doppio giocatore degli utenti che hanno giocato con l'utente eliminato
		if ($row['playerUsername2'] == $username)
			$updateGamesPlayed2 = "UPDATE user SET gamesPlayed2 =  gamesPlayed2 - 1 WHERE username = '".$row['playerUsername1']."'";
		else 
			$updateGamesPlayed2 = "UPDATE user SET gamesPlayed2 =  gamesPlayed2 - 1 WHERE username = '".$row['playerUsername2']."'";
		$gamesPlayed2Result = $mysqli->query($updateGamesPlayed2);
		if (!$gamesPlayed2Result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $updateGamesPlayed2;
			die($message);
		}
	//Aggiorno il punteggio migliore in modalità doppio giocatore degli utenti che hanno giocato con l'utente eliminato
		if ($row['playerUsername2'] == $username)
			$selectCurrentBestScore2 = "SELECT bestScore2 FROM user WHERE username = '".$row['playerUsername1']."'";
		else
			$selectCurrentBestScore2 = "SELECT bestScore2 FROM user WHERE username = '".$row['playerUsername2']."'";
		$currentBestScore2Result = $mysqli->query($selectCurrentBestScore2);
		if (!$currentBestScore2Result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $selectCurrentBestScore2;
			die($message);
		}
		$currentBestScore2Row = $currentBestScore2Result->fetch_assoc();

		if ($row['playerUsername2'] == $username)
			$selectBestScore2 = "SELECT MAX(score) AS bestScore2 
								 FROM game2 
								 WHERE (playerUsername1 = '".$row['playerUsername1']."' OR playerUsername2 = '".$row['playerUsername1']."') 
								 		AND (playerUsername1 != '".$username."' AND playerUsername2 != '".$username."')";
		else
			$selectBestScore2 = "SELECT MAX(score) AS bestScore2 
								 FROM game2 
								 WHERE (playerUsername1 = '".$row['playerUsername2']."' OR playerUsername2 = '".$row['playerUsername2']."') 
								 		AND (playerUsername1 != '".$username."' AND playerUsername2 != '".$username."')";
		$bestScore2Result = $mysqli->query($selectBestScore2);
		if (!$bestScore2Result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $selectCurrentBestScore2;
			die($message);
		}
		$bestScore2Row = $bestScore2Result->fetch_assoc();
		if ($row['playerUsername2'] == $username)
			$updateBestScore2 = "UPDATE user SET bestScore2 = '".$bestScore2Row['bestScore2']."' WHERE username = '".$row['playerUsername1']."'";
		else
			$updateBestScore2 = "UPDATE user SET bestScore2 = '".$bestScore2Row['bestScore2']."' WHERE username = '".$row['playerUsername2']."'";
		$updateBestScore2Result = $mysqli->query($updateBestScore2);
	}

//Elimino le partite dell'utente in modalità doppio giocatore dal database
	$query = "DELETE FROM game2 WHERE playerUsername1 = '".$username."' OR playerUsername2 = '".$username."'";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}

//Aggiorno la classifica della modalità singolo giocatore
	$selectRanking = "SELECT playerUsername, MIN(FIND_IN_SET( score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM game1))) AS rank 
					  FROM game1
					  GROUP BY playerUsername";
	$selectRankingResult = $mysqli->query($selectRanking);
	if (!$selectRankingResult) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $selectRanking;
		die($message);
	}
	while ($selectRankingRow = $selectRankingResult->fetch_assoc())
	{
		$updateRank = "UPDATE user SET rank1='".$selectRankingRow['rank']."' WHERE username='".$selectRankingRow['playerUsername']."'";
		$updateRankResult = $mysqli->query($updateRank);
		if (!$updateRankResult) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $updateRank;
			die($message);
		}
	}

//Aggiorno la classifica della modalità doppio giocatore
	$selectRanking = "SELECT playerUsername1, playerUsername2, MIN(FIND_IN_SET( score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM game2))) AS rank 
					  FROM game2
					  GROUP BY playerUsername1, playerUsername2
					  ORDER BY rank DESC";
	$selectRankingResult = $mysqli->query($selectRanking);
	if (!$selectRankingResult) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $selectRanking;
		die($message);
	}
	while ($selectRankingRow = $selectRankingResult->fetch_assoc())
	{
		$updateRank = "UPDATE user SET rank2='".$selectRankingRow['rank']."' WHERE username='".$selectRankingRow['playerUsername1']."' OR username='".$selectRankingRow['playerUsername2']."'";
		$updateRankResult = $mysqli->query($updateRank);
		if (!$updateRankResult) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $updateRank;
			die($message);
		}
	}
//Aggiorno la classifica nel caso particolare in cui per un giocatore non ci siano più partite in mmodalità doppio giocatore avendo
//giocato solo in coppia con giocatori che hanno eliminato il proprio account
	$selectZeroGamesPlayed2 = "SELECT username FROM user WHERE gamesPlayed2 = 0";
	$selectZeroGamesPlayed2Result = $mysqli->query($selectZeroGamesPlayed2);
	if (!$selectZeroGamesPlayed2Result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $selectZeroGamesPlayed2;
			die($message);
		}
	while ($selectZeroGamesPlayed2Row = $selectZeroGamesPlayed2Result->fetch_assoc())
	{
		$updateZeroRank = "UPDATE user SET rank2 = 0 WHERE username='".$selectZeroGamesPlayed2Row['username']."'";
		$updateZeroRankResult = $mysqli->query($updateZeroRank);
		if (!$updateZeroRankResult) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $updateZeroRank;
			die($message);
		}
	}
	session_destroy();
	$mysqli->close();
	header("Location: ../index.php");
?>