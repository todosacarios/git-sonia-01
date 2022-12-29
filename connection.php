<?php

$host="localhost";
$username="root";
$password="";
$dbname="jo2eg4i8_ada";

$connection=mysqli_connect($host,$username,$password);
mysqli_set_charset($connection,'utf8');
mysqli_select_db($connection,$dbname);


?>