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
/*! no static exports found */
/***/ (function(module, exports) {

eval("function AbstractEmployee(id,name,salary) {\r\n    if (this.constructor === AbstractEmployee) {\r\n        throw new Error(\"Can't instantiate abstract class!\")\r\n    }\r\n    if(typeof id !== \"string\" || typeof name !== \"string\" || typeof salary !== \"number\"){\r\n        throw new Error(\"passed param doesn't match requirements\");\r\n    }\r\n    this.id = id;\r\n    this.name = name;\r\n    this.salary = salary;\r\n};\r\n\r\nmodule.exports.AbstractEmployee = AbstractEmployee;\n\n//# sourceURL=webpack:///./js/AbstractEmployee.js?");

/***/ }),

/***/ "./js/EmployeeCollection.js":
/*!**********************************!*\
  !*** ./js/EmployeeCollection.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var PerHourSalaryEmployee = __webpack_require__(/*! ./PerHourSalaryEmployee.js */ \"./js/PerHourSalaryEmployee.js\").PerHourSalaryEmployee;\r\nvar FixedSalaryEmployee = __webpack_require__(/*! ./FixedSalaryEmployee.js */ \"./js/FixedSalaryEmployee.js\").FixedSalaryEmployee;\r\nfunction EmployeeCollection (collection) {\r\n    this.data = [];\r\n    for (var i = 0; i < collection.length; i++) {\r\n        if (collection[i].type === \"per-hour\") {\r\n            var PerHourSalary = new PerHourSalaryEmployee(\"\" + i, collection[i].name, collection[i].salary);\r\n            this.data.push(PerHourSalary);\r\n        }\r\n        if (collection[i].type === \"fixed\") {\r\n            var FixedSalary = new FixedSalaryEmployee(\"\" + i, collection[i].name, collection[i].salary);\r\n            this.data.push(FixedSalary);\r\n        }\r\n        this.sorted = this.data.sort(function (a, b) {\r\n            if (a.salary < b.salary) return -1;\r\n            else if (a.salary > b.salary) return 1;\r\n            else {\r\n                if (a.name > b.name) return 1;\r\n                else if (a.name < b.name) return -1;\r\n            }\r\n        });\r\n        this.getCollectionData = function () {\r\n            return this.sorted;\r\n        };\r\n        this.getFiveNames = function () {\r\n            var fiveNames = [];\r\n            for (var employee = 0; employee < 5; employee++) {\r\n                fiveNames.push(this.sorted[employee].name);\r\n            }\r\n            return fiveNames;\r\n        }\r\n        this.getThreeIds = function () {\r\n            var threeIds = [];\r\n            for (var employee = this.sorted.length; employee > this.sorted.length - 3; employee--) {\r\n                threeIds.push(\"id\" + this.sorted[employee - 1].id);\r\n            }\r\n            return threeIds;\r\n        }\r\n        this.getCollectionAverage = function(){\r\n            var total = this.sorted.reduce(function (amountSalary, currentEmployee){\r\n                return amountSalary + currentEmployee.salary;\r\n            },0);\r\n            return (total/this.sorted.length).toFixed(2);\r\n        }\r\n    }\r\n}\r\n\r\n\r\nmodule.exports.EmployeeCollection = EmployeeCollection;\n\n//# sourceURL=webpack:///./js/EmployeeCollection.js?");

/***/ }),

/***/ "./js/FixedSalaryEmployee.js":
/*!***********************************!*\
  !*** ./js/FixedSalaryEmployee.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var AbstractEmployee = __webpack_require__(/*! ./AbstractEmployee.js */ \"./js/AbstractEmployee.js\").AbstractEmployee;\r\n\r\nfunction FixedSalaryEmployee(id,name,salary){\r\n    AbstractEmployee.apply(this, arguments);\r\n    this.salary = salary;\r\n};\r\nFixedSalaryEmployee.prototype = Object.create(AbstractEmployee.prototype);\r\nFixedSalaryEmployee.prototype.getSallary = function (){\r\n    return this.salary;\r\n}\r\nFixedSalaryEmployee.prototype.constructor = FixedSalaryEmployee;\r\nmodule.exports.FixedSalaryEmployee = FixedSalaryEmployee;\n\n//# sourceURL=webpack:///./js/FixedSalaryEmployee.js?");

/***/ }),

/***/ "./js/PerHourSalaryEmployee.js":
/*!*************************************!*\
  !*** ./js/PerHourSalaryEmployee.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var AbstractEmployee = __webpack_require__(/*! ./AbstractEmployee.js */ \"./js/AbstractEmployee.js\").AbstractEmployee;\r\n\r\nfunction PerHourSalaryEmployee(id,name,salary){\r\n    AbstractEmployee.apply(this, arguments);\r\n    this.salary = (20.88 * 8 * this.salary).toFixed(2);\r\n};\r\nPerHourSalaryEmployee.prototype = Object.create(AbstractEmployee.prototype);\r\nPerHourSalaryEmployee.prototype.getSallary = function (){\r\n    return 20.88 * 8 * this.salary;\r\n}\r\nPerHourSalaryEmployee.prototype.constructor = PerHourSalaryEmployee;\r\nmodule.exports.PerHourSalaryEmployee = PerHourSalaryEmployee;\r\n\r\n\n\n//# sourceURL=webpack:///./js/PerHourSalaryEmployee.js?");

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EmployeeCollection = __webpack_require__(/*! ./EmployeeCollection.js */ \"./js/EmployeeCollection.js\").EmployeeCollection;\r\nvar EmployeeData = __webpack_require__(/*! ./employees-collection.json */ \"./js/employees-collection.json\");\r\nvar collection = new EmployeeCollection(EmployeeData);\r\nvar fiveNames = document.getElementById(\"five-names\");\r\nvar threeIds = document.getElementById(\"three-ids\");\r\nvar collectionAverage = document.getElementById(\"collection-average\");\r\nvar collectionContent = document.getElementById(\"collection-content\");\r\nfiveNames.textContent = collection.getFiveNames().join(\", \");\r\nthreeIds.textContent =  collection.getThreeIds().join(\", \");\r\ncollectionAverage.textContent = collection.getCollectionAverage();\r\ncollectionContent.textContent = JSON.stringify(collection.sorted, null, 2)\r\n\r\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });