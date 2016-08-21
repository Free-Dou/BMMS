function get_result()
{
	if (input_customer.value.indexOf('&') >= 0 || input_customer.value.indexOf('=') >= 0 || input_customer.value.indexOf('|') >= 0 || input_customer.value.indexOf('@') >= 0 || input_customer.value.indexOf('!') >= 0)
	{
		alert("查询条件包含非法字符（&=|@!），请重新组织查询条件。");
		return;
	}
	if (start_date.value.indexOf('&') >= 0 || start_date.value.indexOf('=') >= 0 || start_date.value.indexOf('|') >= 0 || start_date.value.indexOf('@') >= 0 || start_date.value.indexOf('!') >= 0)
	{
		alert("查询条件包含非法字符（&=|@!），请重新组织查询条件。");
		return;
	}
	if (end_date.value.indexOf('&') >= 0 || end_date.value.indexOf('=') >= 0 || end_date.value.indexOf('|') >= 0 || end_date.value.indexOf('@') >= 0 || end_date.value.indexOf('!') >= 0)
	{
		alert("查询条件包含非法字符（&=|@!），请重新组织查询条件。");
		return;
	}
	if (input_item.value.indexOf('&') >= 0 || input_item.value.indexOf('=') >= 0 || input_item.value.indexOf('|') >= 0 || input_item.value.indexOf('@') >= 0 || input_item.value.indexOf('!') >= 0)
	{
		alert("查询条件包含非法字符（&=|@!），请重新组织查询条件。");
		return;
	}
	if (input_remark.value.indexOf('&') >= 0 || input_remark.value.indexOf('=') >= 0 || input_remark.value.indexOf('|') >= 0 || input_remark.value.indexOf('@') >= 0 || input_remark.value.indexOf('!') >= 0)
	{
		alert("查询条件包含非法字符（&=|@!），请重新组织查询条件。");
		return;
	}

	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	result_board.innerHTML = "";
	
	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/WareHousingAnalyse?time=" + new Date();
		var data = "start_date=" + start_date.value + "&end_date=" + end_date.value + "&supplier=" + input_customer.value + "&item=" + input_item.value + "&remark=" + input_remark.value;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = check_search_result;
		myxmlhttp.send(data);
	}
}

function myremove(index)
{
	del_click(index);
}

function myremove_confirm(index)
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/DelWareHousingOrder?time=" + new Date();
		var data = "del_warehousing_id=" + index;
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}

function check_search_result()
{
	if (myxmlhttp.readyState == 4 && myxmlhttp.status == 200)
	{
		var b = myxmlhttp.responseText;
		var myobj = JSON.parse(b);

		result_board.style.visibility = "visible";
		result_board.innerHTML = "";

		console.info(b);
		console.info(myobj);

		var string_final = "";
		// var result_now_date = "";
		// var message_back = 1;
		if(myobj != null)
		{
			string_final = string_final + "<div class=\"table-line-little\">";
				string_final = string_final + "<div class=\"table-title-cell-little cell-head\" style=\"width: 2%\"></div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 10%;\"> 单号 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 10%;\"> 编号 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 10%;\"> 商品 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 6%;\"> 数量 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 6%;\"> 单价 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 6%;\"> 金额 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 15%;\"> 备注 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 6%;\"> 时间 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 20%;\"> 供应商 </div>";
				string_final = string_final + "<div class=\"table-title-cell-little\" style=\"width: 6%;\"> 车号 </div>";
			string_final = string_final + "</div>";
			for(var i = 0; i < myobj.length; i++)
			{
				string_final = string_final + "<div id=\"" + myobj[i].orderID + "\" class=\"table-line-little\">";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little cell-head\" style=\"width: 2%\" onclick=\"myremove(\'" + myobj[i].orderID + "\')\"> - </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 10%;\"> " + myobj[i].orderID + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 10%;\"> " + myobj[i].Product[0].pSpec + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 10%;\"> " + myobj[i].Product[0].pName + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> " + Number(myobj[i].Product[0].pCount).toFixed(3) + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> " + Number(myobj[i].Product[0].pPrice).toFixed(2) + "￥ </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> " + Number(myobj[i].Product[0].pTotalPrice).toFixed(2) + "￥ </div>";
					if(myobj[i].Product[0].hasOwnProperty('pRemark'))
						string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 15%;\"> " + myobj[i].Product[0].pRemark + " </div>";
					else
						string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 15%;\"> </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> " + myobj[i].inTime.substr(0, 10) + " </div>";
					string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 20%;\"> " + myobj[i].supplierName + " </div>";
					if(myobj[i].hasOwnProperty('carNum'))
						string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> " + myobj[i].carNum + " </div>";
					else
						string_final = string_final + "<div class=\"table-cell-" + ((i % 2) + 1) + "-little\" style=\"width: 6%;\"> </div>";
				string_final = string_final + "</div>";

				// result_now_date = myobj[i].inTime.substring(0,10);
				// string_final = string_final + "<div class=\"message-box-" + message_back + "\">";
				// 	string_final = string_final + "<div class=\"right-page-title\"> " + result_now_date + " </div>";
				// 	string_final = string_final + "<div class=\"message-box\">";

				// 		while(myobj[i].inTime.substring(0,10) == result_now_date)
				// 		{
				// 			var totalCount = 0;
				// 			var totalMoney = 0;

				// 			string_final = string_final + "<div class=\"message-title\"> " + myobj[i].orderID + " </div>";
				// 			string_final = string_final + "<div class=\"message-contains\">";
				// 				string_final = string_final + "<div> &emsp;&emsp;供应商：" + myobj[i].supplierName + "&emsp;&emsp;仓库：" + myobj[i].stockLoca;
				// 				if(myobj[i].hasOwnProperty('carNum'))
				// 					string_final = string_final + "&emsp;&emsp;车号：" + myobj[i].carNum + " </div>";
				// 				else
				// 					string_final = string_final + "&emsp;&emsp;车号：</div>";

				// 				string_final = string_final + "<div class=\"table-line\" style=\"margin-left: 0px;\">";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\">  </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 编号 </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 商品 </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 数量 </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 单价 </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 金额 </div>";
				// 				string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 25%;\"> 备注 </div>";
				// 				string_final = string_final + "</div>";
				// 				var line_style_now = 1;
				// 				for(var j = 0; j < myobj[i].Product.length; j++)
				// 				{
				// 					string_final = string_final + "<div class=\"table-line\">";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\">  </div>";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> " + myobj[i].Product[j].pSpec + " </div>";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> " + myobj[i].Product[j].pName + " </div>";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pCount).toFixed(3) + " </div>";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pPrice).toFixed(2) + "￥ </div>";
				// 					string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pTotalPrice).toFixed(2) + "￥ </div>";
				// 					if(myobj[i].Product[j].hasOwnProperty('pRemark'))
				// 						string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 25%;\"> " + myobj[i].Product[j].pRemark + " </div>";
				// 					else
				// 						string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 25%;\">  </div>";
				// 					string_final = string_final + "</div>";

				// 					totalCount = totalCount + Number(myobj[i].Product[j].pCount);
				// 					totalMoney = totalMoney + Number(myobj[i].Product[j].pTotalPrice);

				// 					if(line_style_now == 1)
				// 						line_style_now = 2;
				// 					else
				// 						line_style_now = 1;
				// 				}
				// 				string_final = string_final + "<div class=\"table-line\">";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> 合计 </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> / </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> / </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(totalCount).toFixed(3) + " </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> / </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(totalMoney).toFixed(2) + "￥ </div>";
				// 				string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 25%;\"> / </div>";
				// 				string_final = string_final + "</div>";
				// 				if(myobj[i].hasOwnProperty('orderRemark'))
				// 					string_final = string_final + "<div> &emsp;&emsp;备注：" + myobj[i].orderRemark + " </div>";
				// 				else
				// 					string_final = string_final + "<div> &emsp;&emsp;备注：无 </div>";
				// 			string_final = string_final + "</div>";
				// 			string_final = string_final + "<div class=\"message-time\"> User:" + myobj[i].userName + " Time:" + myobj[i].inTime + " </div>";

				// 			i = i + 1;
				// 			if(i >= myobj.length)
				// 				break;
				// 		}
				// 		i = i - 1;
				// 	string_final = string_final + "</div>";
				// string_final = string_final + "</div>";

				// if(message_back == 1)
				// 	message_back = 2;
				// else
				// 	message_back = 1;
			}
			result_board.innerHTML = string_final;
		}
		else
			result_board.innerHTML = "<div class=\"message-title\"> 未搜索到结果。 </div>";

		process_message.style.visibility = "hidden";
		clearInterval(s_process_timer);

		myxmlhttp = null;
	}
}
