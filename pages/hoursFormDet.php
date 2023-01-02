<?php

    if(isset($_GET['form'])){

        $formRef= $_GET['form'];
        $ini= $_GET['ini'];
        $end= $_GET['end'];
        $empCode= $_GET['ec'];
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../styles/hoursFormDet.css">
    <title>Document</title>
</head>
<body>
    <input type="text" id="formRef" value='<?php echo $formRef ?>' style="display: none">
    <input type="date" id="ini" value='<?php echo $ini ?>' style="display: none">
    <input type="date" id="end" value='<?php echo $end ?>' style="display: none">
    <input type="number" id="empCode" value='<?php echo $empCode ?>' style="display: none">
    <div id="hrsFormDetContainer">
        <div id="hrsFormDetHeader" class="myBorder">
            <div class="one myBorder">
                <p>Al-Leave</p> 
            </div>
            <div class="two myBorder">
                <div class="two-one myBorder"><p>Care Agency</p></div>
                <div class="two-two myBorder"><p>Overtime & Allowance Payslip</p></div>
            </div>
            <div class="three myBorder orangeBG">
                <div class="three-one myBorder"><p>Name</p></div>
                <div class="three-two myBorder"><p>Grade</p></div>
                <div class="three-three myBorder"><p>Salary</p></div>
            </div>
            <div class="four myBorder orangeBG">
                <div class="four-one myBorder">
                    <input type="text" id="formEmpName" readonly>
                </div>
                <div class="four-two myBorder">
                    <input type="text" id="formGrade" readonly>
                </div>
                <div class="four-three myBorder">
                    <input type="text" id="formSalary" readonly>
                </div>
            </div>
            <div class="five myBorder orangeBG">
                <div class="five-one myBorder"><p>Con. Hours</p></div>
                <div class="five-two myBorder"><p>Pers. No</p></div>
                <div class="five-three myBorder"><p>Hourly rate</p></div>
            </div>
            <div class="six myBorder orangeBG">
                <div class="six-one myBorder">
                    <input type="text" id="formCHrs" readonly>
                </div>
                <div class="six-two myBorder">
                    <input type="text" id="formEmpCode" readonly>
                </div>
                <div class="six-three myBorder">
                    <input type="text" id="formHourlyRate" readonly>
                </div>
            </div>
        </div>
        <div id="hrsFormDetBody"><table id="hoursTable"></table></div>
    </div>
</body>

<script type="text/javascript" src="../js/hoursFormDet.js"></script>
<script type="text/javascript" src="../js/utilities.js"></script>

</html>