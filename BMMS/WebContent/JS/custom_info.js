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

function del_click(key)
{
	var postForm = document.createElement("form");
	postForm.method = "post";
	postForm.action = '/BMMS/DelCustomerInfo';

	var postInput = document.createElement("input");
	postInput.name = "del_customer_name";
	postInput.value = key;
	// emailInput.setAttribute("name", "email");
	// emailInput.setAttribute("value", email);
	postForm.appendChild(postInput);

	document.body.appendChild(postForm);
	postForm.submit();
	document.body.removeChild(postForm);
}
