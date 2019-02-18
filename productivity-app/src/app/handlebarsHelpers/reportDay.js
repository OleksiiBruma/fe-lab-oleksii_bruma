module.exports = function (date) {
  return new Date(date).toISOString().slice(0, 10);
};
