
let ini="";
let end="";
let formRef="";
let empCode="";
let empHoursArray=[];
let BHArray=[];
let servsArray=[];
let totalNormalHRS=0;
let totalExtraHRS=0;
let totalExtraHRSFR=0;
let totalExtraHRSTH=0;

window.addEventListener("load", inicio);

async function inicio(){

    ini=document.getElementById("ini").value;
    end=document.getElementById("end").value;
    formRef=document.getElementById("formRef").value;
    empCode=document.getElementById("empCode").value;

    BHArray= await BHData();
    empHoursArray= await empHours();
    servsArray= await servsData();

    //console.log(BHArray)
    
    document.getElementById("formEmpName").value= empHoursArray[0].formEmpName;
    document.getElementById("formGrade").value= empHoursArray[0].formGrade;
    document.getElementById("formSalary").value= empHoursArray[0].formSalary;
    document.getElementById("formCHrs").value= empHoursArray[0].formCHrs;
    document.getElementById("formEmpCode").value= empHoursArray[0].formEmpCode;
    document.getElementById("formHourlyRate").value= empHoursArray[0].formHourlyRate;

    fillHoursTable();
}

async function BHData(){

	// formdata
	let data = new FormData();
	data.append('act', 9);

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

    return_data= json_response;

	// return_data = { error: json_response[0].id, message: json_response[0].message };

	// if(json_response.error == 1)
	// 	   throw new Error(json_response.message);	

	return return_data;    
}

async function servsData(){

	// formdata
	let data = new FormData();
	data.append('act', 10);

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

    return_data= json_response;

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

    //Day Numbers ############################################################################################################

    dayNumbers();

    function dayNumbers(){

        let iniF=formatoFecha(ini,7);
        let endF=formatoFecha(end,7);
        html+= "<tr><th>Weeks "+iniF+" to "+endF+"</th>";

        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateNo= formatoFecha(gridDate,5);
            let gridWeekDayName= formatoFecha(gridDate,6);
            let gridDateF= formatoFecha(gridDate,1);

            let dayColor="#000";
            let dayBColor="#ffffff";

            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    dayColor="#ffffff";
                    dayBColor="#057d02";
                }
            }

            if(gridWeekDayName=="Sun"){

                dayColor="#ffffff";
                dayBColor="#fc0303";
            }

            html +="<th style='color:"+dayColor+"; background-color:"+dayBColor+";'>"+gridDateNo+"</th>";

            valor=1;
        }

        html +="<th></th><th></th><th></th></tr>";

    }

    //Week Days
    weekDays();

    function weekDays(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr style='background-color:"+dayBColor+";'><td>DUTIES (in Hours)</td>";

        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateNo= formatoFecha(gridDate,5);
            let gridWeekDayName= formatoFecha(gridDate,6);
            let gridDateF= formatoFecha(gridDate,1);
            
            let dayColor="#000";
            let dayBColor="#ffffff";

            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    dayColor="#057d02";
                    //dayBColor="#057d02";
                }
            }

            if(gridWeekDayName=="Sun"){

                dayColor="#fc0303";
            }

            html +="<td tipo=0 style='color:"+dayColor+";'>"+gridWeekDayName+"</td>";
            valor=1;
        }

        html +="<td></td><td></td><td></td></tr>";
    }

    //Normal Hrs

    normalHRS();

    function normalHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalNormalHRS= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>Normal</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            //let gridDateNo= formatoFecha(gridDate,5);
            //let gridWeekDayName= formatoFecha(gridDate,6);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let refServ= empHoursArray[x].formRefServ;

                //comprobamos si son horas "Normal"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        servFound=1;
                    }
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Normal"){

                    let dateStart= new Date(empHoursArray[x].formLabDateStart);
                    let dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;
                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalNormalHRS=totalNormalHRS+parseFloat(formHRS);

                    let acumulado=0;

                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;
                }
            }

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            ">"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalNormalHRS'>"+totalNormalHRS+"</td><td></td><td></td></tr>";

    }

    //Extra Hrs

    extraHRS();

    function extraHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRS= 0;

        html+= "<tr><td>Extra</td>";

        let acumuladorHRS=[];

        //console.log(acumuladorHRS);

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            //let gridDateNo= formatoFecha(gridDate,5);
            //let gridWeekDayName= formatoFecha(gridDate,6);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let refServ= empHoursArray[x].formRefServ;

                //comprobamos si son horas "Extra"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        servFound=1;
                    }
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra"){

                    let dateStart= new Date(empHoursArray[x].formLabDateStart);
                    let dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                    var diff = (dateFinish.getTime()- dateStart.getTime()) / 3600000;
                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalExtraHRS=totalExtraHRS + parseFloat(formHRS);

                    let acumulado=0;

                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;
                }

                
            }


            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            ">"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalExtraHRS'>"+totalExtraHRS+"</td><td></td><td></td></tr>";

    }

    //Overtime header
    overtimeHeader();

    function overtimeHeader(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr style='background-color:"+dayBColor+";'><td>OVERTIME</td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td>Total</td><td>Rate</td><td>G.Total</td></tr>";
    }

    //FR Hrs

    FRHRS();

    function FRHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRSFR= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>FR</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            //let gridDateNo= formatoFecha(gridDate,5);
            //let gridWeekDayName= formatoFecha(gridDate,6);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let refServ= empHoursArray[x].formRefServ;

                //comprobamos si son horas "Extra"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        catServ= servsArray[z].catServ;
                        servFound=1;
                    }
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR"){

                    //Cálculo de horas
                    let dateStart= new Date(empHoursArray[x].formLabDateStart);
                    let dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalExtraHRSFR=totalExtraHRSFR+parseFloat(formHRS);

                    let acumulado=0;

                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;
                }
            }

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            ">"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalExtraHRSFR'>"+totalExtraHRSFR+"</td><td></td><td></td></tr>";

    }

    //OT time and a half Hrs

    OTTHHRS();

    function OTTHHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRSTH= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>@ 1½</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            //let gridDateNo= formatoFecha(gridDate,5);
            //let gridWeekDayName= formatoFecha(gridDate,6);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let refServ= empHoursArray[x].formRefServ;

                //comprobamos si son horas "Extra"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        catServ= servsArray[z].catServ;
                        servFound=1;
                    }
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==0){

                    //Cálculo de horas
                    let dateStart= new Date(empHoursArray[x].formLabDateStart);
                    let dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalExtraHRSTH=totalExtraHRSTH+parseFloat(formHRS);

                    let acumulado=0;

                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;
                }
            }

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            ">"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalExtraHRSFR'>"+totalExtraHRSTH+"</td><td></td><td></td></tr>";

    }

    //OT double

    OTDTHRS();

    function OTDTHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRSDT= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>@ 2</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            //let gridDateNo= formatoFecha(gridDate,5);
            //let gridWeekDayName= formatoFecha(gridDate,6);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let refServ= empHoursArray[x].formRefServ;

                //comprobamos si son horas "Extra"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        catServ= servsArray[z].catServ;
                        servFound=1;
                    }
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==1){

                    //Cálculo de horas
                    let dateStart= new Date(empHoursArray[x].formLabDateStart);
                    let dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalExtraHRSDT=totalExtraHRSDT+parseFloat(formHRS);

                    let acumulado=0;

                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;
                }
            }

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            ">"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

    }

    hoursTable.innerHTML= html;

    // let myElement= document.querySelectorAll('[tipo="1"]');

    //     for(x in myElement){
    //         console.log(myElement[x])
    //     }
}

document.addEventListener('click', function(e) {

    if(e.target.tagName=="TD" && e.target.getAttribute("tipo")==1){
        var formLabDateStart = e.target.getAttribute("formLabDateStart");
        var idForm = e.target.getAttribute("idForm");
        var formRefServ = e.target.getAttribute("formRefServ");
        var formHRS = e.target.getAttribute("formHRS");
        var isBH = e.target.getAttribute("isBH");
        alert(formLabDateStart +" idForm: "+idForm+" formRefServ: "+formRefServ +" formHRS: "+formHRS +" isBH: "+isBH);
    }
    
});
