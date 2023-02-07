const API_key = "3634e102b7a2d3a5181364fdf278bacd";

var APIRequest = APIRequest || {};
((APIreq) => {
  let APIKey = null;

  APIreq.SetAPIKey = function (key) {
    if (key == null) return;
    if (APIKey != null) return;
    APIKey = key;
  };

  APIreq.XMLHttpRequestParam = function (key, value) {
    let _key = key;
    let _value = value;

    return Object.freeze({
      key: () => {
        return _key;
      },
      value: () => {
        return _value;
      },
      type: () => {
        return typeof _value;
      },
    });
  };

  APIreq.XMLHttpRequestEvent = function () {
    let EventCallback = {
      abort: null,
      error: null,
      load: null,
      loadstart: null,
      loadend: null,
      progress: null,
      readystatechange: null,
      timeout: null,
    };

    return Object.freeze({
      setEventCallback: function (event, callback) {
        if (event in EventCallback) EventCallback[event] = callback;
      },

      getEventCallback: function (event) {
        return event in EventCallback ? EventCallback[event] : null;
      },
    });
  };

  function addUrlParam(url, params) {
    if (params.length == 0) return url;

    url += "?";
    url += params[0].key + "=" + encodeURIComponent(params[0].value);
    for (let i = 1; i < params.length; i++) {
      url += "&" + params[i].key + "=" + encodeURIComponent(params[i].value);
    }

    return url;
  }
})(APIRequest);

function loadDailyBoxOffice(
  date,
  size = 10,
  multiMovie = "Y",
  onlyKor = true,
  wideAreaCode = ""
) {
  date = date.slice(0, 4) + date.slice(5, 7) + date.slice(8);

  let params = [
    new Parameter("key", API_key),
    new Parameter("targetDt", date),
    new Parameter("itemPerPage", size),
    new Parameter("multiMovieYn", multiMovie),
    new Parameter("repNationCd", onlyKor),
  ];

  if (wideAreaCode != "")
    params.push(new Parameter("wideAreaCd", wideAreaCode));

  let url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  url = addUrlParam(url, params);

  var xmlReq = new XMLHttpRequest();

  xmlReq.addEventListener(
    "load",
    function () {
      movieListJson = JSON.parse(xmlReq.responseText);
      document.querySelector("main").innerText = movieListJson.toString();
    },
    false
  );

  xmlReq.addEventListener(
    "error",
    function () {
      document.querySelector(main).innerText = JSON.parse(
        xmlReq.responseText
      ).toString();
    },
    false
  );

  xmlReq.open("GET", url, true);
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
