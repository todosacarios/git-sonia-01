let ini="";
let end="";
let formRef="";

window.addEventListener("load", inicio);

function inicio(){

    formRef=document.getElementById("formRef").value;
    ini=document.getElementById("ini").value;
    end=document.getElementById("end").value;
    paintCalendar();  
}

function paintCalendar(){

    let date1=new Date(ini)
    let date2=new Date(end)
    //calculate time difference  
    var time_difference=date2.getTime()-date1.getTime();
    //calculate days difference by dividing total milliseconds in a day  
    var days_difference=time_difference/(1000*60*60*24);

   for (let i=0; i< days_difference; i++){

    
   }
   
}