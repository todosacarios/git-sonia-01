<?php

/* https://lhcp1116.webapps.net:2083/cpsess2603177355/3rdparty/phpMyAdmin/index.php */
// $host="lhcp1116.webapps.net";
// $username="jo2eg4i8_PAS";
// $password="portauxiliarypass57";
// $dbname="jo2eg4i8_PAS";

$host="localhost";
$username="root";
$password="";
$dbname="jo2eg4i8_ada";

$connection=mysqli_connect($host,$username,$password);
mysqli_set_charset($connection,'utf8');
mysqli_select_db($connection,$dbname);


?>