<?php
session_start();

require_once("../connection.php");

    unset($_SESSION['usuarioADA']);

    session_destroy();
    header('Location: index.php');

$connection->close();

?>