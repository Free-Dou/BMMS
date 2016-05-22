var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var s_process_timer = 0;

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

var confirm_operation = "add";

function confirm_click()
{
	if(input_add_project.value == "")
	{
		input_add_project.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(input_add_expmoney.value == "" || isNaN(input_add_expmoney.value) || Number(input_add_expmoney.value) == 0)
	{
		input_add_expmoney.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(input_add_alrmoney.value == "" || isNaN(input_add_alrmoney.value))
	{
		input_add_alrmoney.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	
	if (input_add_project.value.indexOf('&') >= 0 || input_add_project.value.indexOf('=') >= 0 || input_add_project.value.indexOf('|') >= 0 || input_add_project.value.indexOf('@') >= 0 || input_add_project.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_expmoney.value.indexOf('&') >= 0 || input_add_expmoney.value.indexOf('=') >= 0 || input_add_expmoney.value.indexOf('|') >= 0 || input_add_expmoney.value.indexOf('@') >= 0 || input_add_expmoney.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (input_add_alrmoney.value.indexOf('&') >= 0 || input_add_alrmoney.value.indexOf('=') >= 0 || input_add_alrmoney.value.indexOf('|') >= 0 || input_add_alrmoney.value.indexOf('@') >= 0 || input_add_alrmoney.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		if(confirm_operation == "add")
		{
			var aim_url = "/BMMS/AddProjectQunatity?time=" + new Date();
			var data = "projectName =" + input_add_project.value + "&budget=" + input_add_expmoney.value + "&paid=" + input_add_alrmoney.value ;
			
			parent.myxmlhttp.open("post", aim_url, true);
			parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
			parent.myxmlhttp.send(data);
		}
		else
		{
			var aim_url = "/BMMS/UpdateProjectQunatity?time=" + new Date();
			var data = "projectName =" + input_add_project.value + "&budget=" + input_add_expmoney.value + "&paid=" + input_add_alrmoney.value ;
			
			parent.myxmlhttp.open("post", aim_url, true);
			parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
			parent.myxmlhttp.send(data);
		}
	}
}

function cancle_click()
{
	input_add_project.value = "";
	input_add_expmoney.value = "";
	input_add_alrmoney.value = "";
	
	input_add_project.style.backgroundColor = "#FFFFFF";
	input_add_expmoney.style.backgroundColor = "#FFFFFF";
	input_add_alrmoney.style.backgroundColor = "#FFFFFF";

	setTimeout("hide_window()", 10);
}

function del_click(index)
{
	var e = document.getElementById(index);
	e.innerHTML = e.innerHTML + "<div id=\"confirm_window" + index + "\" class=\"table-cell-1\" style=\"background-color: rgba(0,0,0,0.8); width: 200px; position: absolute;\">"
							  + "<div style=\"float: left; padding-left: 10px;\"> 确认要删除？ </div>"
							  + "<div id=\"no_btn" + index + "\" style=\"cursor: pointer; float: right; height: 24px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 10px;\""
							  + " onmouseenter=\"button_mouseenter('no_btn" + index + "')\" onmouseleave=\"button_mouseleave('no_btn" + index + "')\" onmousedown=\"button_mousedown('no_btn" + index + "')\" onmouseup=\"button_mouseup('no_btn" + index + "')\""
							  + " onclick=\"myremove_cancle('" + index + "')\">"
							  +	"<p style=\"top: 50%; transform: translateY(-50%);\"> × </p>"
							  + "</div>"
							  + "<div id=\"yes_btn" + index + "\" style=\"cursor: pointer; float: right; height: 24px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 0px;\""
							  + " onmouseenter=\"button_mouseenter('yes_btn" + index + "')\" onmouseleave=\"button_mouseleave('yes_btn" + index + "')\" onmousedown=\"button_mousedown('yes_btn" + index + "')\" onmouseup=\"button_mouseup('yes_btn" + index + "')\""
							  + " onclick=\"myremove_confirm('" + index + "')\">"
							  + "<p style=\"top: 50%; transform: translateY(-50%);\"> √ </p>"
							  + "</div></div>";
}

function myremove_confirm(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/DelProjectQunatity?time=" + new Date();
		var data = "projectName=" + key;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}

function myremove_cancle(index)
{
	var e = document.getElementById("confirm_window" + index);

	e.parentNode.removeChild(e);
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
		console.info("item info processtimer running.");
	}
}
