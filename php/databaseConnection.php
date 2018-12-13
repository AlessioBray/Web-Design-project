<?php
	$DBhostName = "localhost";
	$DBusername = "root";
	$DBpassword = "";
	$DBname = "tetris";
	$mysqli = new mysqli($DBhostName, $DBusername, $DBpassword, $DBname);
	if ($mysqli->connect_error)
	{
		die('Connect Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
	}
?>