const API_key = "3634e102b7a2d3a5181364fdf278bacd";

class Parameter {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._type = typeof value;
  }

  get key() {
    return this._key;
  }
  get type() {
    return this._type;
  }
  get value() {
    if (this.type == "string") return this._value;
    else return this._value.toString();
  }
}

function addUrlParam(url, params) {
  if (params.length == 0) return url;

  url += "?";
  url += params[0].key + "=" + encodeURIComponent(params[0].value);
  for (let i = 1; i < params.length; i++) {
    url += "&" + params[i].key + "=" + encodeURIComponent(params[i].value);
  }

  return url;
}

function loadDailyBoxOffice(
  date,
  size = 10,
  multiMovie = "Y",
  onlyKor = true,
  wideAreaCode = "0105000000"
) {
  date = date.slice(2, 4) + date.slice(5, 7) + date.slice(8);

  let params = [
    new Parameter("key", API_key),
    new Parameter("targetDt", date),
    new Parameter("itemPerPage", size),
    new Parameter("multiMovieYn", multiMovie),
    new Parameter("repNationCd", onlyKor),
    new Parameter("wideAreaCd", wideAreaCode),
  ];
  let url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  url = addUrlParam(url, params);

  var xmlReq = new XMLHttpRequest();

  xmlReq.addEventListener(
    "load",
    function () {
      movieListJson = JSON.parse(xmlReq.responseText);
      console.log(movieListJson);
    },
    false
  );

  xmlReq.addEventListener(
    "error",
    function () {
      console.log(JSON.parse(xmlReq.responseText));
    },
    false
  );

  xmlReq.open("GET", url);
  xmlReq.send(null);
}

function onClickDailyBoxoffice() {
  var searchDate = document.querySelector("#searchDate").value;
  var size = document.querySelector("#size").value;
  var movieType = document.querySelector(
    "input[name = movieType]:checked"
  ).value;
  var movieCountry = document.querySelector(
    "input[name = movieCountry]:checked"
  ).value;

  try {
    loadDailyBoxOffice(searchDate, size, movieType, movieCountry);
  } catch (exception) {
    console.log(exception);
  }
}
