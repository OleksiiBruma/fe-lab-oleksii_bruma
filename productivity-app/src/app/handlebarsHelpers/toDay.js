module.exports = function (date) {
  if (new Date(date).getUTCDate() === new Date().getUTCDate()) {

  } else return new Date(date).getDate();
};
