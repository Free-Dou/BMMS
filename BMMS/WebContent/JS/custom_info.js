function confirm_click()
{
	if(input_add_name.value == "")
	{
		input_add_name.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}

	if (input_add_name.value.indexOf('&') >= 0 || input_add_name.value.indexOf('=') >= 0 || input_add_name.value.indexOf('|') >= 0 || input_add_name.value.indexOf('@') >= 0 || input_add_name.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_tel.value.indexOf('&') >= 0 || input_add_tel.value.indexOf('=') >= 0 || input_add_tel.value.indexOf('|') >= 0 || input_add_tel.value.indexOf('@') >= 0 || input_add_tel.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_fix.value.indexOf('&') >= 0 || input_add_fix.value.indexOf('=') >= 0 || input_add_fix.value.indexOf('|') >= 0 || input_add_fix.value.indexOf('@') >= 0 || input_add_fix.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_phone1.value.indexOf('&') >= 0 || input_add_phone1.value.indexOf('=') >= 0 || input_add_phone1.value.indexOf('|') >= 0 || input_add_phone1.value.indexOf('@') >= 0 || input_add_phone1.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_phone2.value.indexOf('&') >= 0 || input_add_phone2.value.indexOf('=') >= 0 || input_add_phone2.value.indexOf('|') >= 0 || input_add_phone2.value.indexOf('@') >= 0 || input_add_phone2.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/AddCustomerInfo?time=" + new Date();
		var data = "input_add_name=" + document.getElementById("input_add_name").value + "&input_add_tel=" + document.getElementById("input_add_tel").value + "&input_add_fix=" + document.getElementById("input_add_fix").value + "&input_add_phone1=" + document.getElementById("input_add_phone1").value + "&input_add_phone2=" + document.getElementById("input_add_phone2").value;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
	// document.forms["form_post"].submit();
}

function myremove_confirm(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/DelCustomerInfo?time=" + new Date();
		var data = "del_customer_name=" + key;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}
