var AbstractEmployee = require('./AbstractEmployee.js').AbstractEmployee;

function FixedSalaryEmployee(id,name,salary){
    AbstractEmployee.apply(this, arguments);
    this.salary = salary;
};
FixedSalaryEmployee.prototype = Object.create(AbstractEmployee.prototype);
FixedSalaryEmployee.prototype.getSallary = function (){
    return this.salary;
}
FixedSalaryEmployee.prototype.constructor = FixedSalaryEmployee;
module.exports.FixedSalaryEmployee = FixedSalaryEmployee;