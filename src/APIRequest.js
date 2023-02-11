export var APIRequest = APIRequest || {};
((APIreq) => {
  let DataEvent = {
    load: new CustomEvent("DataLoad"),
    error: new CustomEvent("DataError"),
  };

  APIreq.DataEvent = Object.freeze({
    load: DataEvent.load,
    error: DataEvent.error,
  });

  // APIKey 객체
  JSONAPIKey = function (key) {
    if (!(key instanceof String)) throw new TypeError("");

    let APIKey = key;

    return Object.freeze({
      key: () => {
        return APIKey;
      },
    });
  };

  APIreq.JSONAPIRequest = function (APIKey) {
    let apiKey = APIreq.JSONAPIKey(APIKey);
    let data = null;

    let req = new XMLHttpRequest();

    function SendUrl(method, url, params, async = true, responseType = "JSON") {
      let apiUrl = addUrlParam(url, params);

      req.addEventListener(
        "load",
        function () {
          req.responseType = responseType;
          data = req.responseText;
          document.dispatchEvent(APIreq.DataEvent.load);
        },
        false
      );

      req.addEventListener(
        "error",
        () => document.dispatchEvent(APIreq.DataEvent.error),
        false
      );

      req.open(method, apiUrl, async);
      req.send(null);

      return Object.freeze({
        send: (method, url, params, async = true, responseType = "JSON") => {
          SendUrl(method, url, params, async, responseType);
        },
        get: () => {
          return data;
        },
        Request: req,
      });
    }
  };

  function addUrlParam(url, params) {
    params = JSON.parse(params);
    if (params.length == 0) return url;

    url += "?";
    for (let key in Object.keys(params)) {
      if (params[key] == null) continue;

      url += key + "=" + encodeURIComponent(params[key]) + "&";
    }

    url = url.slice(0, -1);
    return url;
  }
})(APIRequest);
