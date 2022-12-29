<?php

//session_start();

$usuario=$_SESSION['usuarioADA'];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../styles/topMenu.css">
    <title>Document</title>
</head>
<body>
    <div id="topMenu">
        <div id="tmColumn1">
            <p id="appName">Ada Payments</p>
            <p>Hola <?php echo $usuario ?></p>
        </div>
        <div id="tmColumn2">
            <form id="logOutForm" action="logOut.php">
                <input type="Submit" value="Log Out" class="myButtons">
            </form>
        </div>
        
    </div>
</body>
</html>