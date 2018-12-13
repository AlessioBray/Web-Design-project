<?php
	include "databaseConnection.php";
	$query = "INSERT INTO user (email, username, password) VALUES ('".$_POST['email']."','".$_POST['username']."','".$_POST['password']."')";
	$result = $mysqli->query($query);
	if (!$result)  //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$mysqli->close();
	header('location: ../index.php?registration=done');
?>