import {PerHourSalaryEmployee} from'./PerHourSalaryEmployee.js';
import {FixedSalaryEmployee} from './FixedSalaryEmployee.js';
export class EmployeeCollection {
    constructor(collection) {
        this.data = [];
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].type === "per-hour") {
                let PerHourSalary = new PerHourSalaryEmployee("" + i, collection[i].name, +collection[i].salary);
                this.data.push(PerHourSalary);
            }
            if (collection[i].type === "fixed") {
                let FixedSalary = new FixedSalaryEmployee("" + i, collection[i].name, +collection[i].salary);
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
        }
    }

    getCollectionData() {
        return this.sorted;
    };

    getFiveNames() {
        let fiveNames = [];
        for (let employee = 0; employee < 5; employee++) {
            fiveNames.push(this.sorted[employee].name);
        }
        return fiveNames;
    };

    getThreeIds() {
        let threeIds = [];
        for (let employee = this.sorted.length; employee > this.sorted.length - 3; employee--) {
            threeIds.push("id" + this.sorted[employee - 1].id);
        }
        return threeIds
    } ;

    getCollectionAverage() {
        let total = this.sorted.reduce(function (amountSalary, currentEmployee) {
            return amountSalary + +currentEmployee.salary;
        }, 0);
        return total.toFixed(1) / this.sorted.length;
    }
}