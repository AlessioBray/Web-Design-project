<?php
    session_start();
    include "session.php";
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
        <meta name = "author" content = "Alessio Bray">
        <meta name = "keywords" content = "Tetris">
        <link rel="shortcut icon" type="image/x-icon" href="../img/tetris_logo.png"/>
        <link rel="stylesheet" type="text/css" href="../css/game.css" media="screen"/>
        <script src="../js/util.js"></script>
        <script src="../js/game.js"></script>
        <script src="../js/tetramino.js"></script>
        <script src="../js/playground.js"></script>
        <script src="../js/sketcher.js"></script>
        <script src="../js/gameStateFlag.js"></script>
        <script src="../js/scoreStat.js"></script>
        <script src="../js/popup.js"></script>
        <script src="../js/checkPlayerUsername.js"></script>
        <script src="../js/ajax.js"></script>
        <script>
            var gameMode = parseInt("<?php echo $_GET['gameMode']?>");
            var username1 = "<?php echo $_SESSION['username']?>";
        </script>
        <title>Tetris - Gioco</title>
    </head>
    <body onload="begin()">
    </body>
</html>