var myxmlhttp = "";

function getXmlHttpObject()
{
	var xmlhttp;
	/* 不同浏览器获取xmlhttp对象的方法不同 */
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

function dispose()
{
	if (myxmlhttp.readyState==4 && myxmlhttp.status==200)
	{
		location.reload();
	}
}

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
	
	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/AddProductInfo?time=" + new Date();
		var data = "input_add_spec=" + document.getElementById("input_add_spec").value + "&input_add_name=" + document.getElementById("input_add_name").value;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.onreadystatechange = dispose;
		myxmlhttp.send(data);
	}
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
	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/DelProductInfo?time=" + new Date();
		var data = "del_product_name=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.onreadystatechange = dispose;
		myxmlhttp.send(data);
	}

	// var postForm = document.createElement("form");
	// postForm.method = "post";
	// postForm.action = '/BMMS/DelProductInfo';

	// var postInput = document.createElement("input");
	// postInput.name = "del_product_name";
	// postInput.value = key;
	// // emailInput.setAttribute("name", "email");
	// // emailInput.setAttribute("value", email);
	// postForm.appendChild(postInput);

	// document.body.appendChild(postForm);
	// postForm.submit();
	// document.body.removeChild(postForm); 
}
