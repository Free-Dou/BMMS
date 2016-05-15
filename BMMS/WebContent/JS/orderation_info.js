var myxmlhttp = "";

function dispose()
{
	if (myxmlhttp.readyState==4 && myxmlhttp.status==200)
	{
		location.reload();
	}
}

function confirm_click()
{
	if(input_add_name.value == "")
	{
		input_add_name.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}

	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/AddSupplierInfo?time=" + new Date();
		var data = "input_add_name=" + document.getElementById("input_add_name").value + "&input_add_tel=" + document.getElementById("input_add_tel").value + "&input_add_fix=" + document.getElementById("input_add_fix").value + "&input_add_phone1=" + document.getElementById("input_add_phone1").value + "&input_add_phone2=" + document.getElementById("input_add_phone2").value;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = dispose;
		myxmlhttp.send(data);
	}
	// document.forms["form_post"].submit();
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
	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/DelSupplierInfo?time=" + new Date();
		var data = "del_supplier_name=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = dispose;
		myxmlhttp.send(data);
	}
	// var postForm = document.createElement("form");
	// postForm.method = "post";
	// postForm.action = '/BMMS/DelSupplierInfo';

	// var postInput = document.createElement("input");
	// postInput.name = "del_supplier_name";
	// postInput.value = key;
	// // emailInput.setAttribute("name", "email");
	// // emailInput.setAttribute("value", email);
	// postForm.appendChild(postInput);

	// document.body.appendChild(postForm);
	// postForm.submit();
	// document.body.removeChild(postForm);
}
