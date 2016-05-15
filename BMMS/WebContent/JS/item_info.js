var myxmlhttp = "";

var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var s_process_timer = 0;

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

// function dispose()
// {
// 	if (myxmlhttp.readyState==4 && myxmlhttp.status==200)
// 	{
// 		location.reload();
// 	}
// }

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
	
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/AddProductInfo?time=" + new Date();
		var data = "input_add_spec=" + document.getElementById("input_add_spec").value + "&input_add_name=" + document.getElementById("input_add_name").value;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = parent.refresh_now_page;
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
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/DelProductInfo?time=" + new Date();
		var data = "del_product_name=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = parent.refresh_now_page;
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

function process_anime()
{
	process_time_last = process_time_last + 1;
	var need_change = parseInt(process_time_last / 10);
	if(need_change > 5)
		need_change = 5;
	for(var i = 0; i < need_change; i++)
	{
		var e = document.getElementById("pi" + i);
		if (pi_pos[i] > 360) 
			pi_pos[i] = pi_pos[i] - 360;

		if(pi_pos[i] < 180)
			pi_pos[i] = pi_pos[i] + (pi_pos[i] + 10) / 20;
		else if(pi_pos[i] < 360)
			pi_pos[i] = pi_pos[i] + (360 - pi_pos[i] + 10) / 20;

		var new_x = center_x + Math.sin(2 * Math.PI / 360 * pi_pos[i]) * 50;
		var new_y = center_y - Math.cos(2 * Math.PI / 360 * pi_pos[i]) * 50;

		e.style.top = new_y + "px";
		e.style.left = new_x + "px";
		console.info("processtimer running.");
	}
}
