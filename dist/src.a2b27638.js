// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/APIRequest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIRequest = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var APIRequest = APIRequest || {};
exports.APIRequest = APIRequest;
(function (APIreq) {
  // APIKey 객체
  JSONAPIKey = function JSONAPIKey(key) {
    if (!(key instanceof String)) throw new TypeError("");
    var APIKey = key;
    return Object.freeze({
      key: function key() {
        return APIKey;
      }
    });
  };

  // API URL 요청에 필요한 키와 값을 저장하는 객체
  JSONAPIRequestParam = function JSONAPIRequestParam(key, value) {
    var _key = key instanceof String ? key : key.toString();
    var _value = value;
    return Object.freeze({
      key: function key() {
        return _key;
      },
      value: function value() {
        return _value;
      },
      type: function type() {
        return _typeof(_value);
      }
    });
  };

  // API URL 요청 시 이벤트 콜백함수를 저장하는 객체
  APIreq.JSONAPIRequestEvent = function () {
    var EventCallback = {
      abort: null,
      error: null,
      load: null,
      loadstart: null,
      loadend: null,
      progress: null,
      readystatechange: null,
      timeout: null
    };
    return Object.freeze({
      setEventCallback: function setEventCallback(event, callback) {
        if (event in EventCallback) EventCallback[event] = callback;
      },
      getEventCallback: function getEventCallback(event) {
        return event in EventCallback ? EventCallback[event] : null;
      },
      getEventList: function getEventList() {
        return Object.keys(EventCallback);
      }
    });
  };
  APIreq.JSONAPIRequest = function (APIKey) {
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var apiKey = APIreq.JSONAPIKey(APIKey);
    var req = new XMLHttpRequest();
    var _iterator = _createForOfIteratorHelper(event.getEventList()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var eventType = _step.value;
        req.addEventListener(eventType, event.getEventCallback(eventType), false);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return Object.freeze({
      load: function load(params, method) {
        var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var paramObj = JSON.parse(params);
        var paramList = [];
        for (var _i = 0, _Object$keys = Object.keys(paramObj); _i < _Object$keys.length; _i++) {
          var param = _Object$keys[_i];
          paramList.push(new APIreq.JSONAPIRequestParam(param, paramObj[param]));
        }
        var apiUrl = addUrlParam(url, paramList);
        var data = null;
        req.onreadystatechange = function () {
          if (req.readyState == 4 && req.status == 200) data = req.responseText;
        };
        req.open(method, apiUrl, async);
        req.send(null);
        return data;
      }
    });
  };
  function addUrlParam(url, params) {
    if (params.length == 0) return url;
    url += "?";
    for (var i = 0; i < params.length; i++) {
      if (params[i].value == null) continue;
      url += params[i].key + "=" + encodeURIComponent(params[i].value) + "&";
    }
    url = url.slice(0, -1);
    return url;
  }
})(APIRequest);
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _APIRequest = require("./APIRequest.js");
var API_key = "3634e102b7a2d3a5181364fdf278bacd";
function loadDailyBoxOffice(date) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var multiMovie = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Y";
  var onlyKor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var wideAreaCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  date = date.slice(0, 4) + date.slice(5, 7) + date.slice(8);
  var paramsObj = {
    targetDt: date,
    itemPerPage: size,
    multiMovieYn: multiMovie,
    reqNationCd: onlyKor,
    wideAreaCd: wideAreaCode
  };
  var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  var data = null;
  var BoxOfficeAPIEvent = _APIRequest.APIRequest.JSONAPIRequestEvent();
  BoxOfficeAPIEvent.setEventCallback("load", function () {
    document.querySelector("main").innerText = data;
  });
  var BoxOfficeAPI = _APIRequest.APIRequest.JSONAPIRequest();
  var xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener("load", function () {
    movieListJson = JSON.parse(xmlReq.responseText);
    document.querySelector("main").innerText = movieListJson.toString();
  }, false);
  xmlReq.addEventListener("error", function () {
    document.querySelector(main).innerText = JSON.parse(xmlReq.responseText).toString();
  }, false);
  xmlReq.open("GET", url, true);
  xmlReq.send(null);
}
function onClickDailyBoxoffice() {
  var searchDate = document.querySelector("#searchDate").value;
  var size = document.querySelector("#size").value;
  var movieType = document.querySelector("input[name = movieType]:checked").value;
  var movieCountry = document.querySelector("input[name = movieCountry]:checked").value;
  try {
    loadDailyBoxOffice(searchDate, size, movieType, movieCountry);
  } catch (exception) {
    console.log(exception);
  }
}
},{"./APIRequest.js":"src/APIRequest.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41947" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map