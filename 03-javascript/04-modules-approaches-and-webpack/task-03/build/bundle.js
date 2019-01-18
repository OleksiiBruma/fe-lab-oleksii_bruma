/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/AbstractEmployee.js":
/*!********************************!*\
  !*** ./js/AbstractEmployee.js ***!
  \********************************/
/*! exports provided: AbstractEmployee */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractEmployee\", function() { return AbstractEmployee; });\nclass AbstractEmployee {\r\n    constructor(id,name,salary){\r\n    if (this.constructor === AbstractEmployee) {\r\n        throw new Error(\"Can't instantiate abstract class!\")\r\n    }\r\n    if(typeof id !== \"string\" || typeof name !== \"string\" || typeof salary !== \"number\"){\r\n        throw new Error(\"passed param doesn't match requirements\");\r\n    }\r\n    this.id = id;\r\n    this.name = name;\r\n    this.salary = salary;}\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/AbstractEmployee.js?");

/***/ }),

/***/ "./js/EmployeeCollection.js":
/*!**********************************!*\
  !*** ./js/EmployeeCollection.js ***!
  \**********************************/
/*! exports provided: EmployeeCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EmployeeCollection\", function() { return EmployeeCollection; });\n/* harmony import */ var _PerHourSalaryEmployee_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PerHourSalaryEmployee.js */ \"./js/PerHourSalaryEmployee.js\");\n/* harmony import */ var _FixedSalaryEmployee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FixedSalaryEmployee.js */ \"./js/FixedSalaryEmployee.js\");\n\r\n\r\nclass EmployeeCollection {\r\n    constructor(collection) {\r\n        this.data = [];\r\n        for (let i = 0; i < collection.length; i++) {\r\n            if (collection[i].type === \"per-hour\") {\r\n                let PerHourSalary = new _PerHourSalaryEmployee_js__WEBPACK_IMPORTED_MODULE_0__[\"PerHourSalaryEmployee\"](\"\" + i, collection[i].name, +collection[i].salary);\r\n                this.data.push(PerHourSalary);\r\n            }\r\n            if (collection[i].type === \"fixed\") {\r\n                let FixedSalary = new _FixedSalaryEmployee_js__WEBPACK_IMPORTED_MODULE_1__[\"FixedSalaryEmployee\"](\"\" + i, collection[i].name, +collection[i].salary);\r\n                this.data.push(FixedSalary);\r\n\r\n            }\r\n            this.sorted = this.data.sort(function (a, b) {\r\n                if (a.salary < b.salary) return -1;\r\n                else if (a.salary > b.salary) return 1;\r\n                else {\r\n                    if (a.name > b.name) return 1;\r\n                    else if (a.name < b.name) return -1;\r\n                }\r\n            });\r\n        }\r\n    }\r\n\r\n    getCollectionData() {\r\n        return this.sorted;\r\n    };\r\n\r\n    getFiveNames() {\r\n        let fiveNames = [];\r\n        for (let employee = 0; employee < 5; employee++) {\r\n            fiveNames.push(this.sorted[employee].name);\r\n        }\r\n        return fiveNames;\r\n    };\r\n\r\n    getThreeIds() {\r\n        let threeIds = [];\r\n        for (let employee = this.sorted.length; employee > this.sorted.length - 3; employee--) {\r\n            threeIds.push(\"id\" + this.sorted[employee - 1].id);\r\n        }\r\n        return threeIds\r\n    } ;\r\n\r\n    getCollectionAverage() {\r\n        let total = this.sorted.reduce(function (amountSalary, currentEmployee) {\r\n            return amountSalary + +currentEmployee.salary;\r\n        }, 0);\r\n        return total.toFixed(1) / this.sorted.length;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/EmployeeCollection.js?");

/***/ }),

/***/ "./js/FixedSalaryEmployee.js":
/*!***********************************!*\
  !*** ./js/FixedSalaryEmployee.js ***!
  \***********************************/
/*! exports provided: FixedSalaryEmployee */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FixedSalaryEmployee\", function() { return FixedSalaryEmployee; });\n/* harmony import */ var _AbstractEmployee_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractEmployee.js */ \"./js/AbstractEmployee.js\");\n\r\n\r\nclass FixedSalaryEmployee extends  _AbstractEmployee_js__WEBPACK_IMPORTED_MODULE_0__[\"AbstractEmployee\"]{\r\nconstructor(id,name,salary){\r\n    super(id,name,salary);\r\n    this.salary = salary;\r\n}\r\n    getSalary(){return this.salary};\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./js/FixedSalaryEmployee.js?");

/***/ }),

/***/ "./js/PerHourSalaryEmployee.js":
/*!*************************************!*\
  !*** ./js/PerHourSalaryEmployee.js ***!
  \*************************************/
/*! exports provided: PerHourSalaryEmployee */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PerHourSalaryEmployee\", function() { return PerHourSalaryEmployee; });\n/* harmony import */ var _AbstractEmployee_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractEmployee.js */ \"./js/AbstractEmployee.js\");\n\r\n\r\nclass PerHourSalaryEmployee extends _AbstractEmployee_js__WEBPACK_IMPORTED_MODULE_0__[\"AbstractEmployee\"]{\r\n    constructor (id,name,salary) {\r\n        super(id, name, salary)\r\n        this.salary = (20.88 * 8 * this.salary).toFixed(2);\r\n    }\r\n    getSalary(){\r\n        return 20.88 * 8 * this.salary;\r\n    }\r\n    }\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/PerHourSalaryEmployee.js?");

/***/ }),

/***/ "./js/employees-collection.json":
/*!**************************************!*\
  !*** ./js/employees-collection.json ***!
  \**************************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

eval("module.exports = [{\"type\":\"per-hour\",\"salary\":10,\"name\":\"Anna\"},{\"type\":\"per-hour\",\"salary\":8,\"name\":\"Bob\"},{\"type\":\"fixed\",\"salary\":8000,\"name\":\"Dany\"},{\"type\":\"fixed\",\"salary\":8000,\"name\":\"Clara\"},{\"type\":\"fixed\",\"salary\":1000,\"name\":\"Egor\"}];\n\n//# sourceURL=webpack:///./js/employees-collection.json?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EmployeeCollection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EmployeeCollection.js */ \"./js/EmployeeCollection.js\");\n/* harmony import */ var _employees_collection_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employees-collection.json */ \"./js/employees-collection.json\");\nvar _employees_collection_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./employees-collection.json */ \"./js/employees-collection.json\", 1);\n\r\n\r\nlet collectionData = new _EmployeeCollection_js__WEBPACK_IMPORTED_MODULE_0__[\"EmployeeCollection\"](_employees_collection_json__WEBPACK_IMPORTED_MODULE_1__);\r\nlet fiveNames = document.getElementById(\"five-names\");\r\nlet threeIds = document.getElementById(\"three-ids\");\r\nlet collectionAverage = document.getElementById(\"collection-average\");\r\nlet collectionContent = document.getElementById(\"collection-content\");\r\nfiveNames.textContent = collectionData.getFiveNames().join(\", \");\r\nthreeIds.textContent =  collectionData.getThreeIds().join(\", \");\r\ncollectionAverage.textContent = collectionData.getCollectionAverage();\r\ncollectionContent.textContent = JSON.stringify(collectionData.sorted, null, 2)\r\n\r\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });