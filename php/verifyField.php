<?php
	include "databaseConnection.php";
	if (isset($_GET['username']))
	{
		$query = "SELECT COUNT(*) as rowNumber FROM user WHERE username='".$_GET['username']."'";
		$result = $mysqli->query($query);
		if (!$result)    //Situazione di errore
		{     
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		}
		$row = $result->fetch_assoc();
		if ($row['rowNumber'] > 0)
		{
			$errore = "Username già registrato";
			echo $errore;
		}
		else
		{
			echo "OK";
		}
			
	}
	else if (isset($_GET['email']))
	{
		$query="SELECT COUNT(*) as rowNumber FROM user WHERE email='".$_GET['email']."'";
		$result = $mysqli->query($query);
		if (!$result) //Situazione di errore
		{ 
			$message = 'Invalid query: ' . $mysqli->error . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		}
		$row = $result->fetch_assoc();
		if ($row['rowNumber'] > 0)
		{
			$errore = "Email già registrata";
			echo $errore;
		}
		else
			echo "OK";
	}
	$mysqli->close();
?>