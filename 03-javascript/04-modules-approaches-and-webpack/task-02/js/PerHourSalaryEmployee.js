var AbstractEmployee = require('./AbstractEmployee.js').AbstractEmployee;

function PerHourSalaryEmployee(id,name,salary){
    AbstractEmployee.apply(this, arguments);
    this.salary = (20.88 * 8 * this.salary).toFixed(2);
};
PerHourSalaryEmployee.prototype = Object.create(AbstractEmployee.prototype);
PerHourSalaryEmployee.prototype.getSallary = function (){
    return 20.88 * 8 * this.salary;
}
PerHourSalaryEmployee.prototype.constructor = PerHourSalaryEmployee;
module.exports.PerHourSalaryEmployee = PerHourSalaryEmployee;

