import { APIRequest } from "./APIRequest.js";

const API_key = "3634e102b7a2d3a5181364fdf278bacd";
let movieAPI = APIRequest.JSONAPIRequest(API_key);

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

  movieAPI.send("GET", url, paramsObj);

  let textSpace = document.getElementsByTagName("main");
  textSpace.addEventListener(
    "DataLoad",
    () => (textSpace.innerText = movieAPI.get()),
    false
  );
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
