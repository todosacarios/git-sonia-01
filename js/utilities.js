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
        var monthName= monthNames[date.getMonth()]
        var hour= date.getHours();
        var min= date.getMinutes();
    
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
    
        switch(modo){
            case 1:
                //2022-12-01
                var miFecha = year + "-" + month + "-" + day;
                break;
            case 2:
                //0 domingo
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
                //01 
                var miFecha = day
                break;
            case 6:
                //Mon
                var miFecha = weekDayName[weekDay];
                break;
            case 7:
                //28 Dec
                var miFecha = day + " " + monthName;
                break;
            case 8:
                //01 Dec 2022 12:00
                var miFecha = day + " " + monthName + " " + year + " " + hour + ":" + min;
                break;
        }
        
        return miFecha;
}