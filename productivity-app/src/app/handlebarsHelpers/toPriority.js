module.exports = function (priority) {
  switch (priority) {
    case 1:
      return "urgent";
    case 2:
      return "high";
    case 3:
      return "middle";
    case 4:
      return "low";
    default:
      throw("priority is not a number!");
  }
};
