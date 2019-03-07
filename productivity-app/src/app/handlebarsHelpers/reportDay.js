module.exports = function (date) {
  return new Date(date).toString().slice(0, 10);
};
