function confirm_click()
{
	var input_correct = true;
	if(input_add_spec.value == "")
	{
		input_add_spec.style.backgroundColor = "rgba(255,255,128,1)";
		input_correct = false;
	}
	if(input_add_name.value == "")
	{
		input_add_name.style.backgroundColor = "rgba(255,255,128,1)";
		input_correct = false;
	}
	
	if(input_correct == false)
		return;

	if (input_add_spec.value.indexOf('&') >= 0 || input_add_spec.value.indexOf('=') >= 0 || input_add_spec.value.indexOf('|') >= 0 || input_add_spec.value.indexOf('@') >= 0 || input_add_spec.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_name.value.indexOf('&') >= 0 || input_add_name.value.indexOf('=') >= 0 || input_add_name.value.indexOf('|') >= 0 || input_add_name.value.indexOf('@') >= 0 || input_add_name.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();

	console.info(parent.myxmlhttp);

	if (parent.myxmlhttp)
	{
		console.info("enter send solution");

		var aim_url = "/BMMS/AddProductInfo?time=" + new Date();
		var data = "input_add_spec=" + document.getElementById("input_add_spec").value + "&input_add_name=" + document.getElementById("input_add_name").value;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}

function cancle_click(bName, aWindowName)
{
	input_add_spec.value = "";
	input_add_name.value = "";
	
	input_add_spec.style.backgroundColor = "#FFFFFF";
	input_add_name.style.backgroundColor = "#FFFFFF";

	hide_window(bName, aWindowName);
	// setTimeout("hide_window()", 10);
}

function myremove_confirm(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	console.info(parent.myxmlhttp);

	if (parent.myxmlhttp)
	{
		console.info("enter send solution");

		var aim_url = "/BMMS/DelProductInfo?time=" + new Date();
		var data = "del_product_name=" + key;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}
