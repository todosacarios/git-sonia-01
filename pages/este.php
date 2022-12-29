<?php

//$CSVData=$_GET['datos'];

$datos=json_decode($_GET['datos'],true);

//echo $CSVData;

foreach($datos as $item) { //foreach element in $arr
    echo  $item['empName']; //etc
}

