<?php 
	session_start();
	include "databaseConnection.php";
	$username = $_SESSION['username'];
	$gameMode = $_GET['gameMode'];
	if ($gameMode == 0)
	{
		$linesCleared = $_GET['linesCleared'];
		$tetris = $_GET['tetris'];
		$level = $_GET['level'];	
	}
	else
		$username2 = $_GET['username2'];
	$score = $_GET['score'];	

//Inserisco il record della partita all'interno del database.
	if ($gameMode == 0)
		$insertGame = "INSERT INTO game1 (playerUsername, level, score) VALUES ('".$username."','".$level."','".$score."')";
	else
		$insertGame = "INSERT INTO game2 (playerUsername1, playerUsername2, score) VALUES ('".$username."','".$username2."','".$score."')";
	$insertGameResult = $mysqli->query($insertGame);
	checkResult($insertGameResult, $insertGame);

//Aggiorno il numero delle partite giocate dall'utente.
	if ($gameMode == 0)
		$gamesPlayed = "SELECT gamesPlayed1 FROM user WHERE username = '".$username."'";
	else
		$gamesPlayed = "SELECT gamesPlayed2, username FROM user WHERE username = '".$username."' OR username='".$username2."'";
	$gamesPlayedResult = $mysqli->query($gamesPlayed);
	checkResult($gamesPlayedResult, $gamesPlayed);
	while ($gamesPlayedRow = $gamesPlayedResult->fetch_assoc())
	{
		if ($gameMode == 0)
			$updateGamesPlayed = "UPDATE user SET gamesPlayed1='".($gamesPlayedRow['gamesPlayed1'] + 1)."' WHERE username='".$username."'";
		else
			$updateGamesPlayed = "UPDATE user SET gamesPlayed2='".($gamesPlayedRow['gamesPlayed2'] + 1)."' WHERE username='".$gamesPlayedRow['username']."'";
		$updateGamesPlayedResult = $mysqli->query($updateGamesPlayed);
		checkResult($updateGamesPlayedResult);
	}

//Aggiorno, se necessario, il miglior punteggio totalizzato dall'utente.
	if ($gameMode == 0)
		$currentBestScore = "SELECT bestScore1 AS bestScore FROM user WHERE username = '".$username."'";
	else
		$currentBestScore = "SELECT bestScore2 AS bestScore, username FROM user WHERE username = '".$username."' OR username='".$username2."'";
	$currentBestScoreResult = $mysqli->query($currentBestScore);
	checkresult($currentBestScoreResult, $currentBestScore);
	while ($currentBestScoreRow = $currentBestScoreResult->fetch_assoc())
	{
		if ($currentBestScoreRow['bestScore'] < $score)
		{
			if ($gameMode == 0)
				$updateBestScore="UPDATE user SET bestScore1='".$score."' WHERE username='".$username."'";
			else
				$updateBestScore="UPDATE user SET bestScore2='".$score."' WHERE username='".$currentBestScoreRow['username']."'";
			$updateBestScoreResult = $mysqli->query($updateBestScore);
			checkResult($updateBestScoreResult, $updateBestScore);
		}
	}

//Aggiorno, se necessario, il massimo numero di linee dell'utente.
	if ($gameMode == 0)
	{
		$currentHighestLinesCleared = "SELECT highestLinesCleared FROM user WHERE username = '".$username."'";
		$highestLinesClearedResult = $mysqli->query($currentHighestLinesCleared);
		checkResult($highestLinesClearedResult, $currentHighestLinesCleared);
		$highestLinesClearedRow = $highestLinesClearedResult->fetch_assoc();
		if ($highestLinesClearedRow['highestLinesCleared'] < $linesCleared)
		{
			$updateHighestLinesCleared = "UPDATE user SET highestLinesCleared='".$linesCleared."' WHERE username='".$username."'";
			$highestLinesClearedResult = $mysqli->query($updateHighestLinesCleared);
			checkResult($highestLinesClearedResult, $updateHighestLinesCleared);
		}
	}

//Aggiorno, se necessario, il massimo numero di tetris dell'utente.
	if ($gameMode == 0)
	{
		$currentHighestTetris = "SELECT highestTetris FROM user WHERE username = '".$username."'";
		$highestTetrisResult = $mysqli->query($currentHighestTetris);
		checkResult($highestTetrisResult, $currentHighestTetris);
		$highestTetrisRow = $highestTetrisResult->fetch_assoc();
		if ($highestTetrisRow['highestTetris'] < $tetris)
		{
			$updateHighestLevel="UPDATE user SET highestTetris='".$tetris."' WHERE username='".$username."'";
			$highestTetrisResult = $mysqli->query($updateHighestLevel);
			checkResult($highestTetrisResult, $updateHighestLevel);
		}
	}	

//Aggiorno, se necessario, il massimo livello raggiunto dall'utente.
	if ($gameMode == 0)
	{
		$currentHighestLevel = "SELECT highestLevel FROM user WHERE username = '".$username."'";
		$highestLevelResult = $mysqli->query($currentHighestLevel);
		checkResult($highestLevelResult, $currentHighestLevel);
		$highestLevelRow = $highestLevelResult->fetch_assoc();
		if ($highestLevelRow['highestLevel'] < $level)
		{
			$updateHighestLevel="UPDATE user SET highestLevel='".$level."' WHERE username='".$username."'";
			$highestLevelResult = $mysqli->query($updateHighestLevel);
			checkResult($highestLevelResult, $updateHighestLevel);
		}
	}

//Aggiorno il ranking di tutti gli utenti
	if ($gameMode == 0)
		$selectRanking = "SELECT playerUsername, MIN(FIND_IN_SET( score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM game1))) AS rank 
					      FROM game1
					      GROUP BY playerUsername";
	else
		$selectRanking = "SELECT playerUsername1, playerUsername2, MIN(FIND_IN_SET( score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM game2))) AS rank 
					      FROM game2
					      GROUP BY playerUsername1, playerUsername2
					      ORDER BY rank DESC";
	$selectRankingResult = $mysqli->query($selectRanking);
	checkresult($selectRankingResult, $selectRanking);
	while ($selectRankingRow = $selectRankingResult->fetch_assoc())
	{
		if ($gameMode == 0)
			$updateRank = "UPDATE user SET rank1='".$selectRankingRow['rank']."' WHERE username='".$selectRankingRow['playerUsername']."'";
		else
			$updateRank = "UPDATE user SET rank2='".$selectRankingRow['rank']."' WHERE username='".$selectRankingRow['playerUsername1']."' OR username='".$selectRankingRow['playerUsername2']."'";
		$updateRankResult = $mysqli->query($updateRank);
		checkresult($updateRankResult, $updateRank);
	}
	$mysqli->close();

	function checkResult($result, $query)
	{
		if (!$result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		}
	}
?>