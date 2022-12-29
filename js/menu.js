//Variables generales
var requiredHeaders=['empCode', 'empName', 'contractDate', 'pType', 'HRS', 'labDate'];
var CSVData="";
var errorsFoundInCSV="";

window.addEventListener("load", inicio)

function inicio(){}

document.querySelector("#upload-button").addEventListener('click', uploadButton);

document.querySelector("#file-to-upload").addEventListener("change", uploadButton);

async function uploadButton(){

	let upload = await uploadFile();
	
	if(upload.error == 0)
		// alert('File uploaded successful');
		csvToArray();
		
	else if(upload.error == 1)
		alert('File uploading failed - ' + upload.message);
}

// async function managing upload operation
async function uploadFile() {
	// function return value
	 let return_data = { error: 0, message: '' };

	 try {
	// no file selected
		if(document.querySelector("#file-to-upload").files.length == 0) {

			throw new Error('No file selected');

		} else {
			// formdata
			let data = new FormData();
			data.append('act', 1);
			data.append('file', document.querySelector("#file-to-upload").files[0]);

			// send fetch along with cookies
			let response = await fetch('functions.php', {
		        method: 'POST',
		        credentials: 'same-origin',
		        body: data
		    });

	    	// server responded with http response != 200
	    	if(response.status != 200)
	    		throw new Error('HTTP response code != 200');

	    	// read json response from server
	    	// success response example : {"error":0,"message":""}
	    	// error response example : {"error":1,"message":"File type not allowed"}
	    	let json_response = await response.json();

			return_data = { error: json_response[0].error, message: json_response[0].message };

	        if(json_response.error == 1)
	           	throw new Error(json_response.message);	
	 	}
	 }
	 catch(e) {
		// catch rejected Promises and Error objects
    	return_data = { error: 1, message: e.message };
     }

	return return_data;
}

async function csvToArray(){

	let csvToArrayResult= await csvToArrayProcess();
	//Si no hay errores cargando csv..
	if(csvToArrayResult.error==0){
		//antes de mostrar los resultados de CSV subido vamos
		// a comprobar de que se trata del que necesitamos 
		// y que sus encabezados son correctos
		CSVData=csvToArrayResult.message;
		let checkFile= await checkFileHeaders();
		if(checkFile>0){
			document.getElementById("CSVDataTable").innerHTML=errorsFoundInCSV;
			return;
		} 
		showDataOnScreen();

		//establecemos la fecha inicial y final segun archivo
		let extraerFechaInicial= extraeFecha(1);
		let extraerFechaFinal= extraeFecha(2);

		let extraerFechaInicialF= formatoFecha(extraerFechaInicial,1);
		let extraerFechaFinalF= formatoFecha(extraerFechaFinal,1);

		document.getElementById("payFrom").value= extraerFechaInicialF;
		document.getElementById("payTo").value= extraerFechaFinalF;
		document.getElementById("payRollName").value= formatoFecha(new Date(),3)

		//Advertimos si no empieza un lunes y acaba un domingo (apareceran en rojo)
		checkIfMondaySunday(extraerFechaInicial, extraerFechaFinal);
		
	}else{

		alert("Error loading CSV File");
		return;
	}

}

async function csvToArrayProcess(){

	// formdata
	let data = new FormData();
	data.append('act', 2);
	data.append('file', document.querySelector("#file-to-upload").files[0]);

	// send fetch along with cookies
	let response = await fetch('functions.php', {
		method: 'POST',
		credentials: 'same-origin',
		body: data
	});

	// server responded with http response != 200
	if(response.status != 200)
		throw new Error('HTTP response code != 200');

	// read json response from server
	// success response example : {"error":0,"message":""}
	// error response example : {"error":1,"message":"File type not allowed"}
	let json_response = await response.json();

	return_data = { error: json_response[0].error, message: json_response[0].message };

	if(json_response.error == 1)
		   throw new Error(json_response.message);	

	return return_data;
}

async function checkFileHeaders(){

	let headersNotFound=0;
	errorsFoundInCSV="<div> Headers not found: </br>";

	for(let i=1; i < requiredHeaders.length; i++){

		if(requiredHeaders[i] in CSVData[0]==false){
			headersNotFound++;
			errorsFoundInCSV+= requiredHeaders[i]+"</br>";
		}
	}

	errorsFoundInCSV+="</div>";
	return headersNotFound;
}

function showDataOnScreen(){

	//console.log(CSVData);

	var html="<tr>";

	var keys=Object.keys(CSVData[0]);

	for(let i=0; i< keys.length;i++){

		html+="<th>" +keys[i]+ "</th>";
	}

	html+="</tr>";

	for(x in CSVData){

		html+="<tr>"

		for(y in keys){
			let campo=keys[y];
			html+="<td>"+CSVData[x][campo]+"</td>";
		}

		html+="</tr>";
	}
 
	document.getElementById("CSVDataTable").innerHTML=html;
	document.getElementById("CSVDataDiv").style.display="grid";
}

function extraeFecha(modo){

	let fechaEncontrada=0;

	if('labDate' in CSVData[0]){

		fechaEncontrada=CSVData[0].labDate;

		if(modo==1){

			for(x in CSVData){

				if(CSVData[x].labDate < fechaEncontrada){

					fechaEncontrada= CSVData[x].labDate;
					
				}
			}

		}else{

			for(x in CSVData){

				if(CSVData[x].labDate > fechaEncontrada){

					fechaEncontrada=CSVData[x].labDate;
					
				}
			}

		}

	}

	return fechaEncontrada;

}

function formatoFecha(laFecha, modo){

// 	const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"];
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var date = new Date(laFecha);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var weekDay=date.getDay(); //0 for sunday
	var monthName=monthNames[date.getMonth()]

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;

	switch(modo){
		case 1:
			var miFecha = year + "-" + month + "-" + day;
			break;
		case 2:
			var miFecha = weekDay;
			break;
		case 3:
			var miFecha = monthName+" "+ year.toString().slice(-2);
			break;
	}
	
	return miFecha;
}

document.getElementById("payFrom").addEventListener("change",function(){

	let ini= document.getElementById("payFrom").value;
	let end= document.getElementById("payTo").value;
	checkIfMondaySunday(ini, end);
})

document.getElementById("payTo").addEventListener("change",function(){

	let ini= document.getElementById("payFrom").value;
	let end= document.getElementById("payTo").value;
	checkIfMondaySunday(ini, end)
})


function checkIfMondaySunday(ini, end){

	if(formatoFecha(ini,2)!=1){
		document.getElementById("payFrom").style.color="#f71505";
	}else{
		document.getElementById("payFrom").style.color="#000";
	}
	if(formatoFecha(end,2)!=0){
		document.getElementById("payTo").style.color="#f71505";
	}else{
		document.getElementById("payTo").style.color="#000";
	}
}

document.querySelector("#createFormsButton").addEventListener("click", createFormsButton);

async function createFormsButton(){

	document.getElementById("createFormsErrorMessage").innerHTML="";

	//comprobamos si tiene titulo
	let titulo = document.getElementById("payRollName").value;
	if(titulo.length==0){
		document.getElementById("createFormsErrorMessage").innerHTML="Please enter a Payroll Name";
		return;
	}

	//Comproibamos si comienza en lunes y termina en domingo
	let ini= document.getElementById("payFrom").value;
	let end= document.getElementById("payTo").value;

	if(formatoFecha(ini,2)!=1){
		document.getElementById("createFormsErrorMessage").innerHTML="Initial date is not a Monday";
		return;
	}

	if(formatoFecha(end,2)!=0){
		document.getElementById("createFormsErrorMessage").innerHTML="End date is not a Sunday";
		return;
	}

	let checkIfAlreadyExist= await checkIfAlreadyExistPayroll(titulo); 

	if(checkIfAlreadyExist.error==1){

		let response=confirm("There is already a record for this CSV data file, overwrite it?");

		if(response){
	
			let deleteCSVDataVar= await deleteCSVData(titulo);
			if(deleteCSVDataVar.error==1){
				let sendData= await sendDataTotblapForms();
				if(sendData.error==1){
					createInterface(titulo);
				}
				
			}else{
				alert("error!")
			}
		}

	}else{

		let sendData= await sendDataTotblapForms();
		alert(sendData.message)
	}

}

async function checkIfAlreadyExistPayroll(titulo){

	let data= new FormData();

	data.append('act', 4);
	data.append('titulo', titulo);

	// send fetch along with cookies
	let response = await fetch('functions.php', {
		method: 'POST',
		credentials: 'same-origin',
		body: data
	});

	// server responded with http response != 200
	if(response.status != 200)
		throw new Error('HTTP response code != 200');

	let json_response = await response.json();

	return_data = { error: json_response[0].error, message: json_response[0].message };

	if(json_response.error == 1)
			throw new Error(json_response.message);

	return return_data;
	

}

async function deleteCSVData(titulo){

	let data= new FormData();

	data.append('act', 5);
	data.append('titulo', titulo);

	// send fetch along with cookies
	let response = await fetch('functions.php', {
		method: 'POST',
		credentials: 'same-origin',
		body: data
	});

	// server responded with http response != 200
	if(response.status != 200)
		throw new Error('HTTP response code != 200');

	let json_response = await response.json();

	return_data = { error: json_response[0].error, message: json_response[0].message };

	if(json_response.error == 1)
			throw new Error(json_response.message);

	return return_data;	
}

async function sendDataTotblapForms(){

	let payFrom = document.getElementById("payFrom").value;
	let payTo = document.getElementById("payTo").value;
	let payRollName = document.getElementById("payRollName").value;

	// formdata
	let data = new FormData();
	data.append('act', 3);
	data.append('payFrom', payFrom);
	data.append('payTo', payTo);
	data.append('payRollName', payRollName);
	data.append('CSVData', JSON.stringify(CSVData));

	// send fetch along with cookies
	let response = await fetch('functions.php', {
		method: 'POST',
		credentials: 'same-origin',
		body: data
	});

	// server responded with http response != 200
	if(response.status != 200)
		throw new Error('HTTP response code != 200');

	// read json response from server
	// success response example : {"error":0,"message":""}
	// error response example : {"error":1,"message":"File type not allowed"}
	let json_response = await response.json();

	return_data = { error: json_response[0].error, message: json_response[0].message };

	if(json_response.error == 1)
		   throw new Error(json_response.message);

	return return_data;

}

document.querySelector("#createFormsButton2").addEventListener("click", createFormsButton2);

function createFormsButton2(){

	let payFrom = document.getElementById("payFrom").value;
	let payTo = document.getElementById("payTo").value;
	let payRollName = document.getElementById("payRollName").value;

	window.location.href="este.php?datos="+JSON.stringify(CSVData);

}

function createInterface(titulo){

	window.location.href = "index.php?op=hoursForm.php&form="+titulo;
}





