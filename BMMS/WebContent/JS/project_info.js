var confirm_operation = "add";
var update_projectID = "";

var myxmlhttp = "";

function confirm_click()
{
	var input_all_corrent = true;

	if(projectName.value == "")
	{
		projectName.style.backgroundColor = "rgba(255,255,128,1)";
		input_all_corrent = false;
	}
	else
		projectName.style.backgroundColor = "rgba(255,255,255,1)";
	if(waterSelfProduct.value == "" || isNaN(waterSelfProduct.value))
	{
		waterSelfProduct.value = 0;
		// waterSelfProduct.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(waterBuy.value == "" || isNaN(waterBuy.value))
	{
		waterBuy.value = 0;
		// waterBuy.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(blackMaterialSelfProduct.value == "" || isNaN(blackMaterialSelfProduct.value))
	{
		blackMaterialSelfProduct = 0;
		// blackMaterialSelfProduct.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(blackMaterialBuy.value == "" || isNaN(blackMaterialBuy.value))
	{
		blackMaterialBuy.value = 0;
		// blackMaterialBuy.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(blackMaterialSell.value == "" || isNaN(blackMaterialSell.value))
	{
		blackMaterialBuy.value = 0;
		// blackMaterialSell.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(waterPrice.value == "" || isNaN(waterPrice.value))
	{
		waterPrice.value = 0;
		// waterPrice.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(blackMaterialPrice.value == "" || isNaN(blackMaterialPrice.value))
	{
		blackMaterialPrice.value = 0;
		// blackMaterialPrice.style.backgroundColor = "rgba(255,255,128,1)";
		// input_all_corrent = false;
	}
	if(budget.value == "" || isNaN(budget.value) || Number(budget.value) == 0)
	{
		budget.style.backgroundColor = "rgba(255,255,128,1)";
		input_all_corrent = false;
	}
	else
		budget.style.backgroundColor = "rgba(255,255,255,1)";
	if(paid.value == "" || isNaN(paid.value))
	{
		paid.style.backgroundColor = "rgba(255,255,128,1)";
		input_all_corrent = false;
	}
	else
		paid.style.backgroundColor = "rgba(255,255,255,1)";
	
	if(input_all_corrent == false)
		return;

	// if (projectName.value.indexOf('&') >= 0 || projectName.value.indexOf('=') >= 0 || projectName.value.indexOf('|') >= 0 || projectName.value.indexOf('@') >= 0 || projectName.value.indexOf('!') >= 0)
	// {
	// 	alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
	// 	return;
	// }
	// if (budget.value.indexOf('&') >= 0 || budget.value.indexOf('=') >= 0 || budget.value.indexOf('|') >= 0 || budget.value.indexOf('@') >= 0 || budget.value.indexOf('!') >= 0)
	// {
	// 	alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
	// 	return;
	// }
	// if (paid.value.indexOf('&') >= 0 || paid.value.indexOf('=') >= 0 || paid.value.indexOf('|') >= 0 || paid.value.indexOf('@') >= 0 || paid.value.indexOf('!') >= 0)
	// {
	// 	alert("添加字段包含非法字符（&=|@!），请重新组织添加内容。");
	// 	return;
	// }

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		if(confirm_operation == "add")
		{
			var aim_url = "/BMMS/AddProjectQunatity?time=" + new Date();
			var data = new Object();
			data.projectName = projectName.value;
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
			data.projectName = projectName.value;
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
			parent.myxmlhttp.send(data_send);
		}
	}
}

function cancle_click()
{
	projectName.value = "";
	partyA.value = "";
	constructDate.value = "";
	contractNumber.value = "";
	constructLoca.value = "";
	contractContent.options[0].selected = true;
	water.value = "";
	waterSelfProduct.value = "";
	waterBuy.value = "";
	blackMaterial.value = "";
	blackMaterialSelfProduct.value = "";
	blackMaterialBuy.value = "";
	blackMaterialSell.value = "";
	waterPrice.value = "";
	blackMaterialPrice.value = "";
	budget.value = "";
	paid.value = "";

	projectName.style.backgroundColor = "#FFFFFF";
	waterSelfProduct.style.backgroundColor = "#FFFFFF";
	waterBuy.style.backgroundColor = "#FFFFFF";
	blackMaterialSelfProduct.style.backgroundColor = "#FFFFFF";
	blackMaterialBuy.style.backgroundColor = "#FFFFFF";
	blackMaterialSell.style.backgroundColor = "#FFFFFF";
	waterPrice.style.backgroundColor = "#FFFFFF";
	blackMaterialPrice.style.backgroundColor = "#FFFFFF";
	budget.style.backgroundColor = "#FFFFFF";
	paid.style.backgroundColor = "#FFFFFF";

	setTimeout("hide_window()", 10);
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
	constructDate.value = get_now_date();

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
		var aim_url = "/BMMS/GetOneProjectQunatityInfo?time=" + new Date();
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
			if(myobj.contractContent == "水稳辅筑")
				contractContent.options[0].selected = true;
			else if(myobj.contractContent == "黑料辅筑")
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

		myxmlhttp = null;
	}
}
