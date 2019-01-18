var PerHourSalaryEmployee = require('./PerHourSalaryEmployee.js').PerHourSalaryEmployee;
var FixedSalaryEmployee = require('./FixedSalaryEmployee.js').FixedSalaryEmployee;
function EmployeeCollection (collection) {
    this.data = [];
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].type === "per-hour") {
            var PerHourSalary = new PerHourSalaryEmployee("" + i, collection[i].name, +collection[i].salary);
            this.data.push(PerHourSalary);
        }
        if (collection[i].type === "fixed") {
            var FixedSalary = new FixedSalaryEmployee("" + i, collection[i].name, +collection[i].salary);
            this.data.push(FixedSalary);

        }
        this.sorted = this.data.sort(function (a, b) {
            if (a.salary < b.salary) return -1;
            else if (a.salary > b.salary) return 1;
            else {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
            }
        });
        this.getCollectionData = function () {
            return this.sorted;
        };
        this.getFiveNames = function () {
            var fiveNames = [];
            for (var employee = 0; employee < 5; employee++) {
                fiveNames.push(this.sorted[employee].name);
            }
            return fiveNames;
        }
        this.getThreeIds = function () {
            var threeIds = [];
            for (var employee = this.sorted.length; employee > this.sorted.length - 3; employee--) {
                threeIds.push("id" + this.sorted[employee - 1].id);
            }
            return threeIds;
        }
        this.getCollectionAverage = function(){
            var total = this.sorted.reduce(function (amountSalary, currentEmployee){
                console.log(amountSalary);
                return  amountSalary + +currentEmployee.salary;

            },0);
            return total.toFixed(1)/this.sorted.length;
        }
    }
}


module.exports.EmployeeCollection = EmployeeCollection;