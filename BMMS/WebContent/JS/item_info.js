function confirm_click()
{
	if(input_add_spec.value == "")
	{
		input_add_spec.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(input_add_name.value == "")
	{
		input_add_name.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	document.forms["form_post"].submit();
}

function cancle_click()
{
	input_add_spec.value = "";
	input_add_name.value = "";
	
	input_add_spec.style.backgroundColor = "#FFFFFF";
	input_add_name.style.backgroundColor = "#FFFFFF";

	setTimeout("hide_window()", 10);
}

function del_click(key)
{
	var postForm = document.createElement("form");
	postForm.method = "post";
	postForm.action = '/BMMS/DelProductInfo';

	var postInput = document.createElement("input");
	postInput.name = "del_product_name";
	postInput.value = key;
	// emailInput.setAttribute("name", "email");
	// emailInput.setAttribute("value", email);
	postForm.appendChild(postInput);

	document.body.appendChild(postForm);
	postForm.submit();
	document.body.removeChild(postForm);
}
