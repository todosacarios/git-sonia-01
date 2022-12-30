<?php

    if(isset($_GET['form'])){

        $formRef= $_GET['form'];
        $ini= $_GET['ini'];
        $end= $_GET['end'];
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../styles/hoursForm.css">
    <title>Document</title>
</head>
<body>
    <input type="text" id="formRef" value='<?php echo $formRef ?>' style="display: none">
    <input type="date" id="ini" value='<?php echo $ini ?>' style="display: none">
    <input type="date" id="end" value='<?php echo $end ?>' style="display: none">
    <div id= "containerHoursForm">
    </div>
</body>

<script type="text/javascript" src="../js/hoursForm.js"></script>
</html>