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
		var obj = JSON.parse(b);

		result_board.style.visibility = "visible";
		result_board.innerHtml = "";

		console.info(b);
		console.info(obj);
		for(var i = 0; i < obj.length; i++)
		{
			var string_final = "";
			var totalCount = 0;
			var totalMoney = 0;

			string_final = string_final + "<div class=\"message-box-1\">";
			string_final = string_final + "<div class=\"message-title\"> " + obj[i].orderID + " </div>";
			string_final = string_final + "<div class=\"message-contains\">";
			string_final = string_final + "<div> &emsp;&emsp;客户：" + obj[i].customerName + "&emsp;&emsp;仓库: " + obj[i].stockLoca + "&emsp;&emsp;车号: " + obj[i].carNum + "&emsp;&emsp; </div>";

			// string_final = string_final + "<div>";
			string_final = string_final + "<div class=\"table-line\" style=\"margin-left: 0px;\">"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\">  </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 编号 </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 20%;\"> 商品 </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 数量 </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 单价 </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 8%;\"> 金额 </div>"
			string_final = string_final + "<div class=\"table-title-cell\" style=\"width: 25%;\"> 备注 </div>"

			string_final = string_final + "</div>"
			for(var j = 0; j < obj[i].Product.length; j++)
			{
				string_final = string_final + "<div class=\"table-line\">"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\">  </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 20%;\"> " + obj[i].Product[j].pSpec + " </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 20%;\"> " + obj[i].Product[j].pName + " </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> " + obj[i].Product[j].pCount + " </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> " + obj[i].Product[j].pPrice + "￥ </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> " + obj[i].Product[j].pTotalPrice + "￥ </div>"
				string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 25%;\">  </div>"
				string_final = string_final + "</div>"

				totalCount = totalCount + Number(obj[i].Product[j].pCount);
				totalMoney = totalMoney + Number(obj[i].Product[j].pTotalPrice);
			}
			string_final = string_final + "<div class=\"table-line\">"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> 合计 </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 20%;\"> / </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 20%;\"> / </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> " + Number(totalCount).toFixed(3) + " </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> / </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 8%;\"> " + Number(totalMoney).toFixed(2) + "￥ </div>"
			string_final = string_final + "<div class=\"table-cell-1\" style=\"width: 25%;\"> / </div>"
			string_final = string_final + "</div>"

			string_final = string_final + "</div>"
		}
		result_board.innerHtml = string_final;
	}
}
