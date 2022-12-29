<?php

header("Content-Type: application/json; charset=UTF-8");

//Accion a tomar
$act= $_POST["act"];

//Variable sglobales para poder ser accedidas desde dentro de las funciones
$fileTempVar= "";
$fileVar= "";
$fileSizeVar="";

switch ($act) {
	case 1:
        $fileTempVar= $_FILES["file"]["tmp_name"];
        $fileVar= $_FILES["file"]["name"];
        $fileSizeVar= $_FILES["file"]["size"];
		uploadCSV();
		break;
    case 2:
        $fileVar= $_FILES["file"]["name"];
        csvToArrayProcess();
        break;

    case 3:
        sendDataTotblap_forms();
        break;

    default:
        
}

function uploadCSV(){

    //header("Content-Type: application/json; charset=UTF-8");

    $fileTempVar= $GLOBALS['fileTempVar'];
    $fileVar= $GLOBALS['fileVar'];
    $fileSizeVar= $GLOBALS['fileSizeVar'];

    $target_dir = "../uploads/";
    $target_file = $target_dir . basename($fileVar);
    $uploadOk = 1;
    $csvFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        //echo "Sorry, file already exists.";
        unlink($target_file);
        $uploadOk = 1;
    }

    // Check file size
    if ($fileSizeVar > 500000) {
        //echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($csvFileType != "csv" ) {
        //echo "Sorry, only CSVs files are allowed.";
        $uploadOk = 0;
    }

    // echo json_encode(array(array("error"=>0, "message"=>"jjjk")));

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        $mensaje= "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($fileTempVar, $target_file)) {
            $mensaje= "The file ". htmlspecialchars( basename($fileVar)). " has been uploaded.";
        } else {
            $mensaje= "Sorry, there was an error uploading your file.";
        }
    }

    echo json_encode(array(array("error"=>0, "message"=>$mensaje)));

}

function csvToArrayProcess(){

    $myCSVPath= "../uploads/".$GLOBALS['fileVar'];

    $assoc_array = [];
    if (($handle = fopen($myCSVPath, "r")) !== false) {                 // open for reading
        if (($data = fgetcsv($handle, 1000, ",")) !== false) {         // extract header data
            $keys = $data;                                             // save as keys
        }
        while (($data = fgetcsv($handle, 1000, ",")) !== false) {      // loop remaining rows of data
            if(count($keys)==count($data)){
                $assoc_array[] = array_combine($keys, $data);              // push associative subarrays 
             }
        }
        fclose($handle);                                               // close when done
    }

    echo json_encode(array(array("error"=>0, "message"=>$assoc_array)));    //export to async js function

    // echo "<pre>";
    //     var_export($assoc_array);                                      // print to screen
    // echo "</pre>";
}

function sendDataTotblap_forms(){

    header("Content-Type: application/json; charset=UTF-8");

	require_once("../connection.php");

    $payFrom=$_POST['payFrom'];
    $payTo=$_POST['payTo'];
    $payRollName=$_POST['payRollName'];
    $CSVData=json_decode($_POST['CSVData'],true);
    $toDay=date('y-m-d');

    foreach($CSVData as $item) {

        $empCode= $item['empCode'];
        $empName= $item['empName'];
        $contractHrs= $item['contractHrs'];
        $contractDate= $item['contractDate'];

        $sql="INSERT INTO tblap_forms (formDate, formTitle, formStart, formEnd, formEmpCode, formEmpName, formGrade, formSalary, formCHrs, formContractDate, formHourlyRate)
        VALUES ('$toDay', '$payRollName', '$payFrom', '$payTo', $empCode, '$empName','',0,'$contractHrs', '$contractDate',0)";

        //, formGrade, formSalary, formCHrs, formContractDate, formHourlyRate

        if($connection->query($sql)===TRUE){

        	$salida=array(array("error"=>1, "message"=>'Service added successfully'));

        }else{

        	$salida=array(array("error"=>0, "message"=>"Error"));

        }
    }

    //$salida=array(array("error"=>1, "message"=>'Service added successfully'));
    echo json_encode($salida);

    //, formEnd, formEmpCode, formEmpName, formGrade, formSalary, formCHrs, formContractDate, formHourlyRate

	$connection->close();

    //echo json_encode(array(array("error"=>0, "message"=>$este)));
}

?>