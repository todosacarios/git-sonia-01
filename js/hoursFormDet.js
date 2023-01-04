
let ini="";
let end="";
let formRef="";
let empCode="";
let empHoursArray="";

window.addEventListener("load", inicio);

async function inicio(){

    ini=document.getElementById("ini").value;
    end=document.getElementById("end").value;
    formRef=document.getElementById("formRef").value;
    empCode=document.getElementById("empCode").value;

    empHoursArray= await empHours();

    //console.log(empHoursArray)
    
    document.getElementById("formEmpName").value= empHoursArray[0].formEmpName;
    document.getElementById("formGrade").value= empHoursArray[0].formGrade;
    document.getElementById("formSalary").value= empHoursArray[0].formSalary;
    document.getElementById("formCHrs").value= empHoursArray[0].formCHrs;
    document.getElementById("formEmpCode").value= empHoursArray[0].formEmpCode;
    document.getElementById("formHourlyRate").value= empHoursArray[0].formHourlyRate;

    fillHoursTable();
}

async function empHours(){

	// formdata
	let data = new FormData();
	data.append('act', 8);
	data.append('formRef', formRef);
    data.append('empCode', empCode);

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

function fillHoursTable(){

    let date1= new Date(ini); 
    let date2= new Date(end);

    //calculate time difference  
    var time_difference=date2.getTime()-date1.getTime();

    //calculate days difference by dividing total milliseconds in a day  
    var days_difference=time_difference/(1000*60*60*24);

    let hoursTable= document.getElementById("hoursTable");

    //El primer dia no agregamos uno a la fecha
    let valor=0;

    let html="";

    //Day Numbers
    //let iniF=formatoFecha(date1.setDate(date1.getDate()),7);
    let iniF=formatoFecha(ini,7);
    let endF=formatoFecha(end,7);
    html+= "<tr><th>Weeks "+iniF+" to "+endF+"</th>";

    for (let i=0; i<= days_difference; i++){

        let gridDate= date1.setDate(date1.getDate()+valor);
        let gridDateNo= formatoFecha(gridDate,5);
        let gridWeekDayName= formatoFecha(gridDate,6);
        
        let dayColor="#000";
        if(gridWeekDayName=="Sun"){
            dayColor="#fc0303";
        }
        html +="<th style='color:"+dayColor+"'>"+gridDateNo+"</th>";
        valor=1;
    }

    html +="<th></th><th></th><th></th></tr>";

    //Week Days

    date1= new Date(ini); 
    date2= new Date(end);

    valor=0;

    html+= "<tr><td>DUTIES (in Hours)</td>";

    for (let i=0; i<= days_difference; i++){

        let gridDate= date1.setDate(date1.getDate()+valor);
        let gridDateNo= formatoFecha(gridDate,5);
        let gridWeekDayName= formatoFecha(gridDate,6);
        
        let dayColor="#000";
        if(gridWeekDayName=="Sun"){
            dayColor="#fc0303";
        }
        html +="<td tipo=0 style='color:"+dayColor+"'>"+gridWeekDayName+"</td>";
        valor=1;
    }

    html +="<td></td><td></td><td></td></tr>";

    //Normal Hrs

    date1= new Date(ini); 
    date2= new Date(end);

    valor=0;

    html+= "<tr><td>Normal</td>";

    for (let i=0; i<= days_difference; i++){

        let gridDate= date1.setDate(date1.getDate()+valor);
        let gridDateF= formatoFecha(gridDate,1);
        //let gridDateNo= formatoFecha(gridDate,5);
        //let gridWeekDayName= formatoFecha(gridDate,6);
        let dato="";
        let formHRS="";
        let idForm=0;
        let formPType=1;

        for(x in empHoursArray){

            if(gridDateF== empHoursArray[x].formLabDate && empHoursArray[x].formPType==1){

                idForm= empHoursArray[x].idForm;
                formHRS= empHoursArray[x].formHRS;
                dato= empHoursArray[x].formHRS;
            }
        }

        html +="<td tipo=1 formLabDate="+gridDateF+
        " idForm="+idForm+
        " formPType="+formPType+
        " formHRS="+formHRS+
        ">"+dato+"</td>";
        valor=1;
    }

    html +="<td></td><td></td><td></td></tr>";

    //Extra Hrs

    date1= new Date(ini); 
    date2= new Date(end);

    valor=0;

    html+= "<tr><td>Extra</td>";

    for (let i=0; i<= days_difference; i++){

        let gridDate= date1.setDate(date1.getDate()+valor);
        let gridDateF= formatoFecha(gridDate,1);
        //let gridDateNo= formatoFecha(gridDate,5);
        //let gridWeekDayName= formatoFecha(gridDate,6);
        let dato="";
        let formHRS=0;
        let idForm=0;
        let formPType=2;

        for(x in empHoursArray){

            if(gridDateF== empHoursArray[x].formLabDate && empHoursArray[x].formPType==2){

                idForm= empHoursArray[x].idForm;
                formHRS= empHoursArray[x].formHRS;
                dato= empHoursArray[x].formHRS;
                
            }
        }

        html +="<td tipo=1 formLabDate="+gridDateF+
        " idForm="+idForm+
        " formPType="+formPType+
        " formHRS="+formHRS+
        ">"+dato+"</td>";
        valor=1;
    }

    html +="<td></td><td></td><td></td></tr>";

    hoursTable.innerHTML= html;
}

document.addEventListener('click', function(e) {

    if(e.target.tagName=="TD" && e.target.getAttribute("tipo")==1){
        var formLabDate = e.target.getAttribute("formLabDate");
        var idForm = e.target.getAttribute("idForm");
        var formPType = e.target.getAttribute("formPType");
        alert(formLabDate +" "+idForm+" "+formPType);
    }
    
});

// document.getElementById("hoursTable").addEventListener("mouseover",abrirDetalle);

// 	function abrirDetalle(){

// 		var table=document.getElementById("hoursTable");

// 			for(var i = 0; i < table.rows.length; i++){
// 				table.rows[i].onclick = function(){

// 					let hrs=this.cells[1].innerText;				
// 				};
// 			};
// };