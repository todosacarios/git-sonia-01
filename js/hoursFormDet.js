
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
let totalExtraHRSDT=0;
let totalSat=0;
let totalSun=0;
let totalNR=0;
let totalSDA=0;
let totalOTSDA=0;
let totalSL=0;
let hourlyRate=0;
let totalSLInd=0;

let gTotalAmountDT=0;
let gTotalAmountTH=0;
let gTotalAmountFR=0;
let gTotalExtraHRSFR=0;
let gOvertimeTotal=0;
let gTotalAmountSat=0;
let gTotalAmountSun=0;
let gTotalAmountNR=0;
let gAllowancesTotal=0;
let gTotalAmountSDA=0;
let gTotalAmountOTSDA=0;
let gTotalHrs=0;
let gSDAOTSDATotals=0;
let gTotalAmountSL=0;
let totalHrsSum=0;

let ignoreBecauseLastMonday=0;

let hrsType=["Normal", "Extra", "Fr", "Th", "Dt", "Sat", "Sun", "Nr", "SDA", "OTSDA", "SL"];

let extraHoursArray=[];
let thHoursArray=[];
let satHoursArray=[];
let sunHoursArray=[];
let nrHoursArray=[];

//runingSumHrs
let savedHrs=[];


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

    document.getElementById("hrsLocationInput").value= servsArray[0].clientNameServ;
    document.getElementById("hrsMonthInput").value= formRef.slice(0, 3);
    document.getElementById("hrsYearInput").value= formRef.slice(-2);

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

        html+= "<tr><td>Normal</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let dateStart="";
            let dateFinish="";
            let formHrsAssignType=0;

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
                let refServ= empHoursArray[x].formRefServ;
                idForm= empHoursArray[x].idForm;

                //comprobamos si son horas "Normal"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        servFound=1;
                    }
                }

                servFound==0? console.log("Service "+refServ+ " for " +formLabDateStartF+ " not found"):"";

                if(gridDateF== formLabDateStartF && payTypeServ=="Normal" ){

                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    //Son horas asignadas por el usuario o por el GESAD?
                    formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                    
                    switch(formHrsAssignType){

                        case 0:

                            //Empieza y termina el mismo dia su turno?
                            let startFinishSameDay= 0;
                            formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                            startFinishSameDay=parseInt(startFinishSameDay);

                            var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            if(startFinishSameDay==1){

                                //es Sabado??
                                let isSaturday=formatoFecha(formLabDateFinishF,2);

                                if(isSaturday==6){

                                    let dateFinishFromCero= new Date(dateFinish);
                                    dateFinishFromCero.setHours(0);
                                    dateFinishFromCero.setMinutes(0);

                                    let forSat= ( dateFinish.getTime()- dateFinishFromCero.getTime()) / 3600000;

                                    satHoursArray[gridDateF]= forSat;

                                }
                                

                            }


                            formHRS= diff;

                            break;

                        case 1:

                            formHRS= parseFloat(empHoursArray[x].formHRS)

                            break;

                    }

                }

            }

            totalNormalHRS=totalNormalHRS+parseFloat(formHRS);
            formHRS== 0? "": dato=formHRS.toFixed(2);
            
            dateStart? dateStart="'"+formatoFecha(dateStart,8)+"'":"";
            dateFinish? dateFinish="'"+formatoFecha(dateFinish,8)+"'":"";

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=0"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinish="+dateFinish+
            " formHrsAssignType="+formHrsAssignType+
            " class='resaltarSiEditable'>"+dato+"</td>";
            valor=1;
        }

        html +="<td id='totalNormalHRS'>"+totalNormalHRS.toFixed(2)+"</td><td></td><td></td></tr>";

    }

        //Extra Hrs

        extraHRS();

        function extraHRS(){
    
            date1= new Date(ini); 
            date2= new Date(end);
    
            valor=0;
            totalExtraHRS= 0;
    
            html+= "<tr><td>Extra</td>";
    
            //vamos dia por dia
            for (let i=0; i<= days_difference; i++){
    
                let gridDate= date1.setDate(date1.getDate()+valor);
                let gridDateF= formatoFecha(gridDate,1);
                let dato="";
                let formHRS=0;
                let idForm=0;
                let formRefServ=1;
                let isBH=0;
                let payTypeServ="";
                let catServ="";
                let dateStart="";
                let dateFinish="";
                let formHrsAssignType=0;
    
                //es bankholiday?
                for(x in BHArray){
    
                    if(gridDateF== BHArray[x].datebh){
                        
                        isBH=1;
                    }
                }
    
                for(x in empHoursArray){
    
                    let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                    let refServ= empHoursArray[x].formRefServ;
                    idForm= empHoursArray[x].idForm;
    
                    //comprobamos si son horas "Normal"
                    let servFound=0;
    
                    for(z in servsArray){
                        
                        if(servsArray[z].refServ == refServ){
                            payTypeServ= servsArray[z].payTypeServ;
                            catServ= servsArray[z].catServ;
                            servFound=1;
                        }
                    }
    
                    servFound==0? console.log("Service "+refServ+ " for " +formLabDateStartF+ " not found"):"";
    
                    if(gridDateF== formLabDateStartF && payTypeServ=="Extra"){
    
                        //Son horas asignadas por el usuario o por el GESAD?
                        formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                        
                        switch(formHrsAssignType){
    
                            case 0:

                                dateStart= new Date(empHoursArray[x].formLabDateStart);
                                dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                                var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                //si es extra y OT lo metemos en la array
                                catServ=="OT"?extraHoursArray[gridDateF]= diff:"";
    
                                formHRS= diff;
    
                                break;
    
                            case 1:
    
                                formHRS= parseFloat(empHoursArray[x].formHRS)
    
                                break;
    
                        }
    
                    }
    
                }
    
                totalExtraHRS= totalExtraHRS+parseFloat(formHRS);
                formHRS== 0? "": dato=formHRS.toFixed(2);
                
                dateStart? dateStart="'"+formatoFecha(dateStart,8)+"'":"";
                dateFinish? dateFinish="'"+formatoFecha(dateFinish,8)+"'":"";
    
                html +="<td tipo=1 formLabDateStart="+gridDateF+
                " hrsType=1"+
                " idForm="+idForm+
                " formRefServ="+formRefServ+
                " formHRS="+formHRS+
                " isBH="+isBH+
                " dateStart="+dateStart+
                " dateFinish="+dateFinish+
                " formHrsAssignType="+formHrsAssignType+
                " class='resaltarSiEditable'>"+dato+"</td>";
                valor=1;
            }
    
            html +="<td id='totalExtraHRS'>"+totalExtraHRS.toFixed(2)+"</td><td></td><td></td></tr>";
    
        }

    //Duties Totals
    dutiesTotals();

    function dutiesTotals(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        gTotalHrs= parseFloat(totalNormalHRS) + parseFloat(totalExtraHRS);
        gTotalHrs= gTotalHrs.toFixed(2); 

        html +="<td class='boldStyle orangeBG' id='gTotalHrs'>"+gTotalHrs+"</td><td class='boldStyle orangeBG'></td><td class='boldStyle orangeBG'></td></tr>";
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

        html +="<td>Hrs</td><td>Rate</td><td>G.Total</td></tr>";
    }

    //Extra FR

    FRHRS();

    function FRHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRSFR= 0;

        html+= "<tr><td>FR</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";
            let dateStart="";
            let dateFinish="";
            let formHrsAssignType=0;

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
                let refServ= empHoursArray[x].formRefServ;
                idForm= empHoursArray[x].idForm;

                //comprobamos si son horas "Normal"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        catServ= servsArray[z].catServ;
                        servFound=1;
                    }
                }

                servFound==0? console.log("Service "+refServ+ " for " +formLabDateStartF+ " not found"):"";

                if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR"){

                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                    //Son horas asignadas por el usuario o por el GESAD?
                    formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                    
                    switch(formHrsAssignType){

                        case 0:

                            //Empieza y termina el mismo dia su turno?
                            let startFinishSameDay= 0;
                            formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                            startFinishSameDay=parseInt(startFinishSameDay);

                            var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            if(startFinishSameDay==1){

                                //es Sabado??
                                let isSaturday=formatoFecha(formLabDateFinishF,2);

                                if(isSaturday==6){

                                    let dateFinishFromCero= new Date(dateFinish);
                                    dateFinishFromCero.setHours(0);
                                    dateFinishFromCero.setMinutes(0);

                                    let forSat= (dateFinish.getTime()- dateFinishFromCero.getTime()) / 3600000;

                                    satHoursArray[gridDateF]= forSat;

                                }
                                

                            }

                            formHRS= diff;

                            break;

                        case 1:

                            formHRS= parseFloat(empHoursArray[x].formHRS)

                            break;

                    }

                }

            }

            totalExtraHRSFR= totalExtraHRSFR+parseFloat(formHRS);
            formHRS== 0? "": dato=formHRS.toFixed(2);
            
            dateStart? dateStart="'"+formatoFecha(dateStart,8)+"'":"";
            dateFinish? dateFinish="'"+formatoFecha(dateFinish,8)+"'":"";

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=2"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinish="+dateFinish+
            " formHrsAssignType="+formHrsAssignType+
            " class='resaltarSiEditable'>"+dato+"</td>";
            valor=1;
        }

        let totalAmountFR= parseFloat(hourlyRate);
        totalAmountFR= totalAmountFR.toFixed(2);
        gTotalAmountFR= totalAmountFR * totalExtraHRSFR;
        gTotalAmountFR= gTotalAmountFR.toFixed(2);

        html +="<td id='totalExtraHRSFR'>"+totalExtraHRSFR.toFixed(2)+
        "</td><td id='totalAmountFR'>"+totalAmountFR+
        "</td><td id='gTotalAmountFR'>"+gTotalAmountFR+"</td></tr>";

    }

    //OT TH HRS

    OTTHHRS();

    function OTTHHRS(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalExtraHRSTH= 0;

        html+= "<tr><td>@ 1½</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";
            let dateStart="";
            let dateFinish="";
            let formHrsAssignType=0;

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es domingo??
            let isSunday= formatoFecha(gridDate,2)

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
                let refServ= empHoursArray[x].formRefServ;
                idForm= empHoursArray[x].idForm;

                //comprobamos si son horas "Normal"
                let servFound=0;

                for(z in servsArray){
                    
                    if(servsArray[z].refServ == refServ){
                        payTypeServ= servsArray[z].payTypeServ;
                        catServ= servsArray[z].catServ;
                        servFound=1;
                    }
                }

                servFound==0? console.log("Service "+refServ+ " for " +formLabDateStartF+ " not found"):"";

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);

                //console.log(formLabDateStartF +" --"+ startFinishSameDay)

                //Si empieza y termina el mismo dia
                if(startFinishSameDay== 0){

                    //console.log("Mismo dia en th:"+formLabDateStartF+"- "+payTypeServ+"- "+catServ+"- "+isBH+ "- "+ isSunday)

                    if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==0 && isSunday!=0){

                        dateStart= new Date(empHoursArray[x].formLabDateStart);
                        dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                        //Son horas asignadas por el usuario o por el GESAD?
                        formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                        
                        switch(formHrsAssignType){

                            case 0:

                                var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                formHRS= diff;

                                break;

                            case 1:

                                formHRS= parseFloat(empHoursArray[x].formHRS)

                                break;

                        }

                    }

                }

                //si empieza un dia y termina al siguiente habria que comprobar que dia es el que le sigue por si es domingo o BH
                if(startFinishSameDay== 1){

                    //console.log("dias distintos en th:"+formLabDateStartF+"- "+payTypeServ+"- "+catServ+"- "+isBH+ "- "+ isSunday)

                    if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==0 && isSunday!=0){

                        //console.log("en TH "+ formLabDateStartF+ " " + isBH + " "+ isSunday)

                        // startH1= dateStart.getHours();
                        // finishH1= dateFinish.getHours();
                    
                        //Son horas asignadas por el usuario o por el GESAD?
                        formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                        
                        switch(formHrsAssignType){

                            case 0:

                                //es bankholiday el siguiente dia?
                                let isBHNextDay=0;

                                for(y in BHArray){

                                    if(formLabDateFinishF== BHArray[y].datebh){
                                        
                                        isBHNextDay=1;
                                    }
                                }

                                //es Domingo el siguiente dia?
                                let isSundayNextDay=0;
                                isSundayNextDay= formatoFecha(formLabDateFinishF,2)

                                if(isBHNextDay==0 && isSundayNextDay!=0){

                                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                    formHRS= diff;
                                }

                                if(isBHNextDay==1 || isSundayNextDay==0){

                                    dateStart= new Date(empHoursArray[x].formLabDateStart);
                                    dateFinish= new Date(empHoursArray[x].formLabDateFinish);
                                    dateFinish.setHours(0);
                                    dateFinish.setMinutes(0);
                                    var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                    formHRS= diff;
                                }

                                break;

                            case 1:

                                formHRS= parseFloat(empHoursArray[x].formHRS)

                                break;

                        }

                    }

                    thHoursArray[gridDateF]= formHRS;
                    
                }

            }

            totalExtraHRSTH= totalExtraHRSTH+parseFloat(formHRS);
            formHRS== 0? "": dato=formHRS.toFixed(2);
            
            dateStart? dateStart="'"+formatoFecha(dateStart,8)+"'":"";
            dateFinish? dateFinish="'"+formatoFecha(dateFinish,8)+"'":"";

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=3"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinish="+dateFinish+
            " formHrsAssignType="+formHrsAssignType+
            " class='resaltarSiEditable'>"+dato+"</td>";
            valor=1;
        }

        let totalAmountTH= 1.5 * parseFloat(hourlyRate);
        totalAmountTH= totalAmountTH.toFixed(2);
        gTotalAmountTH= totalAmountTH * totalExtraHRSTH;
        gTotalAmountTH= gTotalAmountTH.toFixed(2);

        html +="<td id='totalExtraHRSTH'>"+totalExtraHRSTH.toFixed(2)+
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

        html+= "<tr><td>@ 2</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";
            let dateStart="";
            let dateFinish="";
            let formHrsAssignType=0;

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //console.log("DT Process.... "+gridDateF+ " " +isBH)

            //es domingo??
            let isSunday= formatoFecha(gridDate,2)

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
                let refServ= empHoursArray[x].formRefServ;
                idForm= empHoursArray[x].idForm;

                //Son horas asignadas por el usuario o por el GESAD?
                formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);
                
                switch(formHrsAssignType){

                    case 0:

                        Object.keys(extraHoursArray).forEach((key) => {
                            // console.log('Key is: ' + key);
                            // console.log('Value is: ' + extraHoursArray[key]);

                            if(gridDateF==key){

                                Object.keys(thHoursArray).forEach((keyTh) => {

                                    if(keyTh==key){

                                        //error fechas (sin repercusion)
                                        dateStart= key;
                                        dateFinish= key;
                                        formHRS= extraHoursArray[key]-thHoursArray[keyTh];
                                    }
                                });
                            }

                        }); 

                        break;

                    case 1:

                        formHRS= parseFloat(empHoursArray[x].formHRS)

                        break;

                }  

            }

            totalExtraHRSDT= totalExtraHRSDT+parseFloat(formHRS);
            formHRS== 0? "": dato=formHRS.toFixed(2);
            
            dateStart? dateStart="'"+formatoFecha(dateStart,8)+"'":"";
            dateFinish? dateFinish="'"+formatoFecha(dateFinish,8)+"'":"";

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=5"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinish="+dateFinish+
            " formHrsAssignType="+formHrsAssignType+
            " class='resaltarSiEditable'>"+dato+"</td>";
            valor=1;
        }

        let totalAmountDT= 2 * parseFloat(hourlyRate);
        totalAmountDT= totalAmountDT.toFixed(2);
        gTotalAmountDT= totalAmountDT * totalExtraHRSDT;
        gTotalAmountDT= gTotalAmountDT.toFixed(2);

        html +="<td id='totalExtraHRSDT'>"+totalExtraHRSDT.toFixed(2)+
        "</td><td id='totalAmountTH'>"+totalAmountDT+
        "</td><td id='gTotalAmountTH'>"+gTotalAmountDT+"</td></tr>";

    }

    //Overtime Total
    overtimeTotal();

    function overtimeTotal(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }


        gOvertimeTotal= parseFloat(gTotalAmountFR) + parseFloat(gTotalAmountTH) + parseFloat(gTotalAmountDT);
        gOvertimeTotal= gOvertimeTotal.toFixed(2);

        html +="<td class='boldStyle orangeBG'>Total</td><td class='boldStyle orangeBG'></td><td class='boldStyle orangeBG' id='gOvertimeTotal'>"+gOvertimeTotal+"</td></tr>";
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

        html +="<td>Hrs</td><td>Rate</td><td>G.Total</td></tr>";
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
            let startHour="";
            let finishHour="";

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
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
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

                //Son horas asignadas por el usuario o por el GESAD?
                formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);
                
                switch(formHrsAssignType){

                    case 0:

                            if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isSaturday==6){

                                //Cálculo de horas
                                dateStart= new Date(empHoursArray[x].formLabDateStart);
                                dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                                var totalHrsShift = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;
                                
                                if(startFinishSameDay==1){

                                    dateFinish.setHours(0);
                                    dateFinish.setMinutes(0);
                                }

                                var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                idForm= empHoursArray[x].idForm;
                                formHRS= diff;

                                if(startFinishSameDay==1){

                                    sunHoursArray[gridDateF]= totalHrsShift-formHRS;
                                }

                            }
                            
                            if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && isSaturday==6){

                                //Cálculo de horas
                                dateStart= new Date(empHoursArray[x].formLabDateStart);
                                dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                                var totalHrsShift = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                if(startFinishSameDay==1){

                                    dateFinish.setHours(0);
                                    dateFinish.setMinutes(0);
                                }

                                var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                                idForm= empHoursArray[x].idForm;
                                formHRS= diff;
                                //dato= diff;


                                if(startFinishSameDay==1){

                                    sunHoursArray[gridDateF]= totalHrsShift-formHRS;
                                }

                            }

                            if(gridDateF== formLabDateStartF && isSaturday !=6){

                                Object.keys(satHoursArray).forEach((key) => {
                                    // console.log('Key is: ' + key);
                                    // console.log('Value is: ' + extraHoursArray[key]);
        
                                    if(gridDateF==key){

                                        formHRS= satHoursArray[key];
                                    }
        
                                });

                            }


                        break;

                    case 1:

                    formHRS= parseFloat(empHoursArray[x].formHRS)

                    break;

                } 
            }

            totalSat=totalSat+parseFloat(formHRS);

            formHRS== 0? "": dato=formHRS.toFixed(2);

        

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=5"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            " class='resaltarSiEditable'>"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountSat= 0.33 * hourlyRate;
        totalAmountSat= totalAmountSat.toFixed(2);
        gTotalAmountSat= totalAmountSat * totalSat;
        gTotalAmountSat= gTotalAmountSat.toFixed(2);

        html +="<td id='totalSat'>"+totalSat.toFixed(2)+
        "</td><td id='totalAmountSat'>"+totalAmountSat+
        "</td><td id='gTotalAmountSat'>"+gTotalAmountSat+"</td></tr>";

    }

    //@Sun 66%

    sun();

    function sun(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSun= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>Sun @ 66%</td>";

        //vamos dia por dia
        for (let i=0; i<= days_difference; i++){

            let gridDate= date1.setDate(date1.getDate()+valor);
            let gridDateF= formatoFecha(gridDate,1);
            let dato="";
            let formHRS=0;
            let idForm=0;
            let formRefServ=1;
            let isBH=0;
            let payTypeServ="";
            let catServ="";
            let dateStart="";
            let dateFinish="";
            let startHour="";
            let finishHour="";

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
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
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

                //Son horas asignadas por el usuario o por el GESAD?
                formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);
                
                switch(formHrsAssignType){

                    case 0:

                        if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isSunday==0 ){

                            //Cálculo de horas
                            dateStart= new Date(empHoursArray[x].formLabDateStart);
                            dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                            var totalHrsShift = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            if(startFinishSameDay==1){

                                dateFinish.setHours(0);
                                dateFinish.setMinutes(0);
                            }

                            var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            idForm= empHoursArray[x].idForm;
                            formHRS= diff;
                            
                            // no existe array con las horas que exeden de los domingos entran como normales
                            if(startFinishSameDay==1){
                                
                                //sunHoursArray[gridDateF]= totalHrsShift-formHRS;
                            }
                        }
                        
                        if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && isSunday==0){

                            //Cálculo de horas
                            dateStart= new Date(empHoursArray[x].formLabDateStart);
                            dateFinish= new Date(empHoursArray[x].formLabDateFinish);

                            var totalHrsShift = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            if(startFinishSameDay==1){

                                dateFinish.setHours(0);
                                dateFinish.setMinutes(0);
                            }

                            var diff = ( dateFinish.getTime()- dateStart.getTime()) / 3600000;

                            idForm= empHoursArray[x].idForm;
                            formHRS= diff;

                            // no existe array con las horas que exeden de los domingos entran como normales
                            if(startFinishSameDay==1){
                                
                                //sunHoursArray[gridDateF]= totalHrsShift-formHRS;
                            }

                        }

                        if(gridDateF== formLabDateStartF && isSunday !=0){

                            Object.keys(sunHoursArray).forEach((key) => {
                                // console.log('Key is: ' + key);
                                // console.log('Value is: ' + extraHoursArray[key]);

                                if(gridDateF==key){

                                    formHRS= sunHoursArray[key];
                                }

                            });

                        }

                        break;

                    case 1:

                        formHRS= parseFloat(empHoursArray[x].formHRS)

                        break;
                } 
            }

            totalSun=totalSun+parseFloat(formHRS);

            formHRS== 0? "": dato=formHRS.toFixed(2);

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=6"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountSun= 0.66 * hourlyRate;
        totalAmountSun= totalAmountSun.toFixed(2);
        gTotalAmountSun= totalAmountSun * totalSun;
        gTotalAmountSun= gTotalAmountSun.toFixed(2);

        html +="<td id='totalSun'>"+totalSun.toFixed(2)+
        "</td><td id='totalAmountSun'>"+totalAmountSun+
        "</td><td id='gTotalAmountSun'>"+gTotalAmountSun+"</td></tr>";

    }

    //@NR 33%

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
            let startHour="";
            let finishHour="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let isSunday=formatoFecha(gridDate,2)

            //es Domingo??
            let dayOfTheWeekNumber= formatoFecha(gridDate,2)

            let isWeekEnd= 0;

            if(dayOfTheWeekNumber==0 || dayOfTheWeekNumber==6){

                isWeekEnd= 1;
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
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

                //Contamos las horas nocturnas (de 20h a 8h)
                let NRHours=0;

                //Son horas asignadas por el usuario o por el GESAD?
                formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);
                
                switch(formHrsAssignType){

                    case 0:

                        //console.log(dateStart)
                        NRHours= hrsInRange('night', dateStart, dateFinish, 'NR/SDA', 'nr');

                        if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && NRHours>0 ){

                            idForm= empHoursArray[x].idForm;
                            formHRS= NRHours;

                            //totalNR=totalNR+parseFloat(formHRS);

                            console.log(gridDateF + " -night/Normal: "+ formHRS)

                            let acumulado=0;

                            //revisamos si ya habia horas ese dia
                            if(acumuladorHRS[gridDateF]){

                                acumulado = acumuladorHRS[gridDateF];
                            }

                            formHRS= formHRS + acumulado
                            
                            dato=formHRS.toFixed(2);

                            acumuladorHRS[gridDateF]= formHRS;

                        }
                        
                        if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && NRHours>0 ){

                            idForm= empHoursArray[x].idForm;
                            formHRS= NRHours;
                           
                            //totalNR=totalNR+parseFloat(formHRS);

                            console.log(gridDateF + " -night/FR: "+ formHRS)

                            let acumulado=0;

                            //revisamos si ya habia horas ese dia
                            if(acumuladorHRS[gridDateF]){

                                acumulado = acumuladorHRS[gridDateF];
                            }

                            formHRS= formHRS + acumulado
                            //console.log(gridDateF + " "+ formHRS + " "+ acumulado + " " + pasa)
                            dato=formHRS.toFixed(2);

                            acumuladorHRS[gridDateF]= formHRS;

                        }
                        
                        break;

                    case 1:

                    formHRS= parseFloat(empHoursArray[x].formHRS)

                        break;
                }
            }

            totalNR=totalNR+parseFloat(formHRS);

            formHRS== 0? "": dato=formHRS.toFixed(2);

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=7"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountNR= 0.33 * hourlyRate;
        totalAmountNR= totalAmountNR.toFixed(2);
        gTotalAmountNR= totalAmountNR * totalNR;
        gTotalAmountNR= gTotalAmountNR.toFixed(2);

        html +="<td id='totalNR'>"+totalNR.toFixed(2)+
        "</td><td id='totalAmountNR'>"+totalAmountNR+
        "</td><td id='gTotalAmountNR'>"+gTotalAmountNR+"</td></tr>";

    }

    //Allowances Total
    allowancesTotal();

    function allowancesTotal(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }


        gAllowancesTotal= parseFloat(gTotalAmountSat) + parseFloat(gTotalAmountSun) + parseFloat(gTotalAmountNR);
        gAllowancesTotal= gAllowancesTotal.toFixed(2);

        html +="<td class='boldStyle orangeBG'>Total</td><td class='boldStyle orangeBG'></td><td class='boldStyle orangeBG' id='gAllowancesTotal'>"+gAllowancesTotal+"</td></tr>";
    }

    //@SDA 5%

    sda();

    function sda(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSDA= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>SDA @ 5%</td>";

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
            let startHour="";
            let finishHour="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let dayOfTheWeekNumber= formatoFecha(gridDate,2)

            let isWeekEnd= 0;

            if(dayOfTheWeekNumber==0 || dayOfTheWeekNumber==6){

                isWeekEnd= 1;
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
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

                //Contamos las horas nocturnas (de 20h a 8h)

                let SDAHours=0;

                SDAHours= hrsInRange('day', dateStart, dateFinish, 'NR/SDA', 'sda');

                //Son horas asignadas por el usuario o por el GESAD?
                formHrsAssignType= parseInt(empHoursArray[x].formHrsAssignType);

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);
                
                switch(formHrsAssignType){

                    case 0:

                        if(gridDateF== formLabDateStartF && payTypeServ=="Normal"){

                            idForm= empHoursArray[x].idForm;
                            formHRS= formHRS+SDAHours;

                            console.log(gridDateF + " -day/Normal: "+ formHRS)

                        }
                        
                        if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR"){

                            idForm= empHoursArray[x].idForm;
                            formHRS= formHRS+SDAHours;

                            console.log(gridDateF + " -day/FR: "+ formHRS)

                        }

                        break;

                    case 1:

                        formHRS= parseFloat(empHoursArray[x].formHRS)

                        break;
                }
            }

            totalSDA=totalSDA+parseFloat(formHRS);

            formHRS== 0? "": dato=formHRS.toFixed(2);

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=8"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountSDA= 0.05 * hourlyRate;
        totalAmountSDA= totalAmountSDA.toFixed(2);
        gTotalAmountSDA= totalAmountSDA * totalSDA;
        gTotalAmountSDA= gTotalAmountSDA.toFixed(2);

        html +="<td id='totalSDA'>"+totalSDA.toFixed(2)+
        "</td><td id='totalAmountSDA'>"+totalAmountSDA+
        "</td><td id='gTotalAmountSDA'>"+gTotalAmountSDA+"</td></tr>";

    }

    //@OT SDA 5%

    otsda();

    function otsda(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalOTSDA= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>OT SDA @ 5%</td>";

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
            let startHour="";
            let finishHour="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let dayOfTheWeekNumber= formatoFecha(gridDate,2)

            let isWeekEnd= 0;

            if(dayOfTheWeekNumber==0 || dayOfTheWeekNumber==6){

                isWeekEnd= 1;
            }

            for(x in empHoursArray){

                let formLabDateStartF= formatoFecha(empHoursArray[x].formLabDateStart,1);
                let formLabDateFinishF= formatoFecha(empHoursArray[x].formLabDateFinish,1);
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

                //Contamos las horas nocturnas (de 20h a 8h)

                let OTSDAHours=0;

                OTSDAHours= hrsInRange('day', dateStart, dateFinish, 'OTSDA', 'otsda');

                //Empieza y termina el mismo dia su turno?
                let startFinishSameDay= 0;
                formLabDateStartF != formLabDateFinishF? startFinishSameDay= 1:"";
                startFinishSameDay=parseInt(startFinishSameDay);
                
                switch(formHrsAssignType){

                    case 0:

                    if(gridDateF== formLabDateStartF){

                            idForm= empHoursArray[x].idForm;
                            formHRS= OTSDAHours;
                    }                   

                        // if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isWeekEnd==1 ){

                        //     idForm= empHoursArray[x].idForm;
                        //     formHRS= OTSDAHours;

                        //     console.log(gridDateF + " -day/Normal/WeekEnd: "+ formHRS)

                        // }
                        
                        // if(gridDateF== formLabDateStartF && payTypeServ=="Normal" && isBH==1){

                        //     idForm= empHoursArray[x].idForm;
                        //     formHRS= OTSDAHours;

                        //     console.log(gridDateF + " -day/Normal/BankH: "+ formHRS)

                        // }
                        
                        // if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR" && isWeekEnd==1){

                        //     idForm= empHoursArray[x].idForm;
                        //     formHRS= OTSDAHours;

                        //     console.log(gridDateF + " -day/FR/WeekEnd: "+ formHRS)

                        // }
                        
                        // if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="FR"){

                        //     idForm= empHoursArray[x].idForm;
                        //     formHRS= OTSDAHours;

                        //     console.log(gridDateF + " -day/FR/BankH: "+ formHRS)
                        // }

                        // if(gridDateF== formLabDateStartF && payTypeServ=="Extra" && catServ=="OT" && isBH==1){

                        //     idForm= empHoursArray[x].idForm;
                        //     formHRS= OTSDAHours;

                        //     console.log(gridDateF + " -day/FR/OT/BankH: "+ formHRS)
                        // }

                        break;

                    case 1:

                        formHRS= parseFloat(empHoursArray[x].formHRS)

                        break;
                }
            }

            totalOTSDA=totalOTSDA+parseFloat(formHRS);

            formHRS== 0? "": dato=formHRS.toFixed(2);

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=9"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            ">"+dato+"</td>";
            valor=1;
        }

        //html +="<td id='totalExtraHRSFR'>"+totalExtraHRSDT+"</td><td></td><td></td></tr>";

        let totalAmountOTSDA= 0.05 * hourlyRate;
        totalAmountOTSDA= totalAmountOTSDA.toFixed(2);
        gTotalAmountOTSDA= totalAmountOTSDA * totalOTSDA;
        gTotalAmountOTSDA= gTotalAmountOTSDA.toFixed(2);

        html +="<td id='totalOTSDA'>"+totalOTSDA.toFixed(2)+
        "</td><td id='totalAmountOTSDA'>"+totalAmountOTSDA+
        "</td><td id='gTotalAmountOTSDA'>"+gTotalAmountOTSDA+"</td></tr>";

    }

    //SDA OTSDA Totals Total
    SDAOTSDATotals();

    function SDAOTSDATotals(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        let dayBColor="#e0e0e0";

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }


        gSDAOTSDATotals= parseFloat(gTotalAmountSDA) + parseFloat(gTotalAmountOTSDA) ;
        gSDAOTSDATotals= gSDAOTSDATotals.toFixed(2);

        html +="<td class='boldStyle orangeBG'>Total</td><td class='boldStyle orangeBG'></td><td class='boldStyle orangeBG' id='gSDAOTSDATotals'>"+gSDAOTSDATotals+"</td></tr>";
    }

    //SL header
    SLHeader();

    function SLHeader(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td id='totalSLInd'>"+totalSLInd+"</td><td></td><td>SL</td></tr>";
    }


    //Total Hrs
    totalHrsRow();

    function totalHrsRow(){

        date1= new Date(ini); 
        date2= new Date(end);

        totalHrsSum= totalSLInd + totalSDA + totalNR + totalSun + totalSat - totalExtraHRSFR;
        valor=0;

        html+= "<tr><td>TOTAL HOURS</td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td id='totalHrsSum'>"+totalHrsSum+"</td><td></td><td>Total Hours</td></tr>";
    }

    //@ SL

    SL();

    function SL(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;
        totalSL= 0;

        let acumuladorHRS=[];

        html+= "<tr><td>SI</td>";

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
            let startHour="";
            let finishHour="";

            //es bankholiday?
            for(x in BHArray){

                if(gridDateF== BHArray[x].datebh){
                    
                    isBH=1;
                }
            }

            //es Domingo??
            let dayOfTheWeekNumber= formatoFecha(gridDate,2)

            let isWeekEnd= 0;

            if(dayOfTheWeekNumber==0 || dayOfTheWeekNumber==6){

                isWeekEnd= 1;
            }

            for(x in empHoursArray){

                //Cálculo de horas
                dateStart= new Date(empHoursArray[x].formLabDateStart);
                dateFinish= new Date(empHoursArray[x].formLabDateFinish);

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


                if(gridDateF== formLabDateStartF && payTypeServ=="SL"){

                    idForm= empHoursArray[x].idForm;
                    formHRS= 1;
                    //dato= diff;
                    totalSL=totalSL+parseFloat(formHRS);

                    console.log(gridDateF + " SL: "+ formHRS)
 
                    dato=formHRS.toFixed(2);

                }
            }

            html +="<td tipo=1 formLabDateStart="+gridDateF+
            " hrsType=10"+
            " idForm="+idForm+
            " formRefServ="+formRefServ+
            " formHRS="+formHRS+
            " isBH="+isBH+
            " dateStart="+dateStart+
            " dateFinih="+dateFinish+
            ">"+dato+"</td>";
            valor=1;
        }

        //console.log(totalSL)
        let totalAmountSL= 30 ;
        totalAmountSL= totalAmountSL.toFixed(2);
        gTotalAmountSL= totalAmountSL * totalSL;
        gTotalAmountSL= gTotalAmountSL.toFixed(2);

        html +="<td id='totalSL'>"+totalSL.toFixed(2)+
        "</td><td id='totalAmountSL'>"+30+
        "</td><td id='gTotalAmountSL'>"+gTotalAmountSL+"</td></tr>";

    }

    //SUBST1
    SUBST1();

    function SUBST1(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        html+= "<tr><td>SUBST</td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td>0</td><td></td><td></td></tr>";
    }

    //SUBST2
    SUBST2();

    function SUBST2(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        html+= "<tr><td>SUBST</td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td>0</td><td></td><td></td></tr>";
    }

    //Total SL
    totalSLAmountFn();

    function totalSLAmountFn(){

        date1= new Date(ini); 
        date2= new Date(end);

        valor=0;

        html+= "<tr><td></td>";

        for (let i=0; i<= days_difference; i++){

            html +="<td tipo=0></td>";
            valor=1;
        }

        html +="<td class='boldStyle orangeBG'>Total</td><td class='boldStyle orangeBG'></td><td class='boldStyle orangeBG'>"+gTotalAmountSL+"</td></tr>";
    }

    hoursTable.innerHTML= html;

    console.log(savedHrs)

}

function hrsInRange(shift, startH, finishH, tipo, allowancesType){

    let hrs=0;
    let h1 = startH.getHours();
    let m1 = startH.getMinutes();
    let h2 = finishH.getHours();
    let m2 = finishH.getMinutes();

    let startHF=formatoFecha(startH,1)
    let finishHF=formatoFecha(finishH,1)

    let isBH=0;
    //es bankholiday?
    for(f in BHArray){

        if(finishHF== BHArray[f].datebh){
            
            isBH=1;
        }
    }

    switch(shift){

        case 'day':
            getDayHrs();
            break;
        case 'night':
            getNightHrs();
            break;
    }

    function getDayHrs(){

        //Empieza y termina el mismo dia su turno?
        let startFinishSameDay= 0;
        startHF != finishHF? startFinishSameDay= 1:"";
        startFinishSameDay=parseInt(startFinishSameDay);

        //es domingo??
        let noDiaStart= formatoFecha(startH,2)
        let noDiaFinish= formatoFecha(finishH,2)

        //es finde?
        let isWeekEnd= 0;

        if(noDiaStart==0 || noDiaStart==6){
    
            isWeekEnd= 1;
        }

        if(startFinishSameDay==0){

            if(h1 < 8 && h1 <= 19){

                let from8= new Date(startH);
                from8.setHours(8);
                from8.setMinutes(0);

                let to20= new Date(finishH);
                to20.setHours(h2);
                to20.setMinutes(m2);

                if(tipo=='NR/SDA'){

                    if(noDiaStart==0){

                        hrs= 0;
                        
                    }else{

                        hrs= (to20.getTime()- from8.getTime()) / 3600000;

                    }
                }

            }

            if(h1 < 8 && h2 > 20){

                if(tipo=='NR/SDA'){

                    if(noDiaStart==0){

                        hrs= 0;
                        
                    }else{

                        hrs= 8;

                    }
                }

            } 
            
            if(h1 >= 8 && h2 <= 19){

                let from8= new Date(startH);
                from8.setHours(h1);
                from8.setMinutes(m1);

                let to20= new Date(finishH);
                to20.setHours(h2);
                to20.setMinutes(m2);

                if(tipo=='NR/SDA'){

                    if(noDiaStart==0){

                        hrs=0;
                    }else{
                        
                        hrs= (to20.getTime()- from8.getTime()) / 3600000;
                    }

                }
            }

            if(h1 >= 8 && h2 > 19){

                

                let from8= new Date(startH);
                from8.setHours(h1);
                from8.setMinutes(m1);

                let to20= new Date(finishH);
                to20.setHours(20);
                to20.setMinutes(0);

                if(tipo=='NR/SDA'){

                    if(noDiaStart==0){
                        
                        hrs=0;
                    }else{

                        hrs= (to20.getTime()- from8.getTime()) / 3600000;
                    }

                }
            }

            //buscamos si ya habia un valor anterior

        }

        if(startFinishSameDay==1){

            if(tipo=='NR/SDA'){

                if(h1 > 8 && h1 < 20){

                    let from8= new Date(startH);
                    from8.setHours(h1);
                    from8.setMinutes(m1);

                    let to20= new Date(startH);
                    to20.setHours(20);
                    to20.setMinutes(0);

                    let hrs1= (to20.getTime()- from8.getTime()) / 3600000;

                    let hrs2=0;

                    if(h2 >= 8){

                        let from8f= new Date(finishH);
                        from8f.setHours(h2);
                        from8f.setMinutes(m2);

                        let to20f= new Date(finishH);
                        to20f.setHours(20);
                        to20f.setMinutes(0);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }


                    if(noDiaStart==0 || noDiaStart==6){

                        hrs= 0;
                    }else{

                        hrs= hrs1+hrs2;
                    }

                }

                if(h1 < 8 && h1 < 20){

                    let from8= new Date(startH);
                    from8.setHours(h1);
                    from8.setMinutes(m1);

                    let to20= new Date(startH);
                    to20.setHours(20);
                    to20.setMinutes(0);

                    let hrs1= (to20.getTime()- from8.getTime()) / 3600000;

                    let hrs2=0;

                    if(h2 >= 8 && h2 < 20){

                        let from8f= new Date(finishH);
                        from8f.setHours(h2);
                        from8f.setMinutes(m2);

                        let to20f= new Date(finishH);
                        to20f.setHours(8);
                        to20f.setMinutes(0);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }

                    if(noDiaStart==0){

                        hrs= hrs1;
                    }else{

                        hrs= 0;
                    }
                }

                if(h1 >= 20){

                    let hrs2=0;

                    if(h2 >= 8 && h2 < 20){

                        let from8f= new Date(finishH);
                        from8f.setHours(8);
                        from8f.setMinutes(0);

                        let to20f= new Date(finishH);
                        to20f.setHours(h2);
                        to20f.setMinutes(m2);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }

                    if(noDiaFinish==1){
                        hrs=hrs2;  
                    }else{
                        hrs=0; 
                    }

                }

            }

            if(tipo=='OTSDA'){

                if(h1 > 8 && h1 < 20){

                    let from8= new Date(startH);
                    from8.setHours(h1);
                    from8.setMinutes(m1);

                    let to20= new Date(startH);
                    to20.setHours(20);
                    to20.setMinutes(0);

                    let hrs1= (to20.getTime()- from8.getTime()) / 3600000;

                    let hrs2=0;

                    if(h2 >= 8){

                        let from8f= new Date(finishH);
                        from8f.setHours(h2);
                        from8f.setMinutes(m2);

                        let to20f= new Date(finishH);
                        to20f.setHours(20);
                        to20f.setMinutes(0);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }

                    if(noDiaStart==0 || noDiaStart==6){

                        hrs= hrs1+hrs2;
                    }else{

                        hrs= 0;
                    }

                }

                if(h1 < 8 && h1 < 20){

                    let from8= new Date(startH);
                    from8.setHours(h1);
                    from8.setMinutes(m1);

                    let to20= new Date(startH);
                    to20.setHours(20);
                    to20.setMinutes(0);

                    let hrs1= (to20.getTime()- from8.getTime()) / 3600000;

                    let hrs2=0;

                    if(h2 >= 8 && h2 < 20){

                        let from8f= new Date(finishH);
                        from8f.setHours(h2);
                        from8f.setMinutes(m2);

                        let to20f= new Date(finishH);
                        to20f.setHours(8);
                        to20f.setMinutes(0);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }

                    if(noDiaStart==0){

                        hrs= hrs1;
                    }else{

                        hrs= 0;
                    }
                }

                if(h1 >= 20){

                    let hrs2=0;

                    if(h2 >= 8 && h2 < 20){

                        let from8f= new Date(finishH);
                        from8f.setHours(8);
                        from8f.setMinutes(0);

                        let to20f= new Date(finishH);
                        to20f.setHours(h2);
                        to20f.setMinutes(m2);

                        hrs2= (to20f.getTime()- from8f.getTime()) / 3600000;
                    }

                    if(isWeekEnd==1){

                        if(noDiaFinish==0){
                            hrs=hrs2;  
                        }else{
                            hrs=0; 
                        } 
                    }

                    if(isBH==1){

                        hrs=hrs2;  
                    }

                }

            }


        }

    }

    function getNightHrs(){

        //Empieza y termina el mismo dia su turno?
        let startFinishSameDay= 0;
        startHF != finishHF? startFinishSameDay= 1:"";
        startFinishSameDay=parseInt(startFinishSameDay);

        //es domingo??
        let isSunday= formatoFecha(startH,2)

        if(startFinishSameDay==0){

            if(h1 < 20 && h2 > 20){

                let from20= new Date(startH);
                from20.setHours(20);
                from20.setMinutes(m1);

                let to24= new Date(finishH);
                to24.setHours(h2);
                to24.setMinutes(m2);

                hrs= (to24.getTime()- from20.getTime()) / 3600000;

                //console.log(startHF + " -" + to24 + " -" +startFinishSameDay)
            }

            if(h1 >= 20 && h2 > 20){

                let from20= new Date(startH);
                from20.setHours(h1);
                from20.setMinutes(m1);

                let to24= new Date(finishH);
                to24.setHours(h2);
                to24.setMinutes(m2);

                hrs= (to24.getTime()- from20.getTime()) / 3600000;

                //console.log(startHF + " -" + to24 + " -" +startFinishSameDay)
            } 
            
            if(h1 < 8 && h2 > 8){

                let from0= new Date(startH);
                from0.setHours(h1);
                from0.setMinutes(m1);

                let to8= new Date(finishH);
                to8.setHours(8);
                to8.setMinutes(0);

                hrs= (to8.getTime()- from0.getTime()) / 3600000;

                //console.log(startHF + " -" + to24 + " -" +startFinishSameDay)
            } 
            
            if(h1 < 8 && h2 < 8){

                let from0= new Date(startH);
                from0.setHours(h1);
                from0.setMinutes(m1);

                let to8= new Date(finishH);
                to8.setHours(h2);
                to8.setMinutes(m2);

                hrs= (to8.getTime()- from0.getTime()) / 3600000;

                //console.log(startHF + " -" + to24 + " -" +startFinishSameDay)
            } 

            if(isSunday==0){

                hrs=0;
            }
        }

        if(startFinishSameDay==1){

            //es domingo??
            let isSunday= formatoFecha(startH,2)
            let isSaturday= formatoFecha(finishH,2)

            //isSunday==0? console.log(startH+" es domingo"):""; 

            if(h1 < 20 && h2 < 8){

                let from20= new Date(startH);
                from20.setHours(20);
                from20.setMinutes(0);

                let to24= new Date(startH);
                to24.setHours(24);
                to24.setMinutes(0);

                let hrs1= (to24.getTime()- from20.getTime()) / 3600000;

                let from0= new Date(finishH);
                from0.setHours(0);
                from0.setMinutes(0);

                let to8= new Date(finishH);
                to8.setHours(h2);
                to8.setMinutes(m2);

                let hrs2= (to8.getTime()- from0.getTime()) / 3600000;  

                if(isSunday==0){

                    hrs= hrs2;

                }else{

                    hrs= hrs1+hrs2;
                }

                //si es sabado
                if(isSaturday==6){

                    hrs= hrs1;

                }else{

                    hrs= hrs1+hrs2;
                }
                
            }

            if(h1 >= 20 && h2 > 8){

                let from20= new Date(startH);
                from20.setHours(h1);
                from20.setMinutes(m1);

                let to24= new Date(startH);
                to24.setHours(24);
                to24.setMinutes(0);

                let hrs1= (to24.getTime()- from20.getTime()) / 3600000;

                let from0= new Date(finishH);
                from0.setHours(0);
                from0.setMinutes(0);

                let to8= new Date(finishH);
                to8.setHours(8);
                to8.setMinutes(0);

                let hrs2= (to8.getTime()- from0.getTime()) / 3600000;

                if(isSunday==0){

                    hrs= hrs2;

                }else{

                    hrs= hrs1+hrs2;
                }

                //si es sabado
                // if(isSaturday==6){

                //     hrs= hrs1;

                // }else{

                //     hrs= hrs1+hrs2;
                // }

            }

            //si es sabado no se pone nada
            if(isSunday==6){

                hrs=0;
            }

        }

    }

    return hrs;

}

document.addEventListener('click', function(e) {


    if(e.target.tagName=="TD" && e.target.getAttribute("tipo")==1){

        document.getElementById("idFormEdit").value= e.target.getAttribute("idForm");
        let hrsTypeValue= parseInt(e.target.getAttribute("hrsType"));
        hrsTypeValue= hrsType[hrsTypeValue];
        document.getElementById("hrsTypeEdit").value= hrsTypeValue;  
        document.getElementById("formRefServEdit").value= e.target.getAttribute("formRefServ");
        document.getElementById("formHRSEdit").value= e.target.getAttribute("formHRS");
        document.getElementById("formHrsAssignTypeEdit").value= e.target.getAttribute("formHrsAssignType");   
        document.getElementById("dateStartEdit").value= e.target.getAttribute("dateStart");
        document.getElementById("dateFinishEdit").value= e.target.getAttribute("dateFinish"); 

        // var formLabDateStart = e.target.getAttribute("formLabDateStart");
        // var idForm = e.target.getAttribute("idForm");
        // var formRefServ = e.target.getAttribute("formRefServ");
        // var formHRS = e.target.getAttribute("formHRS");
        // var isBH = e.target.getAttribute("isBH");
        // var startHour = e.target.getAttribute("startHour");
        // var finishHour = e.target.getAttribute("finishHour");
        document.getElementById("greyBackground").style.display="block";
        document.getElementById("hrsEditDiv").style.display="block";

        //alert(formLabDateStart +" idForm: "+idForm+" formRefServ: "+formRefServ +" formHRS: "+formHRS +" isBH: "+isBH+ " startHour: "+ startHour + " finishHour: "+ finishHour);
    }
    
});

document.getElementById("hrsEditDiv_CloseButton").addEventListener("click", hrsEditDiv_CloseButton);

function hrsEditDiv_CloseButton(){

    document.getElementById("greyBackground").style.display="none";
    document.getElementById("hrsEditDiv").style.display="none"; 
}



