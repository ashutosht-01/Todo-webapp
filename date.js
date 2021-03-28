
function getDate()
{
var day=new Date();
//options is format of data that we wanted
var options={weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
var date=day.toLocaleDateString("hi-IN", options)
return date;
}
module.exports=getDate;