<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../styles/menu.css">
    <title>Menu</title>
</head>
<body>
    <div id="containerMenu">
        <div id="buttonsDiv">
            <button id="newPayroll" class="myButtons">New Payroll</button>
        </div>
        <div id="rightMenu">
            <div id="newPayrollSubmenu">
                <div>
                    <p>1. Select file:</p>
                    <input type="file" id="file-to-upload" accept=".csv"/>
                    <button id="upload-button" style="display:none">Upload</button>
                </div>
                <div>
                    <p>2. ..or set it up manually:</p>
                    <label for="payRollName">Payroll Name</label>
                    <input type="text" name="payRollName" id="payRollName">
                    <label for="payFrom">From</label>
                    <input type="date" id="payFrom">
                    <label for="payTo">To</label>
                    <input type="date" id="payTo">
                </div>
                <div id="CSVDataDiv" style="display:none">
                    <div>
                        <table id="CSVDataTable"></table>
                    </div>
                </div>
                <div id="createFormsButtonDiv">
                    <button id="createFormsButton" class="myButtons">Create Forms</button>
                    <button id="createFormsButton2" class="myButtons">Create Forms2</button>
                    <p id="createFormsErrorMessage" style="color: #d91204; margin: 5px;"></p>
                </div>
                <div id="listOfPrevForms"><table id="tableOfPrevForms" class="tblResults"></table></div>
            </div>
        </div>
    </div>
</body>

<script type="text/javascript" src="../js/menu.js"></script>
<script type="text/javascript" src="../js/utilities.js"></script>

</html>