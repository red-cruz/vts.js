(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ValidateThenSubmit"] = factory();
	else
		root["ValidateThenSubmit"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ValidateThenSubmit)
});

;// CONCATENATED MODULE: ./src/utils/VtsFormValidator.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-check
/** @type {string[]} - form Ids */
var vtsInstances = [];

/**
 * Utility class for form type validation and instance checking.
 * @abstract
 */
var VtsFormValidator = /*#__PURE__*/function () {
  function VtsFormValidator() {
    _classCallCheck(this, VtsFormValidator);
  }
  _createClass(VtsFormValidator, null, [{
    key: "checkInstance",
    value:
    /**
     * Checks if there is an existing instance associated with the provided form ID.
     * Throws an error if an instance already exists for the form ID.
     * If no instance exists, it adds the form ID to the instances array.
     *
     * @param {string} formId - The ID of the form element to check for an existing instance.
     * @throws {Error} Throws an error if an instance already exists for the specified form ID.
     */
    function checkInstance(formId) {
      // Check if an instance already exists for the form ID
      if (vtsInstances.includes(formId)) {
        throw new Error("An instance already exists for the specified form element: ".concat(formId));
      }

      // Add the form ID to the instances array
      vtsInstances.push(formId);
    }

    /**
     * Retrieves the form element with the provided form ID and checks its validity.
     *
     * @param {string} formId - The ID of the form element to retrieve and check.
     * @returns {HTMLFormElement} The valid HTML form element.
     * @throws {TypeError} Throws a TypeError if the form element is not found or is not a valid HTML form element.
     */
  }, {
    key: "validateForm",
    value: function validateForm(formId) {
      var form = document.getElementById(formId);

      // Check if form element exists
      if (!form) {
        throw new TypeError("The form element with ID \"".concat(formId, "\" was not found."));
      }

      // Check if form element is a valid HTML form element
      if (!(form instanceof HTMLFormElement)) {
        throw new TypeError("The element with ID \"".concat(formId, "\" is not a valid HTML form element.\n        Please ensure you are passing the ID of a valid form element."));
      }
      return form;
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

;// CONCATENATED MODULE: ./src/mixins/Events.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// @t


/** @type {import('../ValidateThenSubmit').VtsEventsMixin} */
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
      var shouldListen = _this.listen;
      var wasValidated = form.classList.contains(_this.validatedClass);
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
      _this.form.classList.add(_this.validatedClass);
      if (_this.isFormValid() && !_this.halt) {
        _this.submit();
      }
    });

    // Fields
    var shouldListen = this.listen;
    shouldListen && _addFieldListener();

    // Match events
    this._attachMatchEvents();
  },
  _addFieldListener: function _addFieldListener() {
    var _this2 = this;
    this.fields.forEach(function (field) {
      var rules = _this2._getFieldRules(field.name);
      var eventType = _this2._getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
      field.addEventListener(eventType, function () {
        _this2._checkFieldValidity(field);
        _this2._reportValidity();
      });
    });
  },
  _attachMatchEvents: function _attachMatchEvents() {
    var _this3 = this;
    var _iterator2 = _createForOfIteratorHelper(this.rules.entries()),
      _step2;
    try {
      var _loop = function _loop() {
        var _step2$value = _slicedToArray(_step2.value, 2),
          fieldName = _step2$value[0],
          rule = _step2$value[1];
        var match = rule.match;
        var form = _this3.form;
        var field = form.querySelector("[name=\"".concat(fieldName, "\"]"));
        var rules = _this3._getFieldRules(fieldName);
        var eventType = _this3._getEventType(field.type, rules === null || rules === void 0 ? void 0 : rules.eventType);
        if (match) {
          var inputEvent = new Event(eventType);
          var matchField = VtsFormValidator.validateField(form, match);
          form.querySelector("[name=\"".concat(match, "\"]"));
          matchField.addEventListener(eventType, function () {
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
;// CONCATENATED MODULE: ./src/mixins/Rules.js
// @ts-check



/** @type {import('../ValidateThenSubmit').VtsRulesMixin} */
var vtsRules = {
  _applyRules: function _applyRules(rules, field, label) {
    var message = this.message.invalid || 'Invalid field';
    var pattern = 'pattern' in rules ? rules.pattern : '';
    var isMatch = 'match' in rules && !pattern;
    /** @type {*} */
    var matchingField;
    var matchValue = '';
    if (isMatch) {
      var _rules$flags;
      // get matching field target
      matchingField = VtsFormValidator.validateField(this.form, rules.match);
      // get value of target field
      matchValue = matchingField.value;
      // overwrite pattern
      pattern = (_rules$flags = rules.flags) !== null && _rules$flags !== void 0 && _rules$flags.includes('g') ? matchValue + '\\b' : "^".concat(matchValue, "$");
    }

    // set validity
    var regExp = new RegExp(pattern, rules.flags);
    if (regExp.test(field.value)) {
      var _ref, _rules$message$valid, _rules$message;
      message = (_ref = (_rules$message$valid = (_rules$message = rules.message) === null || _rules$message === void 0 ? void 0 : _rules$message.valid) !== null && _rules$message$valid !== void 0 ? _rules$message$valid : this.message.valid) !== null && _ref !== void 0 ? _ref : '';
      field.setCustomValidity('');
    } else {
      var _rules$message$invali, _rules$message2;
      message = (_rules$message$invali = (_rules$message2 = rules.message) === null || _rules$message2 === void 0 ? void 0 : _rules$message2.invalid) !== null && _rules$message$invali !== void 0 ? _rules$message$invali : message;
      field.setCustomValidity(message);
    }

    // replace message placeholders for 'match'
    if ('match' in rules) {
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
 * Displays a warning message if both "pattern" and "match" properties exist in the field rule.
 *
 * @private
 * @param {import('../types/rules').VtsRules[string]} rules - The validation rules for the field.
 * @param {string} label - The label of the field.
 */
function warnMultiRule(rules, label) {
  if ('pattern' in rules && 'match' in rules) {
    console.warn("Both \"pattern\" and \"match\" properties exist in the field rule for ".concat(label, ". ") + 'Ignoring the "match" property.');
  }
}
;// CONCATENATED MODULE: ./src/mixins/Validation.js


/** @type {import('../types/validation').VtsValidation} */
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
    var fnValid = this.fnValid;
    var fnInvalid = this.fnInvalid;
    fnValid(validData, form);
    fnInvalid(invalidData, form);
  },
  _setValidityData: function _setValidityData(field, data) {
    if (field.validity.valid) {
      this._data.invalidFields["delete"](field.name);
      this._data.validFields.set(field.name, data);
    } else {
      this._data.validFields["delete"](field.name);
      this._data.invalidFields.set(field.name, data);
    }
  },
  _validate: function _validate(field, label) {
    var _message;
    var message = field.validationMessage;
    var rules = this._getFieldRules(field.name);
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
;// CONCATENATED MODULE: ./src/utils/defaults.js
// @ts-check


/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../ValidateThenSubmit').VtsConfig}
 */
var vtsDefaults = {
  ajax: {
    action: '',
    request: {},
    beforeSend: function beforeSend(requestInit, abortController, form) {},
    complete: function complete(form) {},
    error: function error(errorData, errorResponse, form) {
      var data = errorData ? errorData : {};
      var title = 'message' in errorResponse ? errorResponse.message : 'Error!';
      var html = 'stack' in errorResponse ? errorResponse.stack : 'Unknown error occurred';
      console.table(errorResponse);
      var text = data.title || title;
      var ok = confirm(text + ':\n' + 'Click "ok" to view more details.');
      if (ok) {
        var _data$html;
        var newWindow = window.open();
        if (newWindow) newWindow.document.body.innerHTML = (_data$html = data.html) !== null && _data$html !== void 0 ? _data$html : html;
      }
    },
    success: function success(data, response, form) {
      alert(data.title + ':\n' + data.text);
      form.reset();

      /** @type {NodeListOf<HTMLElement>} */
      var fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
      fields.forEach(function (field) {
        field.style.border = '';
        field.remove;
      });
      form.classList.remove('was-validated');
    }
  },
  fnValid: function fnValid(data, form) {
    showFeedback('valid', data);
  },
  fnInvalid: function fnInvalid(data, form) {
    showFeedback('invalid', data);
  },
  halt: false,
  listen: false,
  rules: {},
  message: {
    invalid: 'Invalid ${label}',
    valid: ''
  },
  stopPropagation: true,
  validatedClass: 'was-validated'
};

/**
 * @param {string} state
 * @param {any} data
 */
function showFeedback(state, data) {
  var _loop = function _loop() {
    var _data$key = data[key],
      field = _data$key.field,
      label = _data$key.label,
      _data$key$message = _data$key.message,
      message = _data$key$message === void 0 ? ' ' : _data$key$message;
    var parent = field.parentNode;
    var className = "".concat(state, "-feedback");
    var sibling = parent === null || parent === void 0 ? void 0 : parent.querySelector(".".concat(className));

    // field.style.border =
    //   state === 'valid' ? '1px solid #146c43' : '1px solid #b02a37';
    if (sibling) {
      sibling.textContent = "".concat(message);
    } else {
      var div = document.createElement('div');
      div.classList.add("".concat(className));
      div.textContent = "".concat(message);
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
 * @param {Partial<import('../ValidateThenSubmit').VtsConfig>} config - The partial configuration options.
 * @returns {import('../ValidateThenSubmit').VtsConfig} - The merged configuration options.
 */
function setVtsConfig(form, config) {
  /** @type {import('../types/config').VtsConfig} */
  var options = deepMerge({}, defaults, config);

  /** @type {Partial<import('../types/config').VtsAjaxSettings>} */
  var ajax = options.ajax;
  options.ajax.action = ajax.action || form.action;
  var req = ajax.request;
  /** @type {RequestInit} */
  var request = {
    method: (req === null || req === void 0 ? void 0 : req.method) || form.method || 'get',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  /** @type {RequestInit} */
  var merge = deepMerge(req, request);
  options.ajax.request = merge;
  return options;
}
;// CONCATENATED MODULE: ./src/mixins/Form.js
function Form_typeof(obj) { "@babel/helpers - typeof"; return Form_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Form_typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == Form_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function Form_slicedToArray(arr, i) { return Form_arrayWithHoles(arr) || Form_iterableToArrayLimit(arr, i) || Form_unsupportedIterableToArray(arr, i) || Form_nonIterableRest(); }
function Form_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function Form_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Form_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Form_arrayLikeToArray(o, minLen); }
function Form_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Form_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function Form_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/** @type {import('../ValidateThenSubmit').VtsForm} */
var vtsForm = {
  isFormValid: function isFormValid() {
    return this.form.checkValidity();
  },
  submit: function submit() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var ajax, form, url, _vtsFormBeforeSend$ca, _vtsFormBeforeSend$ca2, response, contentType, _yield$Promise$all, _yield$Promise$all2, data, rawResponse, _this$ajax$request, errorData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            ajax = _this.ajax;
            form = _this.form;
            _context.prev = 2;
            url = ajax.action;
            _vtsFormBeforeSend$ca = vtsFormBeforeSend.call(_this, url, ajax.request);
            _vtsFormBeforeSend$ca2 = Form_slicedToArray(_vtsFormBeforeSend$ca, 2);
            url = _vtsFormBeforeSend$ca2[0];
            ajax.request = _vtsFormBeforeSend$ca2[1];
            _context.next = 10;
            return fetch(new Request(url, ajax.request));
          case 10:
            response = _context.sent;
            if (response.ok) {
              _context.next = 13;
              break;
            }
            throw new Error(response.statusText);
          case 13:
            contentType = response.headers.get('content-type');
            if (!(contentType && contentType.includes('application/json'))) {
              _context.next = 24;
              break;
            }
            _context.next = 17;
            return Promise.all([response.json(), response]);
          case 17:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = Form_slicedToArray(_yield$Promise$all, 2);
            data = _yield$Promise$all2[0];
            rawResponse = _yield$Promise$all2[1];
            ajax.success(data, rawResponse, form);
            _context.next = 25;
            break;
          case 24:
            throw new TypeError('Response is not in JSON format');
          case 25:
            _context.next = 44;
            break;
          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](2);
            if (!(_context.t0 instanceof Response)) {
              _context.next = 41;
              break;
            }
            _context.prev = 30;
            _context.next = 33;
            return _context.t0.json();
          case 33:
            errorData = _context.sent;
            _context.next = 39;
            break;
          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](30);
            errorData = _context.t1;
          case 39:
            _context.next = 42;
            break;
          case 41:
            errorData = null;
          case 42:
            ajax.error(errorData, _context.t0, form);
            if ((_this$ajax$request = _this.ajax.request) !== null && _this$ajax$request !== void 0 && (_this$ajax$request = _this$ajax$request.signal) !== null && _this$ajax$request !== void 0 && _this$ajax$request.aborted) _this.ajax.abortController = new AbortController();
          case 44:
            ajax.complete(form);
          case 45:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 27], [30, 36]]);
    }))();
  }
};

/**
 * @description
 * @author RED
 * @param {string} url
 * @param {RequestInit} request
 * @returns {[url, request]}
 * @this {import('../ValidateThenSubmit').default}
 */
function vtsFormBeforeSend(url, request) {
  var formData = new FormData(this.form);
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;
  request = this.ajax.request = this.ajax.beforeSend(this.ajax.request, this.ajax.abortController, this.form) || request;
  var get = new RegExp('get', 'i');
  var isGetMethod = get.test(request.method);
  if (isGetMethod) {
    var query = new URLSearchParams(formData.toString());
    url = this.ajax.action = "".concat(url, "/?").concat(query);
  } else {
    request.body = formData;
  }
  return [url, request];
}
/* harmony default export */ const Form = (vtsForm);
;// CONCATENATED MODULE: ./src/ValidateThenSubmit.js
function ValidateThenSubmit_typeof(obj) { "@babel/helpers - typeof"; return ValidateThenSubmit_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ValidateThenSubmit_typeof(obj); }
function ValidateThenSubmit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ValidateThenSubmit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ValidateThenSubmit_toPropertyKey(descriptor.key), descriptor); } }
function ValidateThenSubmit_createClass(Constructor, protoProps, staticProps) { if (protoProps) ValidateThenSubmit_defineProperties(Constructor.prototype, protoProps); if (staticProps) ValidateThenSubmit_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ValidateThenSubmit_toPropertyKey(arg) { var key = ValidateThenSubmit_toPrimitive(arg, "string"); return ValidateThenSubmit_typeof(key) === "symbol" ? key : String(key); }
function ValidateThenSubmit_toPrimitive(input, hint) { if (ValidateThenSubmit_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (ValidateThenSubmit_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
// @ts-check









/// <reference path="./ValidateThenSubmit.d.ts" />
var _init = /*#__PURE__*/new WeakSet();
var ValidateThenSubmit = /*#__PURE__*/function () {
  function ValidateThenSubmit(formId) {
    var _config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    ValidateThenSubmit_classCallCheck(this, ValidateThenSubmit);
    _classPrivateMethodInitSpec(this, _init);
    var _form = VtsFormValidator.validateForm(formId);
    this.fields = _form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = _form;
    _classPrivateMethodGet(this, _init, _init2).call(this, _config);
  }
  ValidateThenSubmit_createClass(ValidateThenSubmit, null, [{
    key: "setDefaults",
    value: function setDefaults(config) {
      deepMerge(defaults, config);
    }
  }]);
  return ValidateThenSubmit;
}();
function _init2(config) {
  var form = this.form;
  // mixin
  Object.assign(this, Form, setVtsConfig(form, config));
  Object.assign(ValidateThenSubmit.prototype, Events, Rules, Validation);

  // check instance
  VtsFormValidator.checkInstance(form.id);
  this._convertRulesToMap();
  this._addEventListeners();
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});