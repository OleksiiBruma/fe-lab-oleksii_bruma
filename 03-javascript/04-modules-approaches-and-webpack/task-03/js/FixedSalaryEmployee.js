import {AbstractEmployee} from './AbstractEmployee.js';

export class FixedSalaryEmployee extends  AbstractEmployee{
constructor(id,name,salary){
    super(id,name,salary);
    this.salary = salary;
}
    getSalary(){return this.salary};
}

