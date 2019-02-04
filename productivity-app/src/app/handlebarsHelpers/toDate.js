module.exports = function (date) {
  if(new Date(date).getUTCDate()=== new Date().getUTCDate()){
    return "today"
  }
  else return new Date(date).getUTCDate();
};
