module.exports = function (date) {
  if (new Date(date).getUTCDate() === new Date().getUTCDate()) {
    return
  } else return new Date(date).getDate();
};
