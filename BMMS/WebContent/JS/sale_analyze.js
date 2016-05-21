var myxmlhttp = "";

function body_onload()
{
	var date_now = get_now_date();
	start_date.value = date_now;
	end_date.value = date_now;
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

function get_result()
{
	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/SalesAnalyse?time=" + new Date();
		var data = "start_date=" + start_date.value + "&end_date=" + end_date.value + "&customer=" + input_customer.value + "&item=" + input_item.value + "&remark=" + input_remark.value;
		
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

		result_board.style.visibility = "visible";
		result_board.innerHTML = "";

		console.info(b);
		console.info(myobj);

		var string_final = "";
		var result_now_date = "";
		var message_back = 1;
		var date_array = new Array();

		for(var i = 0; i < myobj.length; i++)
			date_array.push(myobj[i].outTime);

		for(var i = 0; i < myobj.length; i++)
		{
			result_now_date = date_array[i].substring(0,10);
			string_final = string_final + "<div class=\"message-box-" + message_back + "\">";
				string_final = string_final + "<div class=\"right-page-title\"> " + result_now_date + " </div>";
				string_final = string_final + "<div class=\"message-box\">";

					while(date_array[i].substring(0,10) == result_now_date)
					{
						var totalCount = 0;
						var totalMoney = 0;

						string_final = string_final + "<div class=\"message-title\"> " + myobj[i].orderID + " </div>";
						string_final = string_final + "<div class=\"message-contains\">";
							string_final = string_final + "<div> &emsp;&emsp;客户：" + myobj[i].customerName + "&emsp;&emsp;仓库: " + myobj[i].stockLoca + "&emsp;&emsp;车号: " + myobj[i].carNum + "&emsp;&emsp; </div>";
							string_final = string_final + "<div class=\"table-line\" style=\"margin-left: 0px;\">";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\">  </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 编号 </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 商品 </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 数量 </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 单价 </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 金额 </div>";
							string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 25%;\"> 备注 </div>";
							string_final = string_final + "</div>";
							var line_style_now = 1;
							for(var j = 0; j < myobj[i].Product.length; j++)
							{
								string_final = string_final + "<div class=\"table-line\">";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\">  </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> " + myobj[i].Product[j].pSpec + " </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> " + myobj[i].Product[j].pName + " </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pCount).toFixed(3) + " </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pPrice).toFixed(2) + "￥ </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(myobj[i].Product[j].pTotalPrice).toFixed(2) + "￥ </div>";
								string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 25%;\">  </div>";
								string_final = string_final + "</div>";

								totalCount = totalCount + Number(myobj[i].Product[j].pCount);
								totalMoney = totalMoney + Number(myobj[i].Product[j].pTotalPrice);

								if(line_style_now == 1)
									line_style_now = 2;
								else
									line_style_now = 1;
							}
							string_final = string_final + "<div class=\"table-line\">";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> 合计 </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> / </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 20%;\"> / </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(totalCount).toFixed(3) + " </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> / </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 8%;\"> " + Number(totalMoney).toFixed(2) + "￥ </div>";
							string_final = string_final + "<div class=\"table-cell-" + line_style_now + "\" style=\"width: 25%;\"> / </div>";
							string_final = string_final + "</div>";
							string_final = string_final + "<div> &emsp;&emsp;备注：" + myobj[i].orderRemark + " </div>";
						string_final = string_final + "</div>";
						string_final = string_final + "<div class=\"message-time\"> User:" + myobj[i].userName + " Time:" + myobj[i].outTime + " </div>";

						i = i + 1;
						if(i > myobj.length)
							break;
					}
					i = i - 1;
				string_final = string_final + "</div>";
			string_final = string_final + "</div>";

			if(message_back == 1)
				message_back = 2;
			else
				message_back = 1;
		}
		result_board.innerHTML = string_final;
	}
}
