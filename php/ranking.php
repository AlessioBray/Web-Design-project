<?php	
	include "databaseConnection.php";
	if ($rankingType == 1)
		$query = "SELECT playerUsername, level, score FROM game1 ORDER BY score DESC, level ASC";
	else
		$query = "SELECT playerUsername1, playerUsername2, score FROM game2 ORDER BY score DESC";
	$result = $mysqli->query($query);
	if (!$result) //Situazione di errore
	{ 
		$message = 'Invalid query: ' . $mysqli->error . "\n";
		$message .= 'Whole query: ' . $query;
		die($message);
	}
	$previusScore = 0;
	$previusIndex = 0;
	$index = 1;
	
	$style = "style='background-color: rgba(39, 179, 88, 1); color: white; font-weight: 500; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'";
	while ($row = $result->fetch_assoc())
	{
		if ($previusScore == $row['score'])
		{
			if ($rankingType == 1)
			{
				if ($row['playerUsername'] == $username)
				{
					echo "<tr> <td ".$style.">#". $previusIndex;
					echo "<td ".$style.">".$row['playerUsername'];
					echo "<td ".$style.">".$row['level']." / 20";
					echo "<td ".$style.">".$row['score'];
				}
				else
				{
					echo "<tr> <td>#".$previusIndex;
					echo "<td>".$row['playerUsername'];
					echo "<td>".$row['level']." / 20";
					echo "<td>".$row['score'];
				}
			}
			else
			{
				if ($row['playerUsername1'] == $username || $row['playerUsername2'] == $username)
				{
					echo "<tr> <td ".$style.">#". $previusIndex;
					echo "<td ".$style.">".$row['playerUsername1'];
					echo "<td ".$style.">".$row['playerUsername2'];
					echo "<td ".$style.">".$row['score'];
				}
				else
				{
					echo "<tr> <td>#".$previusIndex;
					echo "<td>".$row['playerUsername1'];
					echo "<td>".$row['playerUsername2'];
					echo "<td>".$row['score'];
				}
			}
			$index++;
		}
		else
		{
			if ($rankingType == 1)
			{
				if ($row['playerUsername'] == $username)
				{
					echo "<tr> <td ".$style.">#". $index;
					echo "<td ".$style.">".$row['playerUsername'];
					echo "<td ".$style.">".$row['level']." / 20";
					echo "<td ".$style.">".$row['score'];
				}
				else
				{
					echo "<tr> <td>#".$index;
					echo "<td>".$row['playerUsername'];
					echo "<td>".$row['level']." / 20";
					echo "<td>".$row['score'];
				}
			}
			else
			{
				if ($row['playerUsername1'] == $username || $row['playerUsername2'] == $username)
				{
					echo "<tr> <td ".$style.">#". $index;
					echo "<td ".$style.">".$row['playerUsername1'];
					echo "<td ".$style.">".$row['playerUsername2'];
					echo "<td ".$style.">".$row['score'];
				}
				else
				{
					echo "<tr> <td>#".$index;
					echo "<td>".$row['playerUsername1'];
					echo "<td>".$row['playerUsername2'];
					echo "<td>".$row['score'];
				}
				
			}
			$previusIndex = $index;
			$index++;
		}
		$previusScore = $row['score'];
		
		if ($index == 15) //In questo modo vengono mostrati i primi 14 punteggi;
			break;
	}
	$mysqli->close();
?>