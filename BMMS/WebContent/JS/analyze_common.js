var myxmlhttp = "";

function body_onload()
{
	var date_now = get_now_date();
	start_date.value = date_now;
	end_date.value = date_now;
}

function get_now_date()
{
	var myDate = new Date();
	var month = Number(myDate.getMonth()) + 1;
	if(month < 10)
		month = "0" + month;
	var day = Number(myDate.getDate());
	if(day < 10)
		day = "0" + day;
	return myDate.getFullYear() + "-" + month + "-" + day;
}
