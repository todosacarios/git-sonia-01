
let ini="";
let end="";
let formRef="";
let empCode="";
let empHoursArray=[];
let BHArray=[];
let servsArray=[];
let hourlyRatesArray=[];
let totalNormalHRS=0;
let totalExtraHRS=0;
let totalExtraHRSFR=0;
let totalExtraHRSTH=0;
let totalSat=0;
let totalSun=0;
let totalNR=0;
let hourlyRate= 0;

window.addEventListener("load", inicio);

async function inicio(){

    ini=document.getElementById("ini").value;
    end=document.getElementById("end").value;
    formRef=document.getElementById("formRef").value;
    empCode=document.getElementById("empCode").value;

    BHArray= await BHData();
    empHoursArray= await empHours();
    servsArray= await servsData();
    hourlyRatesArray= await hourlyRatesData();

    //console.log(hourlyRatesArray)
    
    document.getElementById("formEmpName").value= empHoursArray[0].formEmpName;
    document.getElementById("formGrade").value= empHoursArray[0].formGrade;
    document.getElementById("formSalary").value= empHoursArray[0].formSalary;
    document.getElementById("formCHrs").value= empHoursArray[0].formCHrs;
    document.getElementById("formEmpCode").value= empHoursArray[0].formEmpCode;

    //Si aun no tiene asignado un precio hora, se le busca el que le corresponde 
    let contractDate= empHoursArray[0].formContractDate;

    //cuanto lleva contratado
    if(empHoursArray[0].formHourlyRate==0){

        let d1= new Date(contractDate);
        let d2= new Date(end);
        let noMonths= monthDiff(d1,d2);
        //console.log(noMonths);

        for(x in hourlyRatesArray){

            if(noMonths >= hourlyRatesArray[x].hrMonths){

                hourlyRate= hourlyRatesArray[x].hrAmount;
            }     
        }

    }else{

        hourlyRate= empHoursArray[0].formHourlyRate;
    }

    document.getElementById("formHourlyRate").value= hourlyRate;

    fillHoursTable();
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
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

async function hourlyRatesData(){

	// formdata
	let data = new FormData();
	data.append('act', 11);

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
            let dateStart="";
            let dateFinish="";

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

                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

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
            " startHour="+startHour+
            " finishHour="+finishHour+
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
            let dateStart="";
            let dateFinish="";

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

                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

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
            " startHour="+startHour+
            " finishHour="+finishHour+
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
            let dateStart="";
            let dateFinish="";

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
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSFR+"</td><td></td><td></td></tr>";

        let totalAmountFR= parseFloat(hourlyRate);
        totalAmountFR= totalAmountFR.toFixed(2);
        let gTotalAmountFR= totalAmountFR * totalExtraHRSFR;
        gTotalAmountFR= gTotalAmountFR.toFixed(2);

        html +="<td id='totalExtraHRSFR'>"+totalExtraHRSFR+
        "</td><td id='totalAmountFR'>"+totalAmountFR+
        "</td><td id='gTotalAmountFR'>"+gTotalAmountFR+"</td></tr>";

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
            let dateStart="";
            let dateFinish="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es domingo??
            let isSunday=formatoFecha(gridDate,2)

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

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==0 && isSunday!=0){

                    //Cálculo de horas
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();
                    
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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        let totalAmountTH= 1.5 * hourlyRate;
        totalAmountTH= totalAmountTH.toFixed(2);
        let gTotalAmountTH= totalAmountTH * totalExtraHRSTH;
        gTotalAmountTH= gTotalAmountTH.toFixed(2);

        html +="<td id='totalExtraHRSTH'>"+totalExtraHRSTH+
        "</td><td id='totalAmountTH'>"+totalAmountTH+
        "</td><td id='gTotalAmountTH'>"+gTotalAmountTH+"</td></tr>";

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
            let dateStart="";
            let dateFinish="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es domingo??
            let isSunday=formatoFecha(gridDate,2)

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
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

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

                }else if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isSunday==0){

                     //Cálculo de horas
                     dateStart= new Date(empHoursArray[x].formLabDateStart);
                     dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                     startHour= dateStart.getHours();
                     finishHour= dateFinish.getHours();

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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountDT= 2 * hourlyRate;
        totalAmountDT= totalAmountDT.toFixed(2);
        let gTotalAmountDT= totalAmountDT * totalExtraHRSDT;
        gTotalAmountDT= gTotalAmountDT.toFixed(2);

        html +="<td id='totalExtraHRSDT'>"+totalExtraHRSDT+
        "</td><td id='totalAmountDT'>"+totalAmountDT+
        "</td><td id='gTotalAmountDT'>"+gTotalAmountDT+"</td></tr>";

    }

    //Allowances header
    allowancesHeader();

    function allowancesHeader(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr style='background-color:"+dayBColor+";'><td>ALLOWANCES</td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td>Total</td><td>Rate</td><td>G.Total</td></tr>";
    }


    //@Sat 33%

    sat();

    function sat(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSat= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>Sat @ 33%</td>";

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
            let dateStart="";
            let dateFinish="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Sabado??
            let isSaturday=formatoFecha(gridDate,2)

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

                if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isSaturday==6){

                    //Cálculo de horas
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalSat=totalSat+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;

                }else if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && isSaturday==6){

                    //Cálculo de horas
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalSat=totalSat+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountSat= 1.33 * hourlyRate;
        totalAmountSat= totalAmountSat.toFixed(2);
        let gTotalAmountSat= totalAmountSat * totalSat;
        gTotalAmountSat= gTotalAmountSat.toFixed(2);

        html +="<td id='totalSat'>"+totalSat+
        "</td><td id='totalAmountSat'>"+totalAmountSat+
        "</td><td id='gTotalAmountSat'>"+gTotalAmountSat+"</td></tr>";

    }

    //@Sun 66%

    sun();

    function sun(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSat= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>Sun @ 66%</td>";

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
            let dateStart="";
            let dateFinish="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let isSunday=formatoFecha(gridDate,2)

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

                if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isSunday==0){

                    //Cálculo de horas
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalSun=totalSun+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;

                }else if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && isSunday==0){

                    //Cálculo de horas
                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    startHour= dateStart.getHours();
                    finishHour= dateFinish.getHours();

                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                    idForm= empHoursArray[x].idForm;
                    formHRS= diff;
                    //dato= diff;
                    totalSat=totalSat+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountSun= 1.66 * hourlyRate;
        totalAmountSun= totalAmountSun.toFixed(2);
        let gTotalAmountSun= totalAmountSun * totalSun;
        gTotalAmountSun= gTotalAmountSun.toFixed(2);

        html +="<td id='totalSun'>"+totalSun+
        "</td><td id='totalAmountSun'>"+totalAmountSun+
        "</td><td id='gTotalAmountSun'>"+gTotalAmountSun+"</td></tr>";

    }

    //@SNR 33%

    nr();

    function nr(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSat= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>NR @ 33%</td>";

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
            let dateStart="";
            let dateFinish="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let isSunday=formatoFecha(gridDate,2)

            //es nocturno?

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

                //Cálculo de horas
                dateStart= new Date(empHoursArray[x].formLabDateStart);
                dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                //var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                startHour= dateStart.getHours();
                finishHour= dateFinish.getHours();

                console.log(startHour + " - " + finishHour)
                let NRHours=0;

                if( startHour > 8){
                    NRHours= finishHour - startHour
                }

                //console.log("Service found "+servFound+ " times")

                if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && NRHours>0){

                    idForm= empHoursArray[x].idForm;
                    formHRS= NRHours;
                    //dato= diff;
                    totalSun=totalSun+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
                    if(acumuladorHRS[gridDateF]){

                        acumulado = acumuladorHRS[gridDateF];
                    }

                    formHRS= formHRS + acumulado
                    dato=formHRS;

                    acumuladorHRS[gridDateF]= formHRS;

                }else if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && NRHours>0){

                    idForm= empHoursArray[x].idForm;
                    formHRS= NRHours;
                    //dato= diff;
                    totalSat=totalSat+parseFloat(formHRS);

                    let acumulado=0;

                    //revisamos si ya habia horas ese dia
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
            " startHour="+startHour+
            " finishHour="+finishHour+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountNR= 1.66 * hourlyRate;
        totalAmountNR= totalAmountNR.toFixed(2);
        let gTotalAmountNR= totalAmountNR * totalNR;
        gTotalAmountNR= gTotalAmountNR.toFixed(2);

        html +="<td id='totalNR'>"+totalNR+
        "</td><td id='totalAmountNR'>"+totalAmountNR+
        "</td><td id='gTotalAmountNR'>"+gTotalAmountNR+"</td></tr>";

    }

    hoursTable.innerHTML= html;

    //window.print();
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
        var startHour = e.target.getAttribute("startHour");
        var finishHour = e.target.getAttribute("finishHour");
        alert(formLabDateStart +" idForm: "+idForm+" formRefServ: "+formRefServ +" formHRS: "+formHRS +" isBH: "+isBH+ " startHour: "+ startHour + " finishHour: "+ finishHour);
    }
    
});
