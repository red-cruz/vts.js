/*!
* Vts.js - Validate then submit.
* (c) 2024 Raymark Eduarte Dela Cruz
* Released under the MIT License.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vts"] = factory();
	else
		root["Vts"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Vts)
});

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(147);
;// CONCATENATED MODULE: ./src/utils/getResponseData.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check
/**
 * Gets the data from the response.
 *
 * @param {Response} response The response object.
 * @returns {Promise<any>} A promise that resolves with the data from the response or rejects with an error.
 * @async
 */
function getResponseData_getResponseData(_x) {
  return _getResponseData.apply(this, arguments);
}
function _getResponseData() {
  _getResponseData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
    var contentType, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          contentType = response.headers.get('Content-Type');
          if (contentType) {
            _context.next = 4;
            break;
          }
          throw new Error('Content-Type header not found in the response');
        case 4:
          data = null;
          if (!contentType.includes('application/json')) {
            _context.next = 11;
            break;
          }
          _context.next = 8;
          return response.json();
        case 8:
          data = _context.sent;
          _context.next = 15;
          break;
        case 11:
          if (!(contentType.includes('text/html') || contentType.includes('text/plain'))) {
            _context.next = 15;
            break;
          }
          _context.next = 14;
          return response.text();
        case 14:
          data = _context.sent;
        case 15:
          return _context.abrupt("return", Promise.resolve(data));
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", Promise.reject(_context.t0));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return _getResponseData.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/base/Form.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Form_typeof(o) { "@babel/helpers - typeof"; return Form_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Form_typeof(o); }
function Form_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Form_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == Form_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(Form_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function Form_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function Form_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Form_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Form_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check


/** @type {import('../types/base/form').default} */
var vtsForm = {
  isFormValid: function isFormValid() {
    return this.form.checkValidity();
  },
  submit: function submit() {
    var _this = this;
    return Form_asyncToGenerator( /*#__PURE__*/Form_regeneratorRuntime().mark(function _callee() {
      var data, response, promiseResolved, ajax, form, _this$ajax$request$si;
      return Form_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            promiseResolved = true;
            ajax = _this.ajax;
            form = _this.form;
            _context.prev = 3;
            // call beforesend callback function
            vtsFormBeforeSend.call(_this);

            // fetch
            _context.next = 7;
            return fetch(new Request(_this.ajax.action, _this.ajax.request));
          case 7:
            response = _context.sent;
            if (response.ok) {
              _context.next = 10;
              break;
            }
            throw response;
          case 10:
            _context.next = 12;
            return getResponseData_getResponseData(response);
          case 12:
            data = _context.sent;
            // call success callback function
            ajax.success(data, response, form);
            _context.next = 28;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);
            data = _context.t0;
            response = null;

            // Reinitialize abort controller if aborted
            if ((_this$ajax$request$si = _this.ajax.request.signal) !== null && _this$ajax$request$si !== void 0 && _this$ajax$request$si.aborted) {
              // @ts-ignore
              _this.ajax.abortController = new AbortController();
            }

            // Check if the error is an instance of Response
            if (!(_context.t0 instanceof Response)) {
              _context.next = 26;
              break;
            }
            _context.next = 24;
            return getResponseData_getResponseData(_context.t0);
          case 24:
            data = _context.sent;
            response = _context.t0;
          case 26:
            promiseResolved = false;
            // Call the error callback function with the appropriate data
            ajax.error(data, response, form);
          case 28:
            // complete
            ajax.complete(data, response, form);
            return _context.abrupt("return", promiseResolved ? Promise.resolve({
              data: data,
              response: response,
              form: form
            }) : Promise.reject({
              data: data,
              response: response,
              form: form
            }));
          case 30:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 16]]);
    }))();
  }
};

/**
 * @this {import('../Vts').default}
 */
function vtsFormBeforeSend() {
  // @ts-ignore
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;
  this.ajax.request.body = new FormData(this.form);

  // call beforeSend config and assign the configured request
  this.ajax.beforeSend(this.ajax.request, this.ajax.abortController, this.form);
  var vMethod = this.ajax.request.method || 'get';
  var formData = this.ajax.request.body;
  if (Form_typeof(formData) === 'object' && formData) switch (vMethod.toLocaleLowerCase()) {
    case 'get':
    case 'delete':
      var query = new URLSearchParams(formData.toString());
      this.ajax.action = "".concat(this.ajax.action, "/?").concat(query);
      break;
    case 'put':
    case 'patch':
      // @ts-ignore
      this.ajax.request.headers['Content-Type'] = 'application/json';
      this.ajax.request.body = formDataToJSON(formData);
      break;
    default:
      this.ajax.request.body = formData;
      break;
  }
}

/**
 * @param {{}} obj
 * @param {*} path
 * @param {FormDataEntryValue} value
 * @returns {{}}
 */
function deepSet(obj, path, value) {
  if (Object(obj) !== obj) return obj; // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path.slice(0, -1).reduce(
  // Iterate all of them except the last one
  function (a, c, i) {
    return Object(a[c]) === a[c] // Does the key exist and is its value an object?
    ?
    // Yes: then follow that path
    a[c] :
    // No: create the key. Is the next key a potential array-index?
    a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] // Yes: assign a new array object
    : {};
  },
  // No: assign a new plain object
  obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
  return obj; // Return the top-level object to allow chaining
}

/**
 * @description
 * @param {*} formData
 * @returns {String}
 */
function formDataToJSON(formData) {
  var json = {};
  var _iterator = _createForOfIteratorHelper(formData),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        path = _step$value[0],
        value = _step$value[1];
      deepSet(json, path, value);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return JSON.stringify(json);
}
/* harmony default export */ const Form = (vtsForm);
;// CONCATENATED MODULE: ./src/utils/VtsFormValidator.js
function VtsFormValidator_typeof(o) { "@babel/helpers - typeof"; return VtsFormValidator_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, VtsFormValidator_typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == VtsFormValidator_typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != VtsFormValidator_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != VtsFormValidator_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// @ts-check
/**
 * Utility class for form type validation and instance checking.
 * @abstract
 */
var VtsFormValidator = /*#__PURE__*/function () {
  function VtsFormValidator() {
    _classCallCheck(this, VtsFormValidator);
  }
  _createClass(VtsFormValidator, null, [{
    key: "validateForm",
    value:
    /**
     * Retrieves the form element with the provided form ID and checks its validity.
     *
     * @param {string|HTMLElement} form - The ID of the form or the form element to retrieve and check.
     * @returns {HTMLFormElement} The valid HTML form element.
     * @throws {TypeError} Throws a TypeError if the form element is not found or is not a valid HTML form element.
     */
    function validateForm(form) {
      var _form;
      if (typeof form === 'string') {
        _form = document.getElementById(form);

        // Check if form element exists
        if (!_form) {
          throw new TypeError("The form element with ID \"".concat(form, "\" was not found."));
        }
      } else _form = form;
      return checkHTMLFormInstance(_form);
    }

    /**
     * Checks and gets the field element in the form.
     *
     * @param {HTMLFormElement} form - The HTML form element.
     * @param {string} fieldName - The name of the field element.
     * @returns {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null} - The validated field element.
     */
  }, {
    key: "validateField",
    value: function validateField(form, fieldName) {
      var field = form.querySelector("[name=\"".concat(fieldName.split(' ')[0], "\"]"));

      // Check if field element is a valid field element
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
        return null;
      }
      return field;
    }
  }]);
  return VtsFormValidator;
}();
/**
 * Check if form element is a valid HTML form element and returns the form with the novalidate property set to `true`
 *
 * @param {HTMLElement} element
 * @returns {HTMLFormElement}
 * @throws {TypeError} Throws a TypeError if the form element is not a valid HTML form element.
 */

function checkHTMLFormInstance(element) {
  if (!(element instanceof HTMLFormElement)) {
    var formId = element === null || element === void 0 ? void 0 : element.getAttribute('id');
    var msg = (formId ? "with ID \"".concat(formId, "\"") : "\"".concat(element === null || element === void 0 ? void 0 : element.tagName, "\"")) || '';
    throw new TypeError("The element ".concat(msg, " is not a valid HTML form element."));
  }
  element.noValidate = true;
  return element;
}
;// CONCATENATED MODULE: ./src/utils/getEventType.js
// @ts-check
/**
 * @param {string} fieldType
 * @param {import('../types/config/rules').VtsEventTypes|undefined} ruleEventType
 * @returns {string}
 */
function getEventType(fieldType, ruleEventType) {
  var changeEvents = ['radio', 'select-one', 'select-multiple', 'checkbox', 'file', 'range'];

  // Update event to 'change' based on the field type
  var eventType = changeEvents.includes(fieldType) ? 'change' : 'input';

  // Update event based on the specified rule
  eventType = ruleEventType || eventType;
  return eventType;
}
;// CONCATENATED MODULE: ./src/base/Events.js
function Events_typeof(o) { "@babel/helpers - typeof"; return Events_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Events_typeof(o); }
function Events_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Events_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == Events_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(Events_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function Events_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function Events_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Events_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Events_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check


/** @type {import('../types/base/events').default} */
var vtsEvents = {
  _addEventListeners: function _addEventListeners() {
    var _this = this;
    // Form
    var form = this.form;
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref = Events_asyncToGenerator( /*#__PURE__*/Events_regeneratorRuntime().mark(function _callee(e) {
        var formClass, wasValidated, shouldListen;
        return Events_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              if (_this.stopPropagation) {
                e.stopPropagation();
              }
              formClass = _this["class"].form;
              wasValidated = form.classList.contains(formClass);
              shouldListen = _this.listen;
              if (!shouldListen && !wasValidated) {
                _this._addFieldListener();
              }
              _this.form.classList.add(formClass);
              _this.validate();
              if (_this.isFormValid() && !_this.halt) {
                _this.submit()["catch"](function () {});
              }
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Fields
    var shouldListen = this.listen;
    shouldListen && this._addFieldListener();
  },
  _addFieldListener: function _addFieldListener() {
    var _this2 = this;
    this.fields.forEach(function (field) {
      var cstmAttr = 'vts_listener_exists';
      var listenerExists = field.dataset[cstmAttr];
      if (listenerExists) return;
      field.dataset[cstmAttr] = 'true';
      var rules = _this2._getFieldRules(field);
      var eventType = getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
      field.addEventListener(eventType, function () {
        _this2._validate(field);
      });
    });
  }
};
/* harmony default export */ const Events = (vtsEvents);
;// CONCATENATED MODULE: ./src/defaults/defaultMsg.js
var defaultMsg = {
  after: '{:label} must be {:offset} after {:targetLabel}.',
  afterOrEqual: '{:label} must be {:offset} after or equal to {:targetLabel}.',
  before: '{:label} must be before {:targetValue}.',
  beforeOrEqual: '{:label} must be before or equal to {:targetValue}.',
  between: '{:label} must be between {:minValue} and {:maxValue}.',
  checking: 'Checking... {:label}',
  differentFrom: '{:label} must be different from {:targetValue}.',
  endsWith: '{:label} must end with {:endsWith}.',
  equalTo: '{:label} must be equal to {:targetLabel}.',
  inArray: '{:label} must be one of the following: {:values}.',
  lowercase: '{:label} must be lowercase.',
  max: '{:label} must be less than or equal to {:max}.',
  min: '{:label} must be greater than or equal to {:min}.',
  notInArray: '{:label} must not be one of the following: {:values}.',
  startsWith: '{:label} must start with {:startsWith}.',
  size: '{:label} must be exactly {:size} characters long. You are currently using {:length} characters.',
  uppercase: '{:label} must be uppercase.',
  valid: '',
  required: 'This field is required.',
  requiredIf: '{:label} is required if {:targetLabel} has a value.'
};
/* harmony default export */ const defaults_defaultMsg = (defaultMsg);
;// CONCATENATED MODULE: ./src/utils/attachEvent.js


/**
 * @param {string} ruleName
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} targetField
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 */
function attachEvent(ruleName, targetField, field, rules) {
  var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
  var cstmAttr = "vts_".concat(ruleName, "_listener_exists");
  var listenerExists = targetField.dataset[cstmAttr];
  var eventType = getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
  if (listenerExists || !eventType) return;
  targetField.addEventListener(eventType, function (event) {
    field.dispatchEvent(new Event(eventType));
    cb(event);
  });
  targetField.dataset[cstmAttr] = 'true';
}
;// CONCATENATED MODULE: ./src/utils/getFieldLabel.js
// @ts-check
/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {string|undefined} ruleLabel
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {string} - The label text.
 */
function getFieldLabel(ruleLabel, field, form) {
  var labelElement = form.querySelector("label[for=\"".concat(field.id, "\"]"));
  var labelText = labelElement === null || labelElement === void 0 ? void 0 : labelElement.textContent;
  var placeholder = field.getAttribute('placeholder');
  var name = field.getAttribute('name') || field.name;
  var label = ruleLabel || labelText || placeholder || name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
  return label;
}
;// CONCATENATED MODULE: ./src/utils/validation/applyDateModifier.js
// @ts-check
/**
 *
 * @param {string} dateRule
 * @param {Date} targetDate
 */
function applyDateModifier(dateRule, targetDate) {
  // Extract the modifier and its value using a regular expression
  var modifierRegex = /(\+|-)?([\d]+)\s*(week|day|hour|minute|second)/g;
  var modifierMatch = modifierRegex.exec(dateRule);
  if (!modifierMatch) return;
  var modifierSign = modifierMatch[1] || '+'; // Default to '+' if not specified
  var modifierValue = parseInt(modifierMatch[2]);
  var modifierUnit = modifierMatch[3];
  var adjustedValue = modifierSign === '+' ? modifierValue : -modifierValue;
  switch (modifierUnit) {
    case 'week':
      targetDate.setDate(targetDate.getDate() + adjustedValue * 7);
      break;
    case 'day':
      targetDate.setDate(targetDate.getDate() + adjustedValue);
      break;
    case 'hour':
      targetDate.setHours(targetDate.getHours() + adjustedValue);
      break;
    case 'minute':
      targetDate.setMinutes(targetDate.getMinutes() + adjustedValue);
      break;
    case 'second':
      targetDate.setSeconds(targetDate.getSeconds() + adjustedValue);
      break;
  }
  var offset = modifierValue > 1 ? modifierMatch[3] + 's' : modifierMatch[3];
  return modifierValue + ' ' + offset;
}
;// CONCATENATED MODULE: ./src/base/rules/date.js
function date_typeof(o) { "@babel/helpers - typeof"; return date_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, date_typeof(o); }
function _defineProperty(obj, key, value) { key = date_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function date_toPropertyKey(t) { var i = date_toPrimitive(t, "string"); return "symbol" == date_typeof(i) ? i : String(i); }
function date_toPrimitive(t, r) { if ("object" != date_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != date_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function date_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ date_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == date_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(date_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function date_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function date_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { date_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { date_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check





function afterRule(_x, _x2, _x3) {
  return _afterRule.apply(this, arguments);
}
function _afterRule() {
  _afterRule = date_asyncToGenerator( /*#__PURE__*/date_regeneratorRuntime().mark(function _callee(rules, field, label) {
    var msg;
    return date_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return dateRule.call(this, 'after', rules, field, label);
        case 2:
          msg = _context.sent;
          return _context.abrupt("return", msg);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _afterRule.apply(this, arguments);
}
function afterOrEqual(_x4, _x5, _x6) {
  return _afterOrEqual.apply(this, arguments);
}
function _afterOrEqual() {
  _afterOrEqual = date_asyncToGenerator( /*#__PURE__*/date_regeneratorRuntime().mark(function _callee2(rules, field, label) {
    var msg;
    return date_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return dateRule.call(this, 'afterOrEqual', rules, field, label);
        case 2:
          msg = _context2.sent;
          return _context2.abrupt("return", msg);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _afterOrEqual.apply(this, arguments);
}
function before(_x7, _x8, _x9) {
  return _before.apply(this, arguments);
}
function _before() {
  _before = date_asyncToGenerator( /*#__PURE__*/date_regeneratorRuntime().mark(function _callee3(rules, field, label) {
    var msg;
    return date_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return dateRule.call(this, 'before', rules, field, label);
        case 2:
          msg = _context3.sent;
          return _context3.abrupt("return", msg);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return _before.apply(this, arguments);
}
function beforeOrEqual(_x10, _x11, _x12) {
  return _beforeOrEqual.apply(this, arguments);
}

/**
 * @param {string} ruleName
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
function _beforeOrEqual() {
  _beforeOrEqual = date_asyncToGenerator( /*#__PURE__*/date_regeneratorRuntime().mark(function _callee4(rules, field, label) {
    var msg;
    return date_regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return dateRule.call(this, 'beforeOrEqual', rules, field, label);
        case 2:
          msg = _context4.sent;
          return _context4.abrupt("return", msg);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return _beforeOrEqual.apply(this, arguments);
}
function dateRule(_x13, _x14, _x15, _x16) {
  return _dateRule.apply(this, arguments);
}
function _dateRule() {
  _dateRule = date_asyncToGenerator( /*#__PURE__*/date_regeneratorRuntime().mark(function _callee5(ruleName, rules, field, label) {
    var rule, targetDate, targetField, dateModifier, ruleDates, awaited, valid, fieldDate;
    return date_regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          rule = (rules ? rules[ruleName] : null) || field.dataset.vtsRuleDate;
          if (rule) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", {});
        case 3:
          if (!(typeof rule === 'string')) {
            _context5.next = 12;
            break;
          }
          ruleDates = getDateFromRule(this.form, ruleName, rules, field);
          if (ruleDates) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", {});
        case 7:
          targetDate = new Date(ruleDates.targetDate.toDateString());
          targetField = ruleDates.targetField;
          dateModifier = ruleDates.dateModifier;
          _context5.next = 16;
          break;
        case 12:
          _context5.next = 14;
          return rule(field, label);
        case 14:
          awaited = _context5.sent;
          targetDate = new Date(awaited.toDateString());
        case 16:
          valid = false;
          fieldDate = new Date(new Date(field.value).toDateString());
          _context5.t0 = ruleName;
          _context5.next = _context5.t0 === 'after' ? 21 : _context5.t0 === 'afterOrEqual' ? 23 : _context5.t0 === 'before' ? 25 : _context5.t0 === 'beforeOrEqual' ? 27 : 29;
          break;
        case 21:
          valid = fieldDate > targetDate;
          return _context5.abrupt("break", 29);
        case 23:
          valid = fieldDate >= targetDate;
          return _context5.abrupt("break", 29);
        case 25:
          valid = fieldDate < targetDate;
          return _context5.abrupt("break", 29);
        case 27:
          valid = fieldDate <= targetDate;
          return _context5.abrupt("break", 29);
        case 29:
          return _context5.abrupt("return", valid ? {} : _defineProperty({}, ruleName, replaceDateMsg.call(this, ruleName, rules, targetField, targetDate, dateModifier)));
        case 30:
        case "end":
          return _context5.stop();
      }
    }, _callee5, this);
  }));
  return _dateRule.apply(this, arguments);
}
function getDateFromRule(form, rule, rules, field) {
  var targetField = VtsFormValidator.validateField(form, rules[rule]);
  if (!targetField) {
    console.warn("The element with name \"".concat(rule, "\" is not a valid field element. \n          Please ensure you are passing the name of a valid field in the form."));
    return targetField;
  }
  attachEvent(rule, targetField, field, rules);
  var targetDate = new Date(targetField.value);
  var dateModifier = applyDateModifier(rules[rule], targetDate);
  return {
    dateModifier: dateModifier,
    targetField: targetField,
    targetDate: targetDate
  };
}

/**
 * @param {string} ruleName
 * @param {Date|Promise<Date>} targetDate
 * @param {string} dateModifier
 * @this {import('../../types/base/index').default} Vts
 * @return {string}
 */
function replaceDateMsg(ruleName, rules, targetField, targetDate) {
  var dateModifier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var isDate = targetDate instanceof Date && !isNaN(targetDate.valueOf());
  var targetLabel = targetField ? getFieldLabel(rules[ruleName].label, targetField, this.form) : '';
  var specified = targetLabel || 'the specified date';
  var dateStr = isDate ? targetDate.toLocaleString() : specified;
  var ruleMsg = rules.message ? rules.message[ruleName] : this.message[ruleName];
  var message = (ruleMsg || defaults_defaultMsg[ruleName]).replace(/{:targetValue}/g, dateStr).replace(/{:targetLabel}/g, targetLabel).replace(/{:offset}/g, dateModifier);
  return message;
}
;// CONCATENATED MODULE: ./src/base/rules/differentFrom.js
// @ts-check





/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function differentFrom(rules, field, label) {
  var _rules$message, _this$message;
  var differentFrom = (rules === null || rules === void 0 ? void 0 : rules.differentFrom) || field.dataset['vts-rule-differentFrom'];
  if (!differentFrom) return {};
  var targetField = VtsFormValidator.validateField(this.form, differentFrom);
  if (!targetField) {
    console.warn("The element with name \"".concat(differentFrom, "\" is not a valid field element. \n          Please ensure you are passing the name of a valid field in the form."));
    return {};
  }
  attachEvent('differentFrom', targetField, field, rules);

  // get value of target field
  var matchValue = targetField.value;
  var message = field.value !== matchValue ? '' : ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.differentFrom) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.differentFrom) || defaults_defaultMsg.differentFrom;
  var targetLabel = getFieldLabel(rules.label, targetField, this.form);
  return {
    differentFrom: message === null || message === void 0 ? void 0 : message.replace(/{:targetValue}/g, matchValue || targetLabel).replace(/{:targetLabel}/g, targetLabel)
  };
}
;// CONCATENATED MODULE: ./src/base/rules/endsWith.js
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function endsWithRule(rules, field, label) {
  var _rules$message, _this$message;
  var endsWith = (rules === null || rules === void 0 ? void 0 : rules.endsWith) || field.dataset['vts-rule-endsWith'];
  if (!endsWith) return {};
  var message = ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.endsWith) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.endsWith) || defaults_defaultMsg.endsWith;
  return field.value.endsWith(String(endsWith)) ? {} : {
    endsWith: message.replace(/{:endsWith}/g, String(endsWith))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/equalTo.js
// @ts-check





/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function equalToRule(rules, field, label) {
  var _rules$message, _this$message;
  var equalTo = (rules === null || rules === void 0 ? void 0 : rules.equalTo) || field.dataset['vts-rule-equalTo'];
  if (!equalTo) return {};
  var targetField = VtsFormValidator.validateField(this.form, equalTo);
  if (!targetField) {
    console.warn("The element with name \"".concat(equalTo, "\" is not a valid field element. \n          Please ensure you are passing the name of a valid field in the form."));
    return {};
  }
  attachEvent('equalTo', targetField, field, rules);

  // get value of target field
  var matchValue = targetField.value;
  var message = matchValue === field.value ? '' : ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.equalTo) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.equalTo) || defaults_defaultMsg.equalTo;
  return {
    equalTo: message.replace(/{:targetValue}/g, matchValue).replace(/{:targetLabel}/g, getFieldLabel(rules.label, targetField, this.form))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/inArray.js
function inArray_typeof(o) { "@babel/helpers - typeof"; return inArray_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, inArray_typeof(o); }
function inArray_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ inArray_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == inArray_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(inArray_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function inArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function inArray_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { inArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { inArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
function inArrayRule(_x, _x2, _x3) {
  return _inArrayRule.apply(this, arguments);
}
function _inArrayRule() {
  _inArrayRule = inArray_asyncToGenerator( /*#__PURE__*/inArray_regeneratorRuntime().mark(function _callee(rules, field, label) {
    var _rules$message, _this$message;
    var dataset, inArray, message, arr;
    return inArray_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dataset = field.dataset['vts-rule-inArray'];
          inArray = (rules === null || rules === void 0 ? void 0 : rules.inArray) || (dataset ? JSON.parse(dataset) : null);
          if (inArray) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {});
        case 4:
          message = ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.inArray) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.inArray) || defaults_defaultMsg.inArray;
          arr = [];
          if (!(typeof inArray === 'function')) {
            _context.next = 13;
            break;
          }
          this._setCheckingRule(rules, field, label);
          _context.next = 10;
          return inArray(field, label, this.form);
        case 10:
          arr = _context.sent;
          _context.next = 14;
          break;
        case 13:
          arr = inArray;
        case 14:
          return _context.abrupt("return", arr.includes(field.value) ? {} : {
            inArray: message.replace(/{:values}/g, arr.join(', '))
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _inArrayRule.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/base/rules/max.js
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function maxRule(rules, field, label) {
  var _rules$message, _this$message, _field$files;
  var max = (rules === null || rules === void 0 ? void 0 : rules.max) || Number(field.dataset.vtsRuleMax);
  if (!max) return {};
  var message = (rules === null || rules === void 0 || (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.max) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.max) || defaults_defaultMsg.max;
  var valid = false;
  if (field instanceof HTMLInputElement) {
    switch (field.type) {
      case 'number':
        valid = Number(field.value) <= max;
        break;
      case 'file':
        var fileLen = (_field$files = field.files) === null || _field$files === void 0 ? void 0 : _field$files.length;
        valid = fileLen === undefined ? false : fileLen <= max;
        break;
      default:
        valid = field.value.length <= max;
        break;
    }
  } else if (field instanceof HTMLSelectElement) {
    valid = field.selectedOptions.length <= max;
  } else {
    valid = field.value.length <= max;
  }
  return valid ? {} : {
    max: message.replace(/{:max}/g, String(max))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/min.js
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function minRule(rules, field, label) {
  var _rules$message, _this$message, _field$files;
  var min = (rules === null || rules === void 0 ? void 0 : rules.min) || Number(field.dataset.vtsRuleMin);
  if (!min) return {};
  var message = (rules === null || rules === void 0 || (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.min) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.min) || defaults_defaultMsg.min;
  var valid = false;
  if (field instanceof HTMLInputElement) {
    switch (field.type) {
      case 'number':
        valid = Number(field.value) >= min;
        break;
      case 'file':
        var fileLen = (_field$files = field.files) === null || _field$files === void 0 ? void 0 : _field$files.length;
        valid = fileLen === undefined ? false : fileLen >= min;
        break;
      default:
        valid = field.value.length >= min;
        break;
    }
  } else if (field instanceof HTMLSelectElement) {
    valid = field.selectedOptions.length >= min;
  } else {
    valid = field.value.length >= min;
  }
  return valid ? {} : {
    min: message.replace(/{:min}/g, String(min))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/required.js
function required_typeof(o) { "@babel/helpers - typeof"; return required_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, required_typeof(o); }
function required_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ required_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == required_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(required_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function required_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function required_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { required_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { required_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check





/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @returns {boolean}
 */
function isRequiredAndInvalid(rules, field) {
  // if (
  //   field instanceof HTMLInputElement &&
  //   (field.type === 'checkbox' || field.type === 'radio')
  // ) {
  //   return (
  //     (!!rules?.required && !field.checked) ||
  //     (field.required && !field.checked)
  //   );
  // }
  var hasRequiredRule = (rules === null || rules === void 0 ? void 0 : rules.required) || Boolean(field.dataset.vtsRuleRequired !== undefined && field.dataset.vtsRuleRequired != 'false');
  return hasRequiredRule && !field.value || field.validity.valueMissing;
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function requiredRule(rules, field, label) {
  var _rules$message, _this$message;
  var ruleMsg = (rules === null || rules === void 0 || (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.required) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.required);
  if (isRequiredAndInvalid(rules, field)) {
    return {
      required: ruleMsg || defaults_defaultMsg.required
    };
  }
  return {};
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
function requiredIfRule(_x, _x2, _x3) {
  return _requiredIfRule.apply(this, arguments);
}
function _requiredIfRule() {
  _requiredIfRule = required_asyncToGenerator( /*#__PURE__*/required_regeneratorRuntime().mark(function _callee(rules, field, label) {
    var _rules$message2, _this$message2;
    var requiredIf, isFunction, isInvalid, invalidMsg, requiredField;
    return required_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          requiredIf = rules === null || rules === void 0 ? void 0 : rules.requiredIf;
          isFunction = typeof requiredIf === 'function';
          if (!(!isFunction && !requiredIf || isRequiredAndInvalid(rules, field))) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {});
        case 4:
          isInvalid = false;
          invalidMsg = ((_rules$message2 = rules.message) === null || _rules$message2 === void 0 ? void 0 : _rules$message2.requiredIf) || ((_this$message2 = this.message) === null || _this$message2 === void 0 ? void 0 : _this$message2.requiredIf) || defaults_defaultMsg.requiredIf;
          if (!isFunction) {
            _context.next = 13;
            break;
          }
          this._setCheckingRule(rules, field, label);
          _context.next = 10;
          return requiredIf(field, label, this.form);
        case 10:
          isInvalid = _context.sent;
          _context.next = 20;
          break;
        case 13:
          requiredField = VtsFormValidator.validateField(this.form, requiredIf);
          if (requiredField) {
            _context.next = 17;
            break;
          }
          console.warn("The element with name \"".concat(requiredIf, "\" is not a valid field element. \n            Please ensure you are passing the name of a valid field in the form."));
          return _context.abrupt("return", {});
        case 17:
          isInvalid = !!requiredField.value && !field.value;
          invalidMsg = invalidMsg.replace(/{:targetValue}/g, requiredField.value).replace(/{:targetLabel}/g, getFieldLabel(rules.label, requiredField, this.form));
          attachEvent('requiredIf', requiredField, field, rules);
        case 20:
          return _context.abrupt("return", isInvalid ? {
            requiredIf: invalidMsg
          } : {});
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _requiredIfRule.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/base/rules/notInArray.js
function notInArray_typeof(o) { "@babel/helpers - typeof"; return notInArray_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, notInArray_typeof(o); }
function notInArray_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ notInArray_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == notInArray_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(notInArray_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function notInArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function notInArray_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { notInArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { notInArray_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check



/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
function notInArrayRule(_x, _x2, _x3) {
  return _notInArrayRule.apply(this, arguments);
}
function _notInArrayRule() {
  _notInArrayRule = notInArray_asyncToGenerator( /*#__PURE__*/notInArray_regeneratorRuntime().mark(function _callee(rules, field, label) {
    var _rules$message, _this$message;
    var dataset, notInArray, message, arr;
    return notInArray_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dataset = field.dataset['vts-rule-notInArray'];
          notInArray = (rules === null || rules === void 0 ? void 0 : rules.notInArray) || (dataset ? JSON.parse(dataset) : null);
          if (notInArray) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {});
        case 4:
          message = ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.notInArray) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.notInArray) || defaults_defaultMsg.notInArray;
          arr = [];
          if (!(typeof notInArray === 'function')) {
            _context.next = 13;
            break;
          }
          this._setCheckingRule(rules, field, label);
          _context.next = 10;
          return notInArray(field, label, this.form);
        case 10:
          arr = _context.sent;
          _context.next = 14;
          break;
        case 13:
          arr = notInArray;
        case 14:
          return _context.abrupt("return", !arr.includes(field.value) ? {} : {
            notInArray: message.replace(/{:values}/g, arr.join(', '))
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _notInArrayRule.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/base/rules/pattern.js
// @ts-check



/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function patternRule(rules, field, label) {
  var _rules$message, _this$message;
  var dataset = field.dataset.vtsRulePattern;
  var pattern = (rules === null || rules === void 0 ? void 0 : rules.pattern) || (dataset ? RegExp(dataset) : null);
  if (!pattern) return {};
  return pattern.test(field.value) ? {} : {
    pattern: ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.pattern) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.pattern) || defaults_defaultMsg.pattern
  };
}
;// CONCATENATED MODULE: ./src/base/rules/size.js
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function sizeRule(rules, field, label) {
  var _rules$message, _this$message;
  var size = (rules === null || rules === void 0 ? void 0 : rules.size) || Number(field.dataset.vtsRuleSize);
  if (!size) return {};
  var message = ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.size) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.size) || defaults_defaultMsg.size;
  return size === field.value.length ? {} : {
    size: message.replace(/{:size}/g, String(size))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/startsWith.js
// @ts-check


/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
function startsWithRule(rules, field, label) {
  var _rules$message, _this$message;
  var startsWith = (rules === null || rules === void 0 ? void 0 : rules.startsWith) || field.dataset['vts-rule-startsWith'];
  if (!startsWith) return {};
  var message = ((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.startsWith) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.startsWith) || defaults_defaultMsg.startsWith;
  return field.value.startsWith(String(startsWith)) ? {} : {
    startsWith: message.replace(/{:startsWith}/g, String(startsWith))
  };
}
;// CONCATENATED MODULE: ./src/base/rules/validator.js
function validator_typeof(o) { "@babel/helpers - typeof"; return validator_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, validator_typeof(o); }
function validator_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ validator_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == validator_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(validator_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function validator_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = validator_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function validator_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return validator_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return validator_arrayLikeToArray(o, minLen); }
function validator_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function validator_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
function validatorRule(_x, _x2, _x3) {
  return _validatorRule.apply(this, arguments);
}
function _validatorRule() {
  _validatorRule = validator_asyncToGenerator( /*#__PURE__*/validator_regeneratorRuntime().mark(function _callee(rules, field, label) {
    var dataset, customValidator, invalidMsg, invalidMsgs, _iterator, _step, validator, _invalidMsg;
    return validator_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dataset = field.dataset.vtsRuleValidator || '';
          customValidator = (rules === null || rules === void 0 ? void 0 : rules.validator) || window[dataset];
          if (customValidator) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {});
        case 4:
          if (!(typeof customValidator === 'function')) {
            _context.next = 12;
            break;
          }
          this._setCheckingRule(rules, field, label);
          _context.next = 8;
          return customValidator(field, label, this.form);
        case 8:
          invalidMsg = _context.sent;
          return _context.abrupt("return", invalidMsg ? {
            validator: invalidMsg
          } : {});
        case 12:
          // customValidator is array
          invalidMsgs = {
            validator: []
          };
          _iterator = validator_createForOfIteratorHelper(customValidator);
          _context.prev = 14;
          _iterator.s();
        case 16:
          if ((_step = _iterator.n()).done) {
            _context.next = 24;
            break;
          }
          validator = _step.value;
          _context.next = 20;
          return validator(field, label, this.form);
        case 20:
          _invalidMsg = _context.sent;
          // @ts-ignore
          if (_invalidMsg) invalidMsgs.validator.push(_invalidMsg);
        case 22:
          _context.next = 16;
          break;
        case 24:
          _context.next = 29;
          break;
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](14);
          _iterator.e(_context.t0);
        case 29:
          _context.prev = 29;
          _iterator.f();
          return _context.finish(29);
        case 32:
          return _context.abrupt("return", invalidMsgs);
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[14, 26, 29, 32]]);
  }));
  return _validatorRule.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/base/Rules.js
// @ts-check














var registeredRules = [requiredRule, requiredIfRule, afterRule, afterOrEqual, before, beforeOrEqual, endsWithRule, differentFrom, equalToRule, inArrayRule, maxRule, minRule, notInArrayRule, patternRule, sizeRule, startsWithRule, validatorRule];

/** @type {import('../types/base/rules').default} */
var vtsRules = {
  _getFieldRules: function _getFieldRules(field) {
    var rule = field.dataset.vtsRule || field.name;
    return this.rules.get(rule);
  },
  _convertRulesToMap: function _convertRulesToMap() {
    var rules = this.rules;
    var rulesMap = new Map();
    for (var fieldName in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
        rulesMap.set(fieldName, rules[fieldName]);
      }
    }
    this.rules = rulesMap;
  },
  _setCheckingRule: function _setCheckingRule(rules, field, label) {
    var _rules$message, _this$message;
    var checking = (((_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.checking) || ((_this$message = this.message) === null || _this$message === void 0 ? void 0 : _this$message.checking) || defaults_defaultMsg.checking).replace(/{:value}/g, field.value).replace(/{:label}/g, label);
    field.setCustomValidity(checking);
    this.renderFeedback.call(field, {
      checking: checking
    }, this["class"].invalid);
  }
};
/* harmony default export */ const Rules = (vtsRules);

;// CONCATENATED MODULE: ./src/base/Validation.js
function Validation_typeof(o) { "@babel/helpers - typeof"; return Validation_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Validation_typeof(o); }
function Validation_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Validation_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function Validation_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Validation_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Validation_arrayLikeToArray(o, minLen); }
function Validation_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Validation_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Validation_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == Validation_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(Validation_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function Validation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function Validation_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Validation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Validation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// @ts-check





/** @type {import('../types/base/validation').default} */
var vtsValidation = {
  _validate: function _validate(field) {
    var _this = this;
    return Validation_asyncToGenerator( /*#__PURE__*/Validation_regeneratorRuntime().mark(function _callee() {
      var _ref, _rules$message$valid, _rules$message, _this$message;
      var rules, label, validMessage, renderClass, invalidMessages, isInvalid, errorValidationMsg;
      return Validation_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            rules = _this._getFieldRules(field);
            label = getFieldLabel(rules === null || rules === void 0 ? void 0 : rules.label, field, _this.form);
            validMessage = {
              valid: (_ref = (_rules$message$valid = rules === null || rules === void 0 || (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.valid) !== null && _rules$message$valid !== void 0 ? _rules$message$valid : (_this$message = _this.message) === null || _this$message === void 0 ? void 0 : _this$message.valid) !== null && _ref !== void 0 ? _ref : defaults_defaultMsg.valid
            };
            renderClass = Object.assign(_this["class"], {
              wrapper: rules === null || rules === void 0 ? void 0 : rules.wrapper
            });
            _context.t0 = field.type;
            _context.next = _context.t0 === 'checkbox' ? 7 : _context.t0 === 'radio' ? 9 : 11;
            break;
          case 7:
            validateCheckbox.call(_this, field, rules, validMessage, renderClass);
            return _context.abrupt("break", 16);
          case 9:
            validateRadio.call(_this, field, rules, validMessage, renderClass);
            return _context.abrupt("break", 16);
          case 11:
            _context.next = 13;
            return getValidationMessages.call(_this, rules, field, label);
          case 13:
            invalidMessages = _context.sent;
            isInvalid = Object.keys(invalidMessages).length; // set custom validity
            if (isInvalid) {
              // INVALID
              errorValidationMsg = Object.values(invalidMessages).join(', ');
              field.setCustomValidity(errorValidationMsg);
              _this.renderFeedback.call(field, invalidMessages, renderClass);
            } else {
              // VALID
              field.setCustomValidity('');
              _this.renderFeedback.call(field, validMessage, renderClass);
            }
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};

/**
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../types/base').default}
 * @returns {Promise<import('../types/base/validation').VtsValidationResults>}
 */
function getValidationMessages(_x, _x2, _x3) {
  return _getValidationMessages.apply(this, arguments);
}
/**
 * @param {HTMLInputElement} field
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../types/base').default}
 */
function _getValidationMessages() {
  _getValidationMessages = Validation_asyncToGenerator( /*#__PURE__*/Validation_regeneratorRuntime().mark(function _callee2(rules, field, label) {
    var invalidMessages, _iterator, _step, rule, validationMessage, key, message, value, val, subKey, isRequired;
    return Validation_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          invalidMessages = {}; // TODO: if field is not required, no need to execute validation rules if there is no value
          _iterator = Validation_createForOfIteratorHelper(registeredRules);
          _context2.prev = 2;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context2.next = 17;
            break;
          }
          rule = _step.value;
          _context2.next = 8;
          return rule.call(this, rules, field, label);
        case 8:
          validationMessage = _context2.sent;
          key = Object.keys(validationMessage)[0];
          if (key) {
            message = validationMessage[key];
            value = field.value;
            if (typeof message === 'string') {
              val = value || label;
              validationMessage[key] = message.replace(/{:value}/g, value || label).replace(/{:label}/g, label).replace(/{:length}/g, String(value.length));
            } else {
              // array
              for (subKey in message) {
                validationMessage[key][subKey] = message[subKey].replace(/{:value}/g, value || label).replace(/{:label}/g, label).replace(/{:length}/g, String(value.length));
              }
            }
          }
          invalidMessages = Object.assign(invalidMessages, validationMessage);

          // if the field is invalid and has required rule, break the loop to prevent other rules from executing
          isRequired = (rule.name === 'required' || rule.name === 'requiredIf') && (invalidMessages.required || invalidMessages.requiredIf);
          if (!isRequired) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("break", 17);
        case 15:
          _context2.next = 4;
          break;
        case 17:
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](2);
          _iterator.e(_context2.t0);
        case 22:
          _context2.prev = 22;
          _iterator.f();
          return _context2.finish(22);
        case 25:
          return _context2.abrupt("return", invalidMessages);
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[2, 19, 22, 25]]);
  }));
  return _getValidationMessages.apply(this, arguments);
}
function validateCheckbox(field, rules, validMessage, renderClass) {
  var group = Vts.getGroupedFields(field);
  var label = getFieldLabel(rules === null || rules === void 0 ? void 0 : rules.label, field, this.form);
  var lastField = group[group.length - 1];
  var checkedItems = group.map(function (gField) {
    return gField instanceof HTMLInputElement && gField.checked;
  }).filter(Boolean).length;
  var invalidMsgObj = {};
  var isValid = true;
  var min = (rules === null || rules === void 0 ? void 0 : rules.min) || Number(field.dataset.vtsRuleMin);
  if (min && checkedItems < min) {
    var _ref2, _rules$message$min, _rules$message2, _this$message2;
    isValid = false;
    invalidMsgObj.min = ((_ref2 = (_rules$message$min = rules === null || rules === void 0 || (_rules$message2 = rules.message) === null || _rules$message2 === void 0 ? void 0 : _rules$message2.min) !== null && _rules$message$min !== void 0 ? _rules$message$min : (_this$message2 = this.message) === null || _this$message2 === void 0 ? void 0 : _this$message2.min) !== null && _ref2 !== void 0 ? _ref2 : defaults_defaultMsg.min).replace(/{:min}/g, String(min)).replace(/{:label}/g, label);
  } else {
    var hasChecked = group.some(function (gField) {
      return gField instanceof HTMLInputElement && gField.checked;
    });
    var hasRequiredRule = (rules === null || rules === void 0 ? void 0 : rules.required) || Boolean(field.dataset.vtsRuleRequired !== undefined && field.dataset.vtsRuleRequired != 'false');
    if (hasRequiredRule && !hasChecked) {
      var _ref3, _rules$message$requir, _rules$message3, _this$message3;
      isValid = false;
      invalidMsgObj.required = ((_ref3 = (_rules$message$requir = rules === null || rules === void 0 || (_rules$message3 = rules.message) === null || _rules$message3 === void 0 ? void 0 : _rules$message3.required) !== null && _rules$message$requir !== void 0 ? _rules$message$requir : (_this$message3 = this.message) === null || _this$message3 === void 0 ? void 0 : _this$message3.required) !== null && _ref3 !== void 0 ? _ref3 : defaults_defaultMsg.required).replace(/{:label}/g, label);
    }
  }
  var max = (rules === null || rules === void 0 ? void 0 : rules.max) || Number(field.dataset.vtsRuleMax);
  if (max && checkedItems > max) {
    var _ref4, _rules$message$max, _rules$message4, _this$message4;
    isValid = false;
    invalidMsgObj.max = ((_ref4 = (_rules$message$max = rules === null || rules === void 0 || (_rules$message4 = rules.message) === null || _rules$message4 === void 0 ? void 0 : _rules$message4.max) !== null && _rules$message$max !== void 0 ? _rules$message$max : (_this$message4 = this.message) === null || _this$message4 === void 0 ? void 0 : _this$message4.max) !== null && _ref4 !== void 0 ? _ref4 : defaults_defaultMsg.max).replace(/{:max}/g, String(max)).replace(/{:label}/g, label);
  }
  if (isValid) {
    group.forEach(function (gField) {
      gField.required = false;
      gField.setCustomValidity('');
    });
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    group.forEach(function (gField) {
      gField.required = true;
      gField.setCustomValidity(Object.keys(invalidMsgObj).join(','));
    });
    this.renderFeedback.call(lastField, invalidMsgObj, renderClass);
  }
}

/**
 * @param {HTMLInputElement} field
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../types/base').default}
 */
function validateRadio(_x4, _x5, _x6, _x7) {
  return _validateRadio.apply(this, arguments);
}
function _validateRadio() {
  _validateRadio = Validation_asyncToGenerator( /*#__PURE__*/Validation_regeneratorRuntime().mark(function _callee3(field, rules, validMessage, renderClass) {
    var group, lastField, isValid, _ref5, _rules$message$requir2, _rules$message5, _this$message5;
    return Validation_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          group = Vts.getGroupedFields(field);
          lastField = group[group.length - 1];
          isValid = group.some(function (field) {
            return field.checkValidity();
          });
          if (isValid) {
            this.renderFeedback.call(lastField, validMessage, renderClass);
          } else {
            this.renderFeedback.call(lastField, {
              required: (_ref5 = (_rules$message$requir2 = rules === null || rules === void 0 || (_rules$message5 = rules.message) === null || _rules$message5 === void 0 ? void 0 : _rules$message5.required) !== null && _rules$message$requir2 !== void 0 ? _rules$message$requir2 : (_this$message5 = this.message) === null || _this$message5 === void 0 ? void 0 : _this$message5.required) !== null && _ref5 !== void 0 ? _ref5 : defaults_defaultMsg.required
            }, renderClass);
          }
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return _validateRadio.apply(this, arguments);
}
/* harmony default export */ const Validation = (vtsValidation);
;// CONCATENATED MODULE: ./src/utils/constants.js
// @ts-check
var dialogId = 'Vts_dialog';
var dialogTitleId = "".concat(dialogId, "_title");
var dialogMsgId = "".concat(dialogId, "_message");
var dialogBtnContainerId = "".concat(dialogId, "_button");

/** @type {import("../types/config/responseMessage").default} */
var vtsResponseMessages = {
  400: {
    title: 'Something went wrong',
    message: "The request was invalid. Please try again later."
  },
  401: {
    title: 'Unauthorized',
    message: "You need to be logged in to access this resource."
  },
  403: {
    title: 'Forbidden',
    message: "You don't have permission to access this resource."
  },
  404: {
    title: 'Not Found',
    message: "The requested resource could not be found."
  },
  405: {
    title: 'Method Not Allowed',
    message: "The requested method is not allowed for this resource."
  },
  409: {
    title: 'Conflict',
    message: "The request could not be completed because of a conflict."
  },
  415: {
    title: 'Unsupported Media Type',
    message: "The request is not in a supported format."
  },
  422: {
    title: 'Invalid Data',
    message: 'The data provided was invalid. Please correct the errors and try again.'
  },
  429: {
    title: 'Too Many Requests',
    message: "You have made too many requests in a short period of time. Please try again later."
  },
  500: {
    title: 'Internal Server Error',
    message: "An unexpected error occurred on the server. We're working on it and will fix it as soon as possible."
  },
  503: {
    title: 'Service Unavailable',
    message: "The service is unavailable at this time. Please try again later."
  }
};

;// CONCATENATED MODULE: ./src/utils/response/getDefaultMsgFromResponse.js
// @ts-check

/**
 * Gets the default title and message for a response
 *
 * @param {Response} response
 * @param {import('../../types/config/responseMessage').default} defaultMessages
 * @returns {[title:string, message:string]}
 */
function getDefaultMsgFromResponse(response, defaultMessages) {
  var title = '';
  var message = '';

  // Get the default message for the status code
  var statusMsg = defaultMessages[response.status];

  // If a default message exists, use it
  if (statusMsg) {
    title = statusMsg.title;
    message = statusMsg.message;
  } else {
    // Otherwise, create default messages based on the response status
    if (response.ok) {
      title = 'Success!';
      message = 'The request was successful.';
    } else {
      title = response.statusText + ': ' + response.status;
      message = 'Please try again later.';
    }
  }
  return [title, message];
}
;// CONCATENATED MODULE: ./src/utils/response/isMsgHTMLorScript.js
// @ts-check

/**
 * Checks if the message contains HTML or script
 *
 * @param {*} message The message to check.
 * @returns {boolean} True if the message contains HTML or script, false otherwise.
 */
function isMsgHTMLorScript(message) {
  if (typeof message !== 'string') return false;
  return message.startsWith('<!DOCTYPE html>') || message.startsWith('<script>');
}
;// CONCATENATED MODULE: ./src/utils/getResponseMessage.js
function getResponseMessage_typeof(o) { "@babel/helpers - typeof"; return getResponseMessage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, getResponseMessage_typeof(o); }
function getResponseMessage_slicedToArray(arr, i) { return getResponseMessage_arrayWithHoles(arr) || getResponseMessage_iterableToArrayLimit(arr, i) || getResponseMessage_unsupportedIterableToArray(arr, i) || getResponseMessage_nonIterableRest(); }
function getResponseMessage_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function getResponseMessage_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getResponseMessage_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getResponseMessage_arrayLikeToArray(o, minLen); }
function getResponseMessage_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getResponseMessage_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function getResponseMessage_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// @ts-check




/**
 * Extracts title and message from response and formats it
 *
 * Note: This function can also get title and message from errors that occurred on the client side,
 * such as when the fetch request is aborted or an error was thrown in the `before` and `success` ajax callbacks.
 *
 * @param {*} data The parsed data from the server.
 * @param {Response|null} response The response from the server.
 * @param {import('../types/config/responseMessage').default} [defaultResponseMessages=vtsResponseMessages]
 * @returns {{title:string, message: string}} An object with the title and message of the error.
 */
function getResponseMessage_getResponseMessage(data, response) {
  var defaultResponseMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vtsResponseMessages;
  var title = '';
  var message = '';

  // Check if data is from server - response is null if an error occured from client i.e 'AbortError'
  if (response) {
    // Set default messages based on response
    // If data is HTML or script, set message to data
    var _getDefaultMsgFromRes = getDefaultMsgFromResponse(response, defaultResponseMessages);
    var _getDefaultMsgFromRes2 = getResponseMessage_slicedToArray(_getDefaultMsgFromRes, 2);
    title = _getDefaultMsgFromRes2[0];
    message = _getDefaultMsgFromRes2[1];
    if (isMsgHTMLorScript(data)) {
      message = data;
    } else {
      var _data$title, _data$message;
      // get message based on the title and message properties returned from the data
      title = (_data$title = data.title) !== null && _data$title !== void 0 ? _data$title : title;
      message = extractMessage((_data$message = data.message) !== null && _data$message !== void 0 ? _data$message : message);
    }
  } else {
    // error occured from client
    if (getResponseMessage_typeof(data) === 'object') {
      title = data.name;
      message = data.message;
    } else {
      title = 'An unknown error has occurred';
      message = data;
    }
  }
  return {
    title: title,
    message: message
  };
}

/**
 * If message is an object, update the message and iterate and extract each values
 *
 * @param {*} data
 * @returns {string}
 */
function extractMessage(data) {
  var msg = '';
  if (getResponseMessage_typeof(data) === 'object') {
    for (var index in data) {
      msg += extractMessage(data[index]);
    }
  } else {
    msg = data + '<br />';
  }
  return msg;
}
;// CONCATENATED MODULE: ./src/utils/response/openNewWindow.js
// @ts-check

/**
 * Opens a new window with the given message.
 *
 * @param {string} title The title to be displayed in the new window.
 * @param {string} message The message to be displayed in the new window.
 */
function openNewWindow(title, message) {
  var newWindow = window.open();
  if (newWindow) {
    newWindow.document.title = title + ' - ' + window.document.title;
    if (message.startsWith('<!DOCTYPE html>') || message.startsWith('<html>')) {
      newWindow.document.write(message);
      newWindow.stop();
    } else {
      newWindow.document.body.outerHTML = message;
    }
  }
}
;// CONCATENATED MODULE: ./src/utils/response/createAnchor.js
// @ts-check



/**
 * Creates an anchor element with the given message.
 * When the anchor element is clicked, it opens a new window with the given message.
 *
 * @param {HTMLDialogElement} dialog The dialog element that the anchor will be added to.
 * @param {HTMLDivElement} messageSection The message section of the dialog element.
 * @param {string} title The title of the alert dialog.
 * @param {*} message The message that will be opened in the new window.
 */
function createAnchor(dialog, messageSection, title, message) {
  // Create an anchor element
  var anchor = document.createElement('a');
  anchor.href = '#';
  anchor.role = 'button';
  anchor.onclick = function () {
    dialog.close();
    openNewWindow(title, message);
  };
  anchor.textContent = 'Click here to view more details';

  // Add the anchor element to the message section
  messageSection.innerHTML = '';
  messageSection.appendChild(anchor);
}
;// CONCATENATED MODULE: ./src/utils/response/createDialog.js
// @ts-check





/**
 * Creates a dialog with the given title and message.
 *
 * @param {string} title The title of the dialog.
 * @param {string} message The message of the dialog.
 * @returns {HTMLDialogElement} The created dialog element.
 */
function createDialog(title, message) {
  // Create a dialog element.
  var dialog = document.createElement('dialog');
  dialog.style.minWidth = '250px';
  dialog.id = dialogId;

  // Create the title container.
  var titleBar = document.createElement('div');
  titleBar.id = dialogTitleId;
  titleBar.textContent = title;
  titleBar.style.fontWeight = 'bold';

  // Create the OK button.
  var okButton = document.createElement('button');
  okButton.id = dialogBtnContainerId;
  okButton.style.padding = '3px 16px';
  okButton.style["float"] = 'right';
  okButton.textContent = 'Ok';
  okButton.onclick = function () {
    dialog.close();
  };

  // Create the message container.
  var messageSection = document.createElement('div');
  messageSection.id = dialogMsgId;
  messageSection.style.margin = '5px 0';

  // Format the message content.
  if (isMsgHTMLorScript(message)) {
    createAnchor(dialog, messageSection, title, message);
  } else {
    messageSection.innerHTML = message;
  }

  // Append the children to the dialog element.
  dialog.appendChild(titleBar);
  dialog.appendChild(messageSection);
  dialog.appendChild(okButton);
  document.body.appendChild(dialog);
  return dialog;
}
;// CONCATENATED MODULE: ./src/utils/response/fallbackAlert.js
// @ts-check




/**
 * shows a fallback alert dialog with the given title and message.
 *
 * @param {string} title The title of the alert dialog.
 * @param {string} message The message of the alert dialog.
 */
function fallBackAlert(title, message) {
  if (isMsgHTMLorScript(message)) {
    confirm("".concat(title, ".\n\nClick 'OK' to view more details.")) && openNewWindow(title, message);
  } else {
    alert("".concat(title, ".\n\n").concat(message));
  }
}
;// CONCATENATED MODULE: ./src/utils/response/showDialog.js
// @ts-check






/**
 * Shows a dialog with the given title and message.
 * If a dialog with the given ID already exists, the title and message will be updated.
 * Otherwise, a new dialog will be created.
 *
 * @param {string} title The title of the dialog.
 * @param {string} message message The message of the dialog. If a string is passed, it will be displayed as plain text. If an HTMLElement is passed, it will be displayed as HTML.
 */
function showDialog(title, message) {
  var existingDialog = document.getElementById(dialogId);

  // Check if the dialog already exists
  if (existingDialog instanceof HTMLDialogElement) {
    // Update the title and message of the existing dialog
    var messageSection = existingDialog.querySelector("#".concat(dialogMsgId));
    if (messageSection instanceof HTMLDivElement) {
      var titleBar = existingDialog.querySelector("#".concat(dialogTitleId));
      if (titleBar) titleBar.textContent = title;
      if (isMsgHTMLorScript(message)) {
        createAnchor(existingDialog, messageSection, title, message);
      } else {
        messageSection.innerHTML = message;
      }
    }

    // Show the existing dialog
    existingDialog.showModal();
  } else {
    if (existingDialog) {
      // the dialogId is probably used by another element
      fallBackAlert(title, message);
    } else {
      // create new dialog
      var dialog = createDialog(title, message);
      dialog.showModal();
    }
  }
}
;// CONCATENATED MODULE: ./src/defaults/ajax.js
// @ts-check



/** @type {import("../types/config/ajaxSettings").default} */
var ajaxHandler = {
  action: '',
  request: {},
  beforeSend: function beforeSend(requestInit, abortController, form) {
    /*
     * This is the `beforeSend` event renderFeedback for the form.
     * It is called before the form is submitted, and it can be used to modify the request or prevent the form from being submitted.
     */

    // Get the submit button element from the form.
    var submitBtn = getSubmitButtonFrom(form);
    if (!submitBtn) return;

    // If the submit button exists, then we do the following:
    var vtsSessionId = "__Vts_".concat(form.getAttribute('id'), "_submitDisplay");

    // Clone the submit button.
    var cancelBtn = submitBtn.cloneNode();
    if (cancelBtn instanceof HTMLButtonElement || cancelBtn instanceof HTMLInputElement) {
      var _submitBtn$parentElem;
      cancelBtn.type = 'button';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.classList.add(vtsSessionId);
      // Add an event listener to the cloned button that aborts the request.
      cancelBtn.addEventListener('click', function () {
        abortController.abort();
      }, {
        signal: abortController.signal
      });
      // Add the cloned button to the form.
      (_submitBtn$parentElem = submitBtn.parentElement) === null || _submitBtn$parentElem === void 0 || _submitBtn$parentElem.append(cancelBtn);
    }
    // Store the original display style of the submit button in session storage.
    var submitBtnDisplay = window.getComputedStyle(submitBtn).display;
    window.sessionStorage.setItem(vtsSessionId, submitBtnDisplay);
    // Set the display of the submit button to "none".
    submitBtn.style.display = 'none';
  },
  complete: function complete(data, response, form) {
    /*
     * This is the `complete` event renderFeedback for the form.
     * It is called after the form is submitted, and it can be used to handle the response or perform cleanup tasks.
     */

    // Get the submit button element from the form.
    var submitBtn = getSubmitButtonFrom(form);
    if (!submitBtn) return;

    // Get the session ID for this form.
    var vtsSessionId = "__Vts_".concat(form.getAttribute('id'), "_submitDisplay");

    // Get the cancel button element from the form.
    /** @type {HTMLButtonElement|HTMLInputElement|null} */
    var cancelBtn = form.querySelector(".".concat(vtsSessionId));
    if (cancelBtn) {
      // Remove the cancel button from the form.
      cancelBtn.remove();

      // Get the stored display style of the submit button from session storage.
      var submitBtnDisplay = window.sessionStorage.getItem(vtsSessionId);
      if (submitBtnDisplay) {
        // Set the display style of the submit button to the stored value.
        submitBtn.style.display = submitBtnDisplay;
      }
    }
  },
  error: function error(errorData, errorResponse, form) {
    var _getResponseMessage = getResponseMessage_getResponseMessage(errorData, errorResponse),
      title = _getResponseMessage.title,
      message = _getResponseMessage.message;
    if (title !== 'AbortError') showDialog(title, message);
  },
  success: function success(data, response, form) {
    var _getResponseMessage2 = getResponseMessage_getResponseMessage(data, response),
      title = _getResponseMessage2.title,
      message = _getResponseMessage2.message;
    form.reset();
    form.classList.remove('was-validated');
    showDialog(title, message);
  }
};

/**
 * @param {Element} parent
 * @returns {HTMLButtonElement|HTMLInputElement|null}
 */
function getSubmitButtonFrom(parent) {
  return parent.querySelector('[type="submit"]');
}
/* harmony default export */ const ajax = (ajaxHandler);
;// CONCATENATED MODULE: ./src/defaults/index.js
// @ts-check




/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../types/base/config').default}
 */
var vtsDefaults = {
  ajax: ajax,
  "class": {
    form: 'was-validated',
    invalid: 'invalid-feedback',
    valid: 'valid-feedback'
  },
  halt: false,
  renderFeedback: function renderFeedback(validationResults, renderClass) {
    // Extract the renderClass object
    var wrapper = renderClass.wrapper,
      invalid = renderClass.invalid,
      valid = renderClass.valid;

    // Check if field is valid
    var isValid = this.checkValidity();

    // Determine the feedback class based on the validation result
    var feedbackClass = isValid ? valid : invalid;

    // Find the field wrapper
    var fieldWrapper = wrapper ? this.closest(".".concat(wrapper)) : this.parentNode;

    // Find the feedback container
    var vtsFeedbackClass = 'vts-feedback-container';
    var feedbackContainer = fieldWrapper === null || fieldWrapper === void 0 ? void 0 : fieldWrapper.querySelector(".".concat(vtsFeedbackClass));

    // Create the feedback container if it doesn't exist
    var textContent = Object.values(validationResults).flat().join('<br />');
    if (feedbackContainer instanceof HTMLElement) {
      // Update the feedback content and display
      feedbackContainer.innerHTML = textContent;

      // toggle the feedback class
      feedbackContainer.classList.add(feedbackClass);
      feedbackContainer.classList.remove(!isValid ? valid : invalid);
    } else {
      // Create a new feedback container and append it to the field wrapper
      var newContainer = document.createElement('div');
      newContainer.classList.add(vtsFeedbackClass, feedbackClass);
      newContainer.innerHTML = textContent;
      fieldWrapper === null || fieldWrapper === void 0 || fieldWrapper.append(newContainer);
    }
  },
  listen: false,
  message: defaults_defaultMsg,
  rules: {},
  stopPropagation: true
};
/* harmony default export */ const defaults = (vtsDefaults);
;// CONCATENATED MODULE: ./src/utils/deepMerge.js
function deepMerge_typeof(o) { "@babel/helpers - typeof"; return deepMerge_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, deepMerge_typeof(o); }
/**
 * Deeply merges multiple objects into a single object.
 *
 * @param {object} target - The target object to merge the sources into.
 * @param {...object} sources - The source objects to merge into the target.
 * @returns {object} - The merged object.
 */
function deepMerge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  if (!sources.length) {
    return target;
  }
  var source = sources.shift();
  for (var key in source) {
    if (deepMerge_typeof(source[key]) === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (source[key] instanceof RegExp) {
        target[key] = source[key];
        continue;
      }
      if (!target[key] || deepMerge_typeof(target[key]) !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return deepMerge.apply(void 0, [target].concat(sources));
}
;// CONCATENATED MODULE: ./src/utils/setVtsConfig.js
// @ts-check



/**
 * Sets the configuration options for Vts (Validate Then Submit).
 *
 * @description This function merges the provided configuration options with the default configuration
 * and returns the resulting configuration object.
 *
 * @export
 * @param {HTMLFormElement} form - The HTML form element.
 * @param {import('../types/config').default} config - The partial configuration options.
 * @returns {import('../types/base/config').default} - The merged configuration options.
 */
function setVtsConfig(form, config) {
  /** @type {import('../types/base/config').default} */
  var options = deepMerge({}, defaults, config);
  var ajax = options.ajax;
  options.ajax.action = ajax.action || form.getAttribute('action') || '';
  var request = ajax.request;
  /** @type {RequestInit} */
  var method = {
    method: request.method || form.getAttribute('method') || 'get'
  };

  /** @type {RequestInit} */
  var merge = Object.assign(request, method);
  options.ajax.request = merge;
  return options;
}
;// CONCATENATED MODULE: ./src/Vts.js
// @ts-check


function Vts_typeof(o) { "@babel/helpers - typeof"; return Vts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Vts_typeof(o); }
var _class;
function Vts_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Vts_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == Vts_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(Vts_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function Vts_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Vts_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function Vts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Vts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Vts_arrayLikeToArray(o, minLen); }
function Vts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function Vts_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function Vts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Vts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Vts_toPropertyKey(descriptor.key), descriptor); } }
function Vts_createClass(Constructor, protoProps, staticProps) { if (protoProps) Vts_defineProperties(Constructor.prototype, protoProps); if (staticProps) Vts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Vts_toPropertyKey(t) { var i = Vts_toPrimitive(t, "string"); return "symbol" == Vts_typeof(i) ? i : String(i); }
function Vts_toPrimitive(t, r) { if ("object" != Vts_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Vts_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }











var fieldQuery = '[name]:not([data-vts-ignored]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="hidden"])';

/// <reference path="./Vts.d.ts" />
var _init = /*#__PURE__*/new WeakSet();
var Vts = /*#__PURE__*/function () {
  /**
   * @param {string | HTMLFormElement} form
   * @param {import('./types/config/index.js').default} [config={}]
   */
  function Vts(_form) {
    var _config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Vts_classCallCheck(this, Vts);
    /**
     * @param {HTMLFormElement} form
     * @param {import('./types/config/index.js').default} config
     * @this {import('./types/base').default} Vts
     * @memberof Vts
     */
    _classPrivateMethodInitSpec(this, _init);
    var elem = this.form = VtsFormValidator.validateForm(_form);
    this.fields = elem.querySelectorAll(fieldQuery); // @ts-ignore
    _classPrivateMethodGet(this, _init, _init2).call(this, elem, _config);
    elem.vts = this;
  }
  Vts_createClass(Vts, [{
    key: "updateFields",
    value:
    /**
     * @this {import('./types/base').default} Vts
     * @memberof Vts
     */
    function updateFields() {
      this.fields = this.form.querySelectorAll(fieldQuery);
      this._addFieldListener();
    }

    /**
     * @this {import('./types/base').default} Vts
     * @memberof Vts
     */
  }, {
    key: "resetForm",
    value: function resetForm() {
      this.form.reset();
      this.form.classList.remove(this["class"].form);
    }

    /**
     * Validates each field.
     * @this {import('./types/base').default} Vts
     * @memberof Vts
     */
  }, {
    key: "validate",
    value: (function () {
      var _validate = Vts_asyncToGenerator( /*#__PURE__*/Vts_regeneratorRuntime().mark(function _callee() {
        var _iterator, _step, field;
        return Vts_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _iterator = Vts_createForOfIteratorHelper(this.fields);
              _context.prev = 1;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }
              field = _step.value;
              _context.next = 7;
              return this._validate(field);
            case 7:
              _context.next = 3;
              break;
            case 9:
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              _iterator.e(_context.t0);
            case 14:
              _context.prev = 14;
              _iterator.f();
              return _context.finish(14);
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 11, 14, 17]]);
      }));
      function validate() {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
    /**
     * @static
     * @param {import('./types/config/index.js').default} config
     * @memberof Vts
     */
    )
  }], [{
    key: "setDefaults",
    value: function setDefaults(config) {
      deepMerge(defaults, config);
    }

    /**
     * @param {Response} response
     * @returns {Promise<any>}
     */
  }, {
    key: "getResponseData",
    value: (function () {
      var _getResponseData = Vts_asyncToGenerator( /*#__PURE__*/Vts_regeneratorRuntime().mark(function _callee2(response) {
        return Vts_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", getResponseData_getResponseData(response));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getResponseData(_x) {
        return _getResponseData.apply(this, arguments);
      }
      return getResponseData;
    }()
    /**
     * @param {*} data The parsed data from the server.
     * @param {Response|null} response The response from the server.
     * @param {import('./types/config/responseMessage').default} [defaultResponseMessages=vtsResponseMessages]
     * @returns {{title:string, message: string}} An object with the title and message of the error.
     */
    )
  }, {
    key: "getResponseMessage",
    value: function getResponseMessage(data, response, defaultResponseMessages) {
      return getResponseMessage_getResponseMessage(data, response, defaultResponseMessages);
    }

    /**
     * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
     * @returns {Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement|Element>}
     */
  }, {
    key: "getGroupedFields",
    value: function getGroupedFields(field) {
      var form = field.closest('form');
      var fields = form === null || form === void 0 ? void 0 : form.querySelectorAll(fieldQuery);
      if (!form || !fields) return [];
      var fieldName = field.name;

      // Build regular expression
      var baseName = fieldName.split('[')[0];
      var dynamicParts = fieldName.split(']').slice(1).map(function (part) {
        return part.split('[')[1];
      });
      var regexPattern = "^".concat(baseName);
      if (dynamicParts.length > 0) {
        regexPattern += "(\\[".concat(dynamicParts.join('|'), "\\])?");
      }
      var groupRegex = new RegExp(regexPattern);

      // Find all matching inputs
      var groupedFields = [];
      var _iterator2 = Vts_createForOfIteratorHelper(fields),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var gField = _step2.value;
          //@ts-ignore
          if (groupRegex.test(gField.name)) {
            groupedFields.push(gField);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return groupedFields;
    }
  }]);
  return Vts;
}();
_class = Vts;
function _init2(form, config) {
  Object.assign(this, Form, setVtsConfig(form, config));
  Object.assign(_class.prototype, Events, Rules, Validation);
  this._convertRulesToMap();
  this._addEventListeners();
}


/***/ }),

/***/ 147:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports Headers, Request, Response, DOMException, fetch */
/* eslint-disable no-prototype-builtins */
var g =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  // eslint-disable-next-line no-undef
  (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g) ||
  {}

var support = {
  searchParams: 'URLSearchParams' in g,
  iterable: 'Symbol' in g && 'iterator' in Symbol,
  blob:
    'FileReader' in g &&
    'Blob' in g &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in g,
  arrayBuffer: 'ArrayBuffer' in g
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      if (header.length != 2) {
        throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
      }
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body._noBody) return
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type)
  var encoding = match ? match[1] : 'utf-8'
  reader.readAsText(blob, encoding)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    // eslint-disable-next-line no-self-assign
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._noBody = true;
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }
  }

  this.arrayBuffer = function() {
    if (this._bodyArrayBuffer) {
      var isConsumed = consumed(this)
      if (isConsumed) {
        return isConsumed
      } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
        return Promise.resolve(
          this._bodyArrayBuffer.buffer.slice(
            this._bodyArrayBuffer.byteOffset,
            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
          )
        )
      } else {
        return Promise.resolve(this._bodyArrayBuffer)
      }
    } else if (support.blob) {
      return this.blob().then(readBlobAsArrayBuffer)
    } else {
      throw new Error('could not read as ArrayBuffer')
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal || (function () {
    if ('AbortController' in g) {
      var ctrl = new AbortController();
      return ctrl.signal;
    }
  }());
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        try {
          headers.append(key, value)
        } catch (error) {
          console.warn('Response ' + error.message)
        }
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  if (this.status < 200 || this.status > 599) {
    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
  }
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 200, statusText: ''})
  response.ok = false
  response.status = 0
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = g.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      // This check if specifically for when a user fetches a file locally from the file system
      // Only if the status is out of a normal range
      if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
        options.status = 200;
      } else {
        options.status = xhr.status;
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request timed out'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && g.location.href ? g.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || (g.Headers && init.headers instanceof g.Headers))) {
      var names = [];
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        names.push(normalizeName(name))
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
      request.headers.forEach(function(value, name) {
        if (names.indexOf(name) === -1) {
          xhr.setRequestHeader(name, value)
        }
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!g.fetch) {
  g.fetch = fetch
  g.Headers = Headers
  g.Request = Request
  g.Response = Response
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(147);
/******/ 	var __webpack_exports__ = __webpack_require__(338);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});