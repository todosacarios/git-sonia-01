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
    paintCalendar();  
}

function paintCalendar(){

    let html="<tr><th>Emp.Code</th><th>Name</th><th>Contract Hrs</th><th>Hourly Rate</th></tr>"
    console.log(employeesToProcessInForm)

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

function formatoFecha(laFecha, modo){

    // 	const monthNames = ["January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const weekDayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    
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
                //2022-12-01
                var miFecha = year + "-" + month + "-" + day;
                break;
            case 2:
                var miFecha = weekDay;
                break;
            case 3:
                //Dec 22
                var miFecha = monthName+" "+ year.toString().slice(-2);
                break;
            case 4:
                //01 Dec 2022
                var miFecha = day + " " + monthName + " " + year;
                break;
            case 5:
                //01 Dec 2022
                var miFecha = day
                break;
            case 6:
                //Mon
                var miFecha = weekDayName[weekDay];
                break;
        }
        
        return miFecha;
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

                        alert(empCode)
						
					}
				};
			};
	};

// let date1=new Date(ini); 
// let date2=new Date(end);

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