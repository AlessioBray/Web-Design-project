<?php
	session_start();
	include "databaseConnection.php";
	$query = "SELECT COUNT(*) AS rowNumber FROM user WHERE username='".$_GET['username']."'";
	$result = $mysqli->query($query);
	if (!$result)    //Situazione di errore
	{     
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$row = $result->fetch_assoc();
	if ($row['rowNumber'] > 0 && $_GET['username'] != $_SESSION['username'])
	{
		$username1 = $_SESSION['username'];
		$username2 = $_GET['username'];
		echo "OK";
	}
	else if ($_GET['username'] == $_SESSION['username'])
	{
		$errore = "Username del profilo in uso";
		echo $errore;
	}
	else
	{
		$errore = "Username NON registrato";
		echo $errore;
	}
	$mysqli->close();
?>