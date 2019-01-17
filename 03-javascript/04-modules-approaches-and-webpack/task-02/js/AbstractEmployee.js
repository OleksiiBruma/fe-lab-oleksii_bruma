function AbstractEmployee(id,name,salary) {
    if (this.constructor === AbstractEmployee) {
        throw new Error("Can't instantiate abstract class!")
    }
    if(typeof id !== "string" || typeof name !== "string" || typeof salary !== "number"){
        throw new Error("passed param doesn't match requirements");
    }
    this.id = id;
    this.name = name;
    this.salary = salary;
};

module.exports.AbstractEmployee = AbstractEmployee;