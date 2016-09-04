function body_onload()
{
	if(trade_person.options.length == 0)
	{
		// alert('客户列表为空，清先添加一个客户。');
		tip_window.style.visibility = "visible";
		tip_contain.innerHTML = "客户列表为空，清先添加一个客户";
		tip_goto = "22";
		tip_window.style.opacity = 1.0;

		buy_make_pad.style.webkitFilter = "blur(6px)";
		return;
		// parent.title_onclick(2, 2);
	}
	if(productCount.value == "0")
	{
		// alert('产品目录为空，清先添加一个产品。');
		tip_window.style.visibility = "visible";
		tip_contain.innerHTML = "产品目录为空，清先添加一个产品";
		tip_goto = "10";
		tip_window.style.opacity = 1.0;

		buy_make_pad.style.webkitFilter = "blur(6px)";
		return;
		// parent.title_onclick(1, 0);
	}
	body_onload_common();
}

function tip_button_click()
{
	if(tip_goto == "22")
		parent.lv2_mouseup(2, 2);
	else
		parent.lv2_mouseup(1, 0);
}

function trade_confirm_click()
{
	process_message.style.visibility = "visible";
	s_process_timer = setInterval("process_anime()", 10);

	parent.myxmlhttp = getXmlHttpObject();

	if (parent.myxmlhttp)
	{
		var data = new Object();

		// var myDate = new Date();
		// var month = Number(myDate.getMonth()) + 1;
		// if(month < 10)
		// 	month = "0" + month;
		// var day = Number(myDate.getDate());
		// if(day < 10)
		// 	day = "0" + day;
		
		// var hour = Number(myDate.getHours());
		// if(hour < 10)
		// 	hour = "0" + hour;
		// var minute = Number(myDate.getMinutes());
		// if(minute < 10)
		// 	minute = "0" + minute;
		// var second = Number(myDate.getSeconds());
		// if(second < 10)
		// 	second = "0" + second;
		// var millisecond = Number(myDate.getMilliseconds());
		// if(millisecond < 10)
		// 	millisecond = "00" + millisecond;
		// else if(millisecond < 100)
		// 	millisecond = "0" + millisecond;
		
		// data.orderID = myDate.getFullYear() + month.toString() + day.toString() + hour.toString() + minute.toString() + second.toString() + millisecond.toString();
		data.orderID = trade_num.value;
		data.carNum = trade_car.value;
		data.stockLoca = trade_store.options[trade_store.selectedIndex].text;
		data.name = trade_person.value;
		data.remark = trade_remark.value;
		data.orderDate = trade_time.value;
		data.Product = added_item;

		var data_send = JSON.stringify(data);

		var aim_url = "/BMMS/ProcSalesOrder?time=" + new Date();
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data_send);
	}
}
