/*!
* Vts - Validate then submit.
* (c) 2023 Raymark Eduarte Dela Cruz
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

/***/ 186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Vts)
});

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(147);
;// CONCATENATED MODULE: ./src/utils/getResponseData.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
function Form_typeof(obj) { "@babel/helpers - typeof"; return Form_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Form_typeof(obj); }
function Form_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Form_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == Form_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      var data, response, promiseResolved, ajax, form, url, _vtsFormBeforeSend$ca, _vtsFormBeforeSend$ca2, _this$ajax$request$si;
      return Form_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            promiseResolved = true;
            ajax = _this.ajax;
            form = _this.form;
            _context.prev = 3;
            url = ajax.action;
            // fetch
            _vtsFormBeforeSend$ca = vtsFormBeforeSend.call(_this, url, ajax.request);
            _vtsFormBeforeSend$ca2 = _slicedToArray(_vtsFormBeforeSend$ca, 2);
            url = _vtsFormBeforeSend$ca2[0];
            ajax.request = _vtsFormBeforeSend$ca2[1];
            _context.next = 11;
            return fetch(new Request(url, ajax.request));
          case 11:
            response = _context.sent;
            if (response.ok) {
              _context.next = 14;
              break;
            }
            throw response;
          case 14:
            _context.next = 16;
            return getResponseData_getResponseData(response);
          case 16:
            data = _context.sent;
            // call success callback function
            ajax.success(data, response, form);
            _context.next = 32;
            break;
          case 20:
            _context.prev = 20;
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
              _context.next = 30;
              break;
            }
            _context.next = 28;
            return getResponseData_getResponseData(_context.t0);
          case 28:
            data = _context.sent;
            response = _context.t0;
          case 30:
            promiseResolved = false;
            // Call the error callback function with the appropriate data
            ajax.error(data, response, form);
          case 32:
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
          case 34:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 20]]);
    }))();
  }
};

/**
 * @description
 * @author RED
 * @param {string} url
 * @param {RequestInit} request
 * @returns {[url, request]}
 * @this {import('../Vts').default}
 */
function vtsFormBeforeSend(url, request) {
  var formData = new FormData(this.form);
  // @ts-ignore
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;
  request = this.ajax.request = this.ajax.beforeSend(this.ajax.request, this.ajax.abortController, this.form) || request;
  var vMethod = request.method || 'get';
  switch (vMethod.toLocaleLowerCase()) {
    case 'get':
    case 'delete':
      var query = new URLSearchParams(formData.toString());
      url = this.ajax.action = "".concat(url, "/?").concat(query);
      break;
    case 'put':
    case 'patch':
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });
      request.body = JSON.stringify(data);
      break;
    default:
      request.body = formData;
      break;
  }
  return [url, request];
}
/* harmony default export */ const Form = (vtsForm);
;// CONCATENATED MODULE: ./src/utils/VtsFormValidator.js
function VtsFormValidator_typeof(obj) { "@babel/helpers - typeof"; return VtsFormValidator_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, VtsFormValidator_typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return VtsFormValidator_typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (VtsFormValidator_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (VtsFormValidator_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
     * Checks the field element in the form and validates its type.
     * Throws an error if the field element is not found or is not a valid field element.
     *
     * @param {HTMLFormElement} form - The HTML form element.
     * @param {string} fieldName - The name of the field element.
     * @returns {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} - The validated field element.
     * @throws {TypeError} Throws a TypeError if the field element is not found or is not a valid field element.
     */
  }, {
    key: "validateField",
    value: function validateField(form, fieldName) {
      var field = form.querySelector("[name=\"".concat(fieldName, "\"]"));

      // Check if field element exists
      if (!field) {
        throw new TypeError("The field element with the name \"".concat(fieldName, "\" was not found in the form."));
      }

      // Check if field element is a valid field element
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
        throw new TypeError("The element with name \"".concat(fieldName, "\" is not a valid field element. \n      Please ensure you are passing the name of a valid field in the form."));
      }
      return field;
    }
  }]);
  return VtsFormValidator;
}();
/**
 * Check if form element is a valid HTML form element
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
  return element;
}
;// CONCATENATED MODULE: ./src/base/Events.js
function Events_slicedToArray(arr, i) { return Events_arrayWithHoles(arr) || Events_iterableToArrayLimit(arr, i) || Events_unsupportedIterableToArray(arr, i) || Events_nonIterableRest(); }
function Events_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function Events_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function Events_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Events_typeof(obj) { "@babel/helpers - typeof"; return Events_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Events_typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Events_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function Events_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Events_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Events_arrayLikeToArray(o, minLen); }
function Events_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// @ts-check


/** @type {import('../types/base/events').default} */
var vtsEvents = {
  _addEventListeners: function _addEventListeners() {
    var _this = this;
    // Form
    var form = this.form;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (_this.stopPropagation) {
        e.stopPropagation();
      }
      var formClass = _this["class"].form || 'was-validated';
      var wasValidated = form.classList.contains(formClass);
      var shouldListen = _this.listen;
      if (!shouldListen && !wasValidated) {
        _this._addFieldListener();
      }

      // validate each field
      var _iterator = _createForOfIteratorHelper(_this.fields),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          _this._checkFieldValidity(field);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _this._reportValidity();
      _this.form.classList.add(formClass);
      if (_this.isFormValid() && !_this.halt) {
        _this.submit()["catch"](function () {});
      }
    });

    // Fields
    var shouldListen = this.listen;
    shouldListen && this._addFieldListener();

    // Match events
    this._attachMatchEvents();
  },
  _addFieldListener: function _addFieldListener() {
    var _this2 = this;
    if (this.fields) this.fields.forEach(function (field) {
      var fieldName = field.getAttribute('name');
      var rules = _this2._getFieldRules(fieldName || '');
      var eventType = _this2._getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
      field.addEventListener(eventType, function () {
        _this2._checkFieldValidity(field);
        _this2._reportValidity();
      });
    });
  },
  _attachMatchEvents: function _attachMatchEvents() {
    var _this3 = this;
    var ruleEntries = this.rules;
    if (Events_typeof(ruleEntries) === 'object' && ruleEntries instanceof Map) {
      var _iterator2 = _createForOfIteratorHelper(ruleEntries.entries()),
        _step2;
      try {
        var _loop = function _loop() {
          var _step2$value = Events_slicedToArray(_step2.value, 2),
            fieldName = _step2$value[0],
            rule = _step2$value[1];
          var match = rule.matches;
          var dependent = rule.requires;
          var form = _this3.form;
          var field = VtsFormValidator.validateField(form, fieldName);
          var rules = _this3._getFieldRules(fieldName);
          var eventType = _this3._getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
          var inputEvent = new Event(eventType);
          if (match) {
            var matchField = VtsFormValidator.validateField(form, match);
            form.querySelector("[name=\"".concat(match, "\"]"));
            matchField.addEventListener(eventType, function () {
              field.dispatchEvent(inputEvent);
            });
          }
          if (dependent) {
            var neededField = VtsFormValidator.validateField(form, dependent);
            form.querySelector("[name=\"".concat(dependent, "\"]"));
            neededField.addEventListener(eventType, function () {
              if (neededField.value) {
                field.required = true;
                field.disabled = false;
              } else {
                field.disabled = true;
                field.required = false;
              }
              field.dispatchEvent(inputEvent);
            });
          }
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  },
  _getEventType: function _getEventType(fieldType, ruleEventType) {
    var changeEvents = ['radio', 'select-one', 'select-multiple', 'checkbox', 'file', 'range'];

    // Update event to 'change' based on the field type
    var eventType = changeEvents.includes(fieldType) ? 'change' : 'input';

    // Update event based on the specified rule
    eventType = ruleEventType || eventType;
    return eventType;
  }
};
/* harmony default export */ const Events = (vtsEvents);
;// CONCATENATED MODULE: ./src/utils/getFieldLabel.js
/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {string} - The label text.
 */
function getFieldLabel(field, form) {
  var dataLabel = field.dataset.vtsLabel;
  var labelElement = form.querySelector("label[for=\"".concat(field.id, "\"]"));
  var labelText = labelElement === null || labelElement === void 0 ? void 0 : labelElement.textContent;
  var placeholder = field.getAttribute('placeholder');
  var label = dataLabel || labelText || placeholder || '';
  return label;
}
;// CONCATENATED MODULE: ./src/base/Rules.js
// @ts-check



/** @type {import('../types/base/rules').default} */
var vtsRules = {
  _applyRules: function _applyRules(rules, field, label) {
    var _rules$flags;
    var message = this.message.invalid || 'Invalid field';
    var pattern = ('pattern' in rules ? rules.pattern : '') || '';
    var matches = 'matches' in rules && !('pattern' in rules) ? rules.matches : false;
    var matchingField;
    var matchValue = '';

    // overwrite pattern
    pattern = (_rules$flags = rules.flags) !== null && _rules$flags !== void 0 && _rules$flags.includes('g') ? pattern + '\\b' : pattern;
    if (matches) {
      var _rules$flags2;
      // get matching field target
      matchingField = VtsFormValidator.validateField(this.form, matches);
      // get value of target field
      matchValue = matchingField.value;
      // overwrite pattern
      pattern = (_rules$flags2 = rules.flags) !== null && _rules$flags2 !== void 0 && _rules$flags2.includes('g') ? matchValue + '\\b' : "^".concat(matchValue, "$");
    }
    var dependent = rules.requires;
    var neededField = null;
    if (dependent) {
      neededField = VtsFormValidator.validateField(this.form, dependent);
      if (neededField.value) {
        field.required = true;
        field.disabled = false;
      } else {
        field.disabled = true;
        field.required = false;
      }
      neededField = neededField.value;
    }

    // set validity
    var regExp = new RegExp(pattern, rules.flags);
    if (neededField || regExp.test(field.value)) {
      var _ref, _rules$message$valid, _rules$message;
      message = (_ref = (_rules$message$valid = (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.valid) !== null && _rules$message$valid !== void 0 ? _rules$message$valid : this.message.valid) !== null && _ref !== void 0 ? _ref : '';
      field.setCustomValidity('');
    } else {
      var _rules$message$invali, _rules$message2;
      message = (_rules$message$invali = (_rules$message2 = rules.message) === null || _rules$message2 === void 0 ? void 0 : _rules$message2.invalid) !== null && _rules$message$invali !== void 0 ? _rules$message$invali : message;
      field.setCustomValidity(message);
    }

    // replace message placeholders for 'matches'
    if (matches && matchingField) {
      var _message;
      message = (_message = message) === null || _message === void 0 ? void 0 : _message.replace(/\${targetValue}/g, matchValue).replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
    }
    warnMultiRule(rules, label);
    return message;
  },
  _getFieldRules: function _getFieldRules(fieldName) {
    var rules = this.rules;
    if (rules && rules instanceof Map) {
      return rules.get(fieldName);
    }
    return undefined;
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
  }
};
/* harmony default export */ const Rules = (vtsRules);
/**
 * Displays a warning message if both "pattern" and "matches" properties exist in the field rule.
 *
 * @private
 * @param {import('../types/config/rules').VtsRules[string]} rules - The validation rules for the field.
 * @param {string} label - The label of the field.
 */
function warnMultiRule(rules, label) {
  if ('pattern' in rules && 'matches' in rules) {
    console.warn("Both \"pattern\" and \"matches\" properties exist in the field rule for ".concat(label, ". ") + 'Ignoring the "matches" property.');
  }
}
;// CONCATENATED MODULE: ./src/base/Validation.js
// @ts-check


/** @type {import('../types/base/validation').default} */
var vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map()
  },
  _checkFieldValidity: function _checkFieldValidity(field) {
    field.setCustomValidity('');
    var label = getFieldLabel(field, this.form);
    var fieldData = {
      field: field,
      label: label,
      message: this._validate(field, label)
    };
    this._setValidityData(field, fieldData);
  },
  _reportValidity: function _reportValidity() {
    var data = this._data;
    var validData = Object.fromEntries(data.validFields);
    var invalidData = Object.fromEntries(data.invalidFields);
    var form = this.form;
    var handlers = this.handlers;
    handlers.valid(this["class"].valid, validData, form);
    handlers.invalid(this["class"].invalid, invalidData, form);
  },
  _setValidityData: function _setValidityData(field, data) {
    var fieldName = field.getAttribute('name');
    if (!fieldName) return;
    if (field.validity.valid) {
      this._data.invalidFields["delete"](fieldName);
      this._data.validFields.set(fieldName, data);
    } else {
      this._data.validFields["delete"](fieldName);
      this._data.invalidFields.set(fieldName, data);
    }
  },
  _validate: function _validate(field, label) {
    var _message;
    var message = field.validationMessage;
    var fieldName = field.getAttribute('name');
    if (!fieldName) return message;
    var rules = this._getFieldRules(fieldName);
    var validity = field.validity;
    for (var key in validity) {
      // default rule message object
      var messageConfig = this.message;
      // field specific rule message
      var ruleMsg = rules !== null && rules !== void 0 && rules.message ? rules.message[key] : null;
      var custMsg = ruleMsg !== null && ruleMsg !== void 0 ? ruleMsg : messageConfig[key];
      if (validity[key]) {
        if (validity.valid) {
          // set custom error if rule config exists
          if (rules) message = this._applyRules(rules, field, label);
          // else the field is valid
          else message = custMsg;
        }
        // invalid
        else message = custMsg !== null && custMsg !== void 0 ? custMsg : message;
        break;
      }
    }
    // replace placeholders
    message = (_message = message) === null || _message === void 0 ? void 0 : _message.replace(/\${value}/g, field.value).replace(/\${label}/g, label);
    return message;
  }
};
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
function getResponseMessage_typeof(obj) { "@babel/helpers - typeof"; return getResponseMessage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, getResponseMessage_typeof(obj); }
function getResponseMessage_slicedToArray(arr, i) { return getResponseMessage_arrayWithHoles(arr) || getResponseMessage_iterableToArrayLimit(arr, i) || getResponseMessage_unsupportedIterableToArray(arr, i) || getResponseMessage_nonIterableRest(); }
function getResponseMessage_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function getResponseMessage_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getResponseMessage_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getResponseMessage_arrayLikeToArray(o, minLen); }
function getResponseMessage_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getResponseMessage_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
     * This is the `beforeSend` event handler for the form.
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
      (_submitBtn$parentElem = submitBtn.parentElement) === null || _submitBtn$parentElem === void 0 ? void 0 : _submitBtn$parentElem.append(cancelBtn);
    }
    // Store the original display style of the submit button in session storage.
    var submitBtnDisplay = window.getComputedStyle(submitBtn).display;
    window.sessionStorage.setItem(vtsSessionId, submitBtnDisplay);
    // Set the display of the submit button to "none".
    submitBtn.style.display = 'none';
  },
  complete: function complete(data, response, form) {
    /*
     * This is the `complete` event handler for the form.
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
;// CONCATENATED MODULE: ./src/defaults/handler.js
// @ts-check
/** @type {import("../types/config/handlers").default} */
var vtsHandlers = {
  invalid: showFeedback,
  valid: showFeedback
};

/**
 * @param {string} fieldClass
 * @param  {import("../types/config/handlers").VtsValidationData<string>} data
 * @param {HTMLFormElement} form
 */
function showFeedback(fieldClass, data, form) {
  var _loop = function _loop() {
    var _data$key = data[key],
      field = _data$key.field,
      label = _data$key.label,
      _data$key$message = _data$key.message,
      message = _data$key$message === void 0 ? ' ' : _data$key$message;
    var parent = field.parentNode;
    var sibling = parent === null || parent === void 0 ? void 0 : parent.querySelector(".".concat(fieldClass));

    // field.style.border =
    //   state === 'valid' ? '1px solid #146c43' : '1px solid #b02a37';
    if (sibling) {
      sibling.textContent = message;
    } else {
      var div = document.createElement('div');
      div.classList.add(fieldClass);
      div.textContent = message;
      // div.style.color = state === 'valid' ? '#146c43' : '#b02a37';
      parent === null || parent === void 0 ? void 0 : parent.append(div);
    }
    var validSib = parent === null || parent === void 0 ? void 0 : parent.querySelector(".valid-feedback");
    var invalidSib = parent === null || parent === void 0 ? void 0 : parent.querySelector(".invalid-feedback");

    // if (state === 'valid') {
    //   toggleElementDisplay(validSib, invalidSib);
    // } else {
    //   toggleElementDisplay(invalidSib, validSib);
    // }

    /**
     * @param {Element | null | undefined} show the element to show
     * @param {Element | null | undefined} hide the element to hide
     */
    function toggleElementDisplay(show, hide) {
      if (show instanceof HTMLElement) {
        show.style.display = '';
      }
      if (hide instanceof HTMLElement) {
        hide.style.display = 'none';
      }
    }
  };
  for (var key in data) {
    _loop();
  }
}
/* harmony default export */ const handler = (vtsHandlers);
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
  handlers: handler,
  listen: false,
  message: {
    invalid: 'Invalid ${label}',
    valid: ''
  },
  rules: {},
  stopPropagation: true
};
/* harmony default export */ const defaults = (vtsDefaults);
;// CONCATENATED MODULE: ./src/utils/deepMerge.js
function deepMerge_typeof(obj) { "@babel/helpers - typeof"; return deepMerge_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, deepMerge_typeof(obj); }
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
;// CONCATENATED MODULE: ./src/vts.js
// @ts-check


function vts_typeof(obj) { "@babel/helpers - typeof"; return vts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, vts_typeof(obj); }
function vts_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ vts_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == vts_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function vts_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { vts_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function vts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function vts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, vts_toPropertyKey(descriptor.key), descriptor); } }
function vts_createClass(Constructor, protoProps, staticProps) { if (protoProps) vts_defineProperties(Constructor.prototype, protoProps); if (staticProps) vts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function vts_toPropertyKey(arg) { var key = vts_toPrimitive(arg, "string"); return vts_typeof(key) === "symbol" ? key : String(key); }
function vts_toPrimitive(input, hint) { if (vts_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (vts_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }












/// <reference path="./Vts.d.ts" />
var _init = /*#__PURE__*/new WeakSet();
var Vts = /*#__PURE__*/function () {
  /**
   * @param {string | HTMLFormElement} form
   * @param {import('./types/config/index.js').default} [config={}]
   */
  function Vts(_form) {
    var _config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    vts_classCallCheck(this, Vts);
    /**
     * @param {HTMLFormElement} form
     * @param {import('./types/config/index.js').default} config
     * @this {import('./types/base').default} Vts
     * @memberof Vts
     */
    _classPrivateMethodInitSpec(this, _init);
    var elem = this.form = VtsFormValidator.validateForm(_form);
    this.fields = elem.querySelectorAll('[name]:not([data-vts-ignored])');
    // @ts-ignore
    _classPrivateMethodGet(this, _init, _init2).call(this, elem, _config);
  }
  vts_createClass(Vts, null, [{
    key: "setDefaults",
    value:
    /**
     * @static
     * @param {import('./types/config/index.js').default} config
     * @memberof Vts
     */
    function setDefaults(config) {
      deepMerge(defaults, config);
    }

    /**
     * @static
     * @param {string} formId
     * @memberof Vts
     */
  }, {
    key: "getInstance",
    value: function getInstance(formId) {
      return _classStaticPrivateFieldSpecGet(Vts, Vts, _instances).get(formId);
    }

    /**
     * @static
     * @param {string} formId
     * @param {import('./types/config/index.js').default} [config={}]
     * @returns {Vts}
     * @memberof Vts
     */
  }, {
    key: "getOrCreateInstance",
    value: function getOrCreateInstance(formId) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var hasInstance = _classStaticPrivateFieldSpecGet(Vts, Vts, _instances).get(formId);
      return hasInstance ? hasInstance : new Vts(formId, config);
    }

    /**
     * @static
     * @param {string} formId
     * @returns {boolean}
     * @memberof Vts
     */
  }, {
    key: "removeInstance",
    value: function removeInstance(formId) {
      return _classStaticPrivateFieldSpecGet(Vts, Vts, _instances)["delete"](formId);
    }

    /**
     * @param {Response} response
     * @returns {Promise<any>}
     */
  }, {
    key: "getResponseData",
    value: function () {
      var _getResponseData = vts_asyncToGenerator( /*#__PURE__*/vts_regeneratorRuntime().mark(function _callee(response) {
        return vts_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", getResponseData_getResponseData(response));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
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
  }, {
    key: "getResponseMessage",
    value: function getResponseMessage(data, response, defaultResponseMessages) {
      return getResponseMessage_getResponseMessage(data, response, defaultResponseMessages);
    }
  }]);
  return Vts;
}();
function _init2(form, config) {
  // mixin
  Object.assign(this, Form, setVtsConfig(form, config));
  Object.assign(Vts.prototype, Events, Rules, Validation);
  this._convertRulesToMap();
  this._addEventListeners();
  var formId = form.getAttribute('id');
  var id = formId || 'Vts_form_' + _classStaticPrivateFieldSpecGet(Vts, Vts, _instances).size;
  // @ts-ignore
  _classStaticPrivateFieldSpecGet(Vts, Vts, _instances).set(id, this);
}
/**
 * @static
 * @type {Map<string, Vts>}
 * @memberof Vts
 */
var _instances = {
  writable: true,
  value: new Map()
};


/***/ }),

/***/ 147:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports Headers, Request, Response, DOMException, fetch */
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
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
  reader.readAsText(blob)
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
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
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

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
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
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

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
  this.signal = options.signal || this.signal
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
        headers.append(key, value)
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
  var response = new Response(null, {status: 0, statusText: ''})
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

var DOMException = global.DOMException
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
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
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
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
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
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
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

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
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
/******/ 	var __webpack_exports__ = __webpack_require__(186);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});