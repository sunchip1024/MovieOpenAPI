const API_key = "3634e102b7a2d3a5181364fdf278bacd";

class Parameter {
    #key;
    #value;
    #type;
    
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.type = typeof(value);
    }
    
    get key() { return this.key; }
    get type() { return this.type; }
    get value() { 
        if(type == "number")
            return this.value.toString();
        else
            return this.value; 
    }
    
}

function addUrlParam(url, params) {
    if(params.length == 0)  return url;
    
    url += "?";
    url += params[0].key + "=" + params[0].value;
    for(let i=1; i < params.length; i++) {
        url += "&" + params[i].key + "=" + params[i].value;
    }
    
    return url;
}

function loadDailyBoxOffice(date, size = 10, multiMovie = true, onlyKor = true, wideAreaCode = "0105000000") {
    let dateString = date.getFullYear().toString().slice(2);
    dateString += date.getMonth().toString();
    dateString += date.getDay().toString();
    
    if(typeof(size) == "number")
        size = size.toString();
    
    let params = [
        new Parameter("key", API_key),
        new Parameter("targetDt", dateString),
        new Parameter("itemPerPage", size),
        new Parameter("multiMovieYn", (multiMovie? "Y" : "N")),
        new Parameter("repNationCd", (onlyKor? "K" : "F")),
        new Parameter("wideAreaCd", wideAreaCode)
    ];
    let url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    url = addUrlParam(url, params);
    
    var xmlReq = new XMLHttpRequest();
    xmlReq.addEventListner("load", function() {
        movieListJson = JSON.parse(xmlReq.responseText);
        console.log(movieListJson);
    }, false);
    
    xmlReq.open("GET", url);
    xmlReq.send(null);
}