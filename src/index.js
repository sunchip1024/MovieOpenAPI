import { APIRequest } from "./APIRequest.js";

const API_key = "3634e102b7a2d3a5181364fdf278bacd";

function loadDailyBoxOffice(
  date,
  size = 10,
  multiMovie = "Y",
  onlyKor = true,
  wideAreaCode = null
) {
  date = date.slice(0, 4) + date.slice(5, 7) + date.slice(8);

  let paramsObj = {
    targetDt: date,
    itemPerPage: size,
    multiMovieYn: multiMovie,
    reqNationCd: onlyKor,
    wideAreaCd: wideAreaCode,
  };

  let url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  
  let movieAPI = APIRequest.JSONAPIRequest(API_key);

  movieAPI.Request.addEventListener(
    "load",
    function () {
      document.querySelector("main").innerText = movieListJson.toString();
    },
    false
  );

  movieAPI.Request.addEventListener(
    "error",
    function () {
      document.querySelector(main).innerText = JSON.parse(
        movieAPI.Request.responText
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
