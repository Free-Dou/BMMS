var confirm_operation = "add";
var update_projectID = "";

var myxmlhttp = "";

var file_array = new Array();

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
		blackMaterialSelfProduct.value = 0;
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
		blackMaterialSell.value = 0;
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
	// if(paid.value == "" || isNaN(paid.value))
	// {
	// 	paid.style.backgroundColor = "rgba(255,255,128,1)";
	// 	input_all_corrent = false;
	// }
	// else
	// 	paid.style.backgroundColor = "rgba(255,255,255,1)";

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
			data.paid = 0;

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
			data.paid = 0;

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
	// paid.value = "";

	projectName.style.backgroundColor = "#FFFFFF";
	waterSelfProduct.style.backgroundColor = "#FFFFFF";
	waterBuy.style.backgroundColor = "#FFFFFF";
	blackMaterialSelfProduct.style.backgroundColor = "#FFFFFF";
	blackMaterialBuy.style.backgroundColor = "#FFFFFF";
	blackMaterialSell.style.backgroundColor = "#FFFFFF";
	waterPrice.style.backgroundColor = "#FFFFFF";
	blackMaterialPrice.style.backgroundColor = "#FFFFFF";
	budget.style.backgroundColor = "#FFFFFF";
	// paid.style.backgroundColor = "#FFFFFF";

	hide_window("project_info_pad", "add_window");
	// setTimeout("hide_window()", 10);
}

function cancle_click_paid()
{
	paid_name.value = "";
	paid_cash.value = "";

	paid_name.style.backgroundColor = "#FFFFFF";
	paid_cash.style.backgroundColor = "#FFFFFF";

	hide_window("add_window_paid", "add_window_paid_add")
}

function cancle_click_file()
{
	file_path.value = "请添加文件";
	upload_item.value = "";

	hide_window("add_window_file", "add_window_file_add")
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

function myremove_confirm_paid(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/DelProjectPaidInfo?time=" + new Date();
		var data = "id=" + key.substring(5, key.length);
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = paid_refresh_handle;
		myxmlhttp.send(data);
	}
}

function paid_refresh_handle()
{
	myxmlhttp = null;
	cancle_click_paid();
	refresh_paid(update_projectID);
}

function myremove_confirm_file(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/DeleteFile?time=" + new Date();
		var data = "projectID=" + update_projectID + "&fileName=" + key.substring(5, key.length);
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","multipart/form-data");
		myxmlhttp.onreadystatechange = file_refresh_handle;
		myxmlhttp.send(data);
	}
}

function file_refresh_handle()
{
	myxmlhttp = null;
	cancle_click_file();
	refresh_file(update_projectID);
}

function refresh_file(key)
{
	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/GetProjectFileInfo?time=" + new Date();
		var data = "projectID=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = check_file_result;
		myxmlhttp.send(data);
	}
}

function project_add_click(bName)
{
	float_window_title.innerHTML = "添加工程";
	constructDate.value = get_now_date();

	confirm_operation = "add";

	add_click(bName, "add_window");
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

function reedit_click(key)
{
	float_window_title.innerHTML = "修改工程";
	get_result(key);

	confirm_operation = "reedit";
	update_projectID = key;

	add_click("project_info_pad", "add_window");
}

function show_paid(key)
{
	get_result_paid(key);

	update_projectID = key;
	add_click("project_info_pad", "add_window_paid");
}

function refresh_paid(key)
{
	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/GetAllProjectPaidInfo?time=" + new Date();
		var data = "projectID=" + key;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = check_paid_result;
		myxmlhttp.send(data);
	}
}

function show_file(key)
{
	get_result_file(key);

	update_projectID = key;
	add_click("project_info_pad", "add_window_file");
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

function get_result_paid(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	refresh_paid(key);
}

function get_result_file(key)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	refresh_file(key);
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
		}

		process_message.style.visibility = "hidden";
		clearInterval(s_process_timer);

		myxmlhttp = null;
	}
}

function check_paid_result()
{
	if (myxmlhttp.readyState == 4 && myxmlhttp.status == 200)
	{
		var b = myxmlhttp.responseText;
		var myobj = JSON.parse(b);

		console.info(b);
		console.info(myobj);

		var string_final = "";
		var total_money = 0;
		if(myobj != null)
		{
			for(var i = 0; i < myobj.length; i++)
			{
				string_final = string_final + "<div id=\"paid_" + myobj[i].id + "\" class=\"table-line\" style=\"padding-left:20px;\">";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + " cell-head\" style=\"width: 3%;\" onclick=\"del_click_common(\'paid_" + myobj[i].id + "\', \'myremove_confirm_paid\')\"> - </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "\"> " + myobj[i].payInfo + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "\"> " + Number(myobj[i].paid).toFixed(2) + "￥ </div>";
				string_final = string_final + "</div>";

				total_money = total_money + Number(myobj[i].paid);
			}
		}
		table_inner_paid.innerHTML = string_final;
		var paid_cell = document.getElementById("pjtPaid" + update_projectID);
		paid_cell.innerHTML = Number(total_money).toFixed(2) + "￥";

		process_message.style.visibility = "hidden";
		clearInterval(s_process_timer);

		myxmlhttp = null;
	}
}

function check_file_result()
{
	if (myxmlhttp.readyState == 4 && myxmlhttp.status == 200)
	{
		var b = myxmlhttp.responseText;
		var myobj = JSON.parse(b);

		console.info(b);
		console.info(myobj);

		file_array = [];
		var string_final = "";
		if(myobj != null)
		{
			for(var i = 0; i < myobj.length; i++)
			{
				string_final = string_final + "<div id=\"file_" + myobj[i].fileName + "\" class=\"table-line\" style=\"padding-left:20px;\">";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + " cell-head\" style=\"width: 3%;\" onclick=\"del_click_common(\'file_" + myobj[i].fileName + "\', \'myremove_confirm_file\')\"> - </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 90%; text-decoration: underline;\" onclick=\"download_file(\'" + update_projectID + "\', \'" + myobj[i].fileName + "\')\"> " + myobj[i].fileName + " </div>";
				string_final = string_final + "</div>";
			}
			file_array.push(myobj[i].fileName);
		}
		table_inner_file.innerHTML = string_final;

		process_message.style.visibility = "hidden";
		clearInterval(s_process_timer);

		myxmlhttp = null;
	}
}

function paid_add_click()
{
	add_click("add_window_paid", "add_window_paid_add");
}

function file_add_click()
{
	add_click("add_window_file", "add_window_file_add");
}

function confirm_click_paid()
{
	var input_all_corrent = true;

	if(paid_cash.value == "" || isNaN(paid_cash.value) || Number(paid_cash.value) == 0)
	{
		paid_cash.style.backgroundColor = "rgba(255,255,128,1)";
		input_all_corrent = false;
	}
	else
		paid_cash.style.backgroundColor = "rgba(255,255,255,1)";

	if(input_all_corrent == false)
		return;

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/AddProjectPaidInfo?time=" + new Date();
		var data = new Object();
		data.projectID = update_projectID;
		data.payInfo = paid_name.value;
		data.payTime = get_now_date();
		data.paid = paid_cash.value;

		var data_send = JSON.stringify(data);
		console.info(data_send);

		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = paid_refresh_handle;
		myxmlhttp.send(data_send);
	}
}

function confirm_click_file()
{
	if(file_path.value == "请添加文件" || upload_item.value == null)
		return;

	for(var i = 0; i < file_array.length; i++)
		if(file_path.value.indexOf(file_array[i]) >= 0)
		{
			alert("该工程存在同名文件，请修改文件名后重试。");
			return;
		}

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	file_upload();
	// if(window.FileReader)
	// {
	// 	var fr = new FileReader();
	// 	fr.onloadend = function()
	// 	{
	// 		if (fr.error) {
	// 			alert("文件读取失败");

	// 			process_message.style.visibility = "hidden";
	// 			clearInterval(s_process_timer);
	// 		} else {
	// 			file_upload(fr.result);
	// 		}
	// 	}
	// 	fr.readAsBinaryString(file_path.value);
	// }
	// else
	// 	alert("当前浏览器不支持上传文件，请使用最新的Chrome浏览器。");
}

function file_upload()
{
	myxmlhttp = getXmlHttpObject();
	
	if (myxmlhttp)
	{
		var aim_url = "/BMMS/UploadFile?time=" + new Date() + "&projectID=" + update_projectID;

		var oData = new FormData(document.forms.namedItem("upload_file"));  
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.onreadystatechange = file_refresh_handle;
		myxmlhttp.send(oData);
		// xmlHttp.sendAsBinary(databinary);
	}
}

function download_file(pjtid, filename)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/DownloadFile?time=" + new Date();
		var data = "projectID=" + pjtid + "&fileName=" + filename;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","multipart/form-data");
		myxmlhttp.onreadystatechange = download_file_req_end;
		myxmlhttp.send(data);
	}
}

function download_file_req_end()
{
	if (myxmlhttp.readyState == 4 && myxmlhttp.status == 200)
	{
		process_message.style.visibility = "visible";
		s_process_timer = setInterval("process_anime()", 10);

		myxmlhttp = null;
	}
}

var opentime = 0;

function body_onload() //待优化
{
	setTimeout("refresh_page()", 10);
}

function refresh_page()
{
	opentime = opentime + 10;
	if(opentime > 500)
		refresh_page_act();
	else
		setTimeout("refresh_page()", 10);
}

function refresh_page_act()
{
	for(var i = 0; i < saved_project_id.options.length; i++)
		refresh_paid(saved_project_id.options[i].text);
}
// xmlhttpobject.prototype.sendAsBinary = function(datastr) {
// 	function byteValue(x) {
// 		return x.charCodeAt(0) & 0xff;
// 	}
// 	var ords = Array.prototype.map.call(datastr, byteValue);
// 	var ui8a = new Uint8Array(ords);
// 	this.send(ui8a.buffer);
// }

// xmlHttp.sendAsBinary(BinaryContent);
