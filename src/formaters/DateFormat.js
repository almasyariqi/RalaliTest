export function addZero(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i
}

export function convertDate(date) {
  var dt = new Date(date);
  var d = addZero(dt.getDate())
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var m = month[dt.getMonth()];
  var y = dt.getFullYear()
  var h = addZero(dt.getHours())
  var mn = addZero(dt.getMinutes())
  var s = addZero(dt.getSeconds())
  return `${m} ${d}, ${y} - ${h}:${mn}:${s}`
}

export function dateToString(date){
  var dt = new Date(date)
  var d = addZero(dt.getDate())
  var m = addZero(dt.getMonth())
  var y = dt.getFullYear()
  var h = addZero(dt.getHours())
  var mn = addZero(dt.getMinutes())
  var s = addZero(dt.getSeconds())
  return  `${y}-${m}-${d} ${h}:${mn}:${s}`
}