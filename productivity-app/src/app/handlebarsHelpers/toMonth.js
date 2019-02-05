module.exports = function (date) {
  let months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]
  if(new Date(date).getUTCDate()=== new Date().getUTCDate()){
    return "TODAY"
  }
  else return months[new Date(date).getMonth()];
};
