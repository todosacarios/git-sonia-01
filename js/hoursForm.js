let ini="";
let end="";
let formRef="";
let containerHoursForm= document.getElementById("containerHoursForm");
let employeesToProcessInForm="";

window.addEventListener("load", inicio);

async function inicio(){

    formRef=document.getElementById("formRef").value;

    //Traer array con los empleados implicados
    employeesToProcessInForm= await employeesToProcess();
    if(employeesToProcessInForm.length==0){
        return;
    }

    ini=document.getElementById("ini").value;
    end=document.getElementById("end").value;
    let headerDateRageTitle="<p>Payroll for <span style='font-weight:bold'>"+formRef+"</span> From "+ formatoFecha(ini,4)+ " to "+formatoFecha(end,4)+"</p>";
    document.getElementById("hoursFormHeader").innerHTML= headerDateRageTitle;
    paintList();  
}

function paintList(){

    let html="<tr><th>Emp.Code</th><th>Name</th><th>Contract Hrs</th><th>Hourly Rate</th></tr>"
    //console.log(employeesToProcessInForm)

    for(x in employeesToProcessInForm){
        
        let formEmpCode= parseFloat(employeesToProcessInForm[x].formEmpCode);
        let formEmpName= employeesToProcessInForm[x].formEmpName;
        let formCHrs= parseFloat(employeesToProcessInForm[x].formCHrs);
        let formHourlyRate= parseFloat(employeesToProcessInForm[x].formHourlyRate);
        
        html+="<tr>";
        html+="<td style='text-align: left'>"+formEmpCode+"</td>";
        html+="<td style='text-align: left'>"+formEmpName+"</td>"
        html+="<td style='text-align: right'>"+formCHrs+"</td>"
        html+="<td style='text-align: right'>"+formHourlyRate+"</td>"
        html+="</tr>";
    }

    document.getElementById("tblEmpsToProcessTable").innerHTML=html;
}

async function employeesToProcess(){

	// formdata
	let data = new FormData();
	data.append('act', 6);
	data.append('formRef', formRef);

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

    return_data=json_response;

	// return_data = { error: json_response[0].id, message: json_response[0].message };

	// if(json_response.error == 1)
	// 	   throw new Error(json_response.message);	

	return return_data;
}
//Captura los datos del listado para abrir detalle
document.getElementById("tblEmpsToProcessTable").addEventListener("mouseover",abrirDetalle);

	function abrirDetalle(){

		var table=document.getElementById("tblEmpsToProcessTable");

			for(var i = 0; i < table.rows.length; i++){
				table.rows[i].onclick = function(){

					let empCode=this.cells[0].innerText;
					if(isNaN(empCode)){

					}else{

                        window.location.href = "index.php?op=hoursFormDet.php&form="+formRef+"&ini="+ini+"&end="+end+"&ec="+empCode;
						
					}
				};
			};
	};
