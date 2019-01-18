import {AbstractEmployee} from './AbstractEmployee.js';

export class PerHourSalaryEmployee extends AbstractEmployee{
    constructor (id,name,salary) {
        super(id, name, salary)
        this.salary = (20.88 * 8 * this.salary).toFixed(2);
    }
    getSalary(){
        return 20.88 * 8 * this.salary;
    }
    }



