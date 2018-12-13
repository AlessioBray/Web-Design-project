<?php
	include "session.php";
	include "databaseConnection.php";
	$queryUn = sprintf("SELECT COUNT(*) as rowNumber FROM user WHERE username =%s", filterSQLQuery($_POST['username']));
	$queryPw = sprintf("SELECT COUNT(*) as rowNumber FROM user WHERE password =%s", filterSQLQuery($_POST['password']));
	$queryUP = "SELECT COUNT(*) as rowNumber FROM user WHERE username ='".$_POST['username']."' AND password ='".$_POST['password']."'";
	$queryUP = sprintf("SELECT COUNT(*) as rowNumber FROM user WHERE username = %s AND password = %s", filterSQLQuery($_POST['username']), filterSQLQuery($_POST['password']));
	
	$resultUn = $mysqli->query($queryUn);
	if (!$resultUn) //Situazione di errore
	{
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$rowUn = $resultUn->fetch_assoc();

	$resultPw = $mysqli->query($queryPw);
	if (!$resultPw) //Situazione di errore
	{
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$rowPw = $resultPw->fetch_assoc();

	$resultUP = $mysqli->query($queryUP);
	if (!$resultUP) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$rowUP = $resultUP->fetch_assoc();

	if (($rowUn['rowNumber'] == 0 && $rowPw['rowNumber'] == 0) || ($rowUn['rowNumber'] == 1 && $rowPw['rowNumber'] == 1 && $rowUP['rowNumber'] == 0))
	{
		$errorMessage = "Username e Password errati";
		$field = 3;
	}
	else if ($rowUn['rowNumber'] == 0)
	{
		$errorMessage = "Username errato";
		$field = 1;
	}
	else if ($rowPw['rowNumber'] == 0)
	{
		$errorMessage = "Password errata";
		$field = 2;
	}
	else if ($rowUP['rowNumber'] == 1)
	{
		$errorMessage = null;
		session_start();
    	startSession($_POST['username']);
	}
	$mysqli->close();

	if ($errorMessage === null)
		header('location: ../index.php');
	else
		header('location: ../index.php?errorMessage=' . $errorMessage . '&field=' . $field);

//Funzione che rende la stringa utilizzabile in uno statement SQL
	function filterSQLQuery($string)
	{
		if (get_magic_quotes_gpc())
			$string = stripslashes($string);
		if (!is_numeric($string))
			$string = "'".mysql_real_escape_string($string)."'";
		return $string;
	}
?>
