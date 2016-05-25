var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var s_process_timer = 0;

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

var confirm_operation = "add";
var update_projectID = "";

var myxmlhttp = "";

function confirm_click()
{
	if(projectName.value == "")
	{
		projectName.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(budget.value == "" || isNaN(budget.value) || Number(budget.value) == 0)
	{
		budget.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(paid.value == "" || isNaN(paid.value))
	{
		paid.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	
	if (projectName.value.indexOf('&') >= 0 || projectName.value.indexOf('=') >= 0 || projectName.value.indexOf('|') >= 0 || projectName.value.indexOf('@') >= 0 || projectName.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (budget.value.indexOf('&') >= 0 || budget.value.indexOf('=') >= 0 || budget.value.indexOf('|') >= 0 || budget.value.indexOf('@') >= 0 || budget.value.indexOf('!') >= 0)
	{
		alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
		return;
	}
	if (paid.value.indexOf('&') >= 0 || paid.value.indexOf('=') >= 0 || paid.value.indexOf('|') >= 0 || paid.value.indexOf('@') >= 0 || paid.value.indexOf('!') >= 0)
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
			var data = new Object();
			data.projectName = projectName.vlaue;
			data.partyA = partyA.value;
			data.constructDate = constructDate.value;
			data.contractNumber = contractNumber.value;
			data.constructLoca = constructLoca.value;
			data.contractContent = contractContent.options[contractContent.selectedIndex].text;
			data.water = water.value;
			data.waterSelfProduct = waterSelfProduct.value;
			data.waterBuy = waterBuy.value;
			data.blackMaterial = blackMaterial.value;
			data.blackMaterialSelfProduct = blackMaterialSelfProduct.value;
			data.blackMaterialBuy = blackMaterialBuy.value;
			data.blackMaterialSell = blackMaterialSell.value;
			data.waterPrice = waterPrice.value;
			data.blackMaterialPrice = blackMaterialPrice.value;
			data.budget = budget.value;
			data.paid = paid.value;

			var data_send = JSON.stringify(data);
			// var data = "projectName=" + input_add_project.value + "&budget=" + input_add_expmoney.value + "&paid=" + input_add_alrmoney.value ;
			console.info(data_send);

			parent.myxmlhttp.open("post", aim_url, true);
			parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
			parent.myxmlhttp.send(data_send);
		}
		else
		{
			var aim_url = "/BMMS/UpdateProjectQunatity?time=" + new Date();
			var data = new Object();
			data.projectID = update_projectID;
			data.projectName = projectName.vlaue;
			data.partyA = partyA.value;
			data.constructDate = constructDate.value;
			data.contractNumber = contractNumber.value;
			data.constructLoca = constructLoca.value;
			data.contractContent = contractContent.options[contractContent.selectedIndex].text;
			data.water = water.value;
			data.waterSelfProduct = waterSelfProduct.value;
			data.waterBuy = waterBuy.value;
			data.blackMaterial = blackMaterial.value;
			data.blackMaterialSelfProduct = blackMaterialSelfProduct.value;
			data.blackMaterialBuy = blackMaterialBuy.value;
			data.blackMaterialSell = blackMaterialSell.value;
			data.waterPrice = waterPrice.value;
			data.blackMaterialPrice = blackMaterialPrice.value;
			data.budget = budget.value;
			data.paid = paid.value;

			var data_send = JSON.stringify(data);
			// var data = "projectID=" + update_projectID + "&budget=" + input_add_expmoney.value + "&paid=" + input_add_alrmoney.value ;
			console.info(data_send);

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
		var data = "projectID=" + key;
		
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

function reedit_click(key)
{
	float_window_title.innerHTML = "修改工程";
	get_result(key);

	confirm_operation = "reedit";
	update_projectID = key;

	add_click("project_info_pad");
}

function project_add_click(bName)
{
	float_window_title.innerHTML = "添加工程";
	constractDate.value = get_now_date();

	confirm_operation = "add";

	add_click(bName);
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

function get_result(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/WareHousingAnalyse?time=" + new Date();
		var data = "projectID=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = check_search_result;
		myxmlhttp.send(data);
	}
}

function check_search_result()
{
	if (myxmlhttp.readyState == 4 && myxmlhttp.status == 200)
	{
		var b = myxmlhttp.responseText;
		var myobj = JSON.parse(b);

		console.info(b);
		console.info(myobj);

		if(myobj != null)
		{
			projectName.value = myobj.projectName;
			partyA.value = myobj.partyA;
			constructDate.value = myobj.constructDate;
			contractNumber.value = myobj.contractNumber;
			constructLoca.value = myobj.constructLoca;
			if(myobj.constractContent == "水稳辅筑")
				contractContent.options[1].selected = true;
			else
				contractContent.options[2].selected = true;
			water.value = myobj.water;
			waterSelfProduct.value = myobj.waterSelfProduct;
			waterBuy.value = myobj.waterBuy;
			blackMaterial.value = myobj.blackMaterial;
			blackMaterialSelfProduct.value = myobj.blackMaterialSelfProduct;
			blackMaterialBuy.value = myobj.blackMaterialBuy;
			blackMaterialSell.value = myobj.blackMaterialSell;
			waterPrice.value = myobj.waterPrice;
			blackMaterialPrice.value = myobj.blackMaterialPrice;
			budget.value = myobj.budget;
			paid.value = myobj.paid;
		}

		process_message.style.visibility = "hidden";
		clearInterval(s_process_timer);
	}
}
