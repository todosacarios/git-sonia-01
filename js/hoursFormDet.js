
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

    let html="<tr>";

    for (let i=0; i<= days_difference; i++){

        let gridDate= date1.setDate(date1.getDate()+valor);
        let gridDateNo =formatoFecha(gridDate,5);
        let gridWeekDayNmae =formatoFecha(gridDate,6);
        html +="<td>"+gridDateNo+"</td>";
        valor=1;
  
    }

    html +="</tr>";
    hoursTable.innerHTML= html;
}




// let date1= new Date(ini); 
// let date2= new Date(end);

// //calculate time difference  
// var time_difference=date2.getTime()-date1.getTime();

// //calculate days difference by dividing total milliseconds in a day  
// var days_difference=time_difference/(1000*60*60*24);
// console.log(days_difference);
// let schedulesDiv=document.getElementById("schedulesDiv");

// //El primer dia no agregamos uno a la fecha
// let valor=0;

// // let hrsTable=document.createElement("table");
// //     hrsTable.classList.add("hrsTable");
// //     schedulesDiv.append(hrsTable);
// //     let hrsTableRow=document.getElementsByClassName("hrsTable");
//     //hrsTableRow.append("tr");

// for (let i=0; i<= days_difference; i++){

//     let dayDiv=document.createElement("div");
//     dayDiv.classList.add("dayDiv");
//     schedulesDiv.append(dayDiv);
//     let gridDate= date1.setDate(date1.getDate()+valor);
//     let gridDateNo =formatoFecha(gridDate,5);
//     let gridWeekDayNmae =formatoFecha(gridDate,6);
//     dayDiv.append(gridWeekDayNmae+" "+gridDateNo)
//     valor=1;

// }
