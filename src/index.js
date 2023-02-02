const API_key = "3634e102b7a2d3a5181364fdf278bacd";

function loadDailyBoxOffice(date, size) {
    let dateString = date.getFullYear().toString().slice(2);
    dateString += date.getMonth().toString();
    dateString += date.getDay().toString();
    
    if(typeof(size) == "number") {
        size = size.toString();
    }
    
    let url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    
    var xmlReq = new XMLHttpRequest();
    xmlReq.onreadystatechange = function() {
        if(xmlReq.readyState == 4 && xmlReq.status == 200) {
            console.log("API send Data!");
        }
    }
    
    
}