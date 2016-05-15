function confirm_click()
{
	if(input_add_name.value == "")
	{
		input_add_name.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}

	document.forms["form_post"].submit();
}

function myremove(index)
{
	
}

function cancle_click()
{
	input_add_name.style.backgroundColor = "#FFFFFF";
	input_add_name.value = "";
	input_add_tel.value = "";
	input_add_fix.value = "";
	input_add_phone1.value = "";
	input_add_phone2.value = "";
	setTimeout("hide_window()", 10);
}
