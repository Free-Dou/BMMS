var now_line_style = 1;
var line_width = new Array(8,20,20,8,8,8,25);
var total_count = 0;
var total_money = 0;
var added_item = new Array();
var now_index = 0;
var confirming = false;

function table_add(data)
{
	var add_item_text = "<div id=\"line_" + now_index + "\" class=\"table-line\">";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + " cell-head\" style=\"width: 8%;\" onclick=\"myremove(\'" + now_index + "\')\"> - </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 20%;\"> " + data.SN + " </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 20%;\"> " + data.Name + " </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 8%;\"> " + Number(data.Count).toFixed(3) + " </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 8%;\"> " + Number(data.Price).toFixed(2) + "￥ </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 8%;\"> " + Number(data.TotalPrice).toFixed(2) + "￥ </div>";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + "\" style=\"width: 25%;\"> " + data.Others + " </div>";
	add_item_text = add_item_text + "</div>";
	now_index = now_index + 1;

	table_inner.innerHTML = table_inner.innerHTML + add_item_text;

	total_count = Number(Number(total_count) + Number(data.Count)).toFixed(3);
	total_money = Number(Number(total_money) + Number(data.Count) * Number(data.Price)).toFixed(2);

	// console.info(total_count + "   " + total_money);
	now_line_style = now_line_style + 1;
	if(now_line_style > 2)
		now_line_style = 1;
}

function reset_final_cell()
{
	for(var i = 0; i < 7; i++)
	{
		var e = document.getElementById("final_cell_" + i);
		e.className = "table-cell-" + now_line_style;

		if(i == 3)
			e.innerHTML = Number(total_count).toFixed(3);
		else if(i == 5)
			e.innerHTML = Number(total_money).toFixed(2) + "￥";
	}
}

function confirm_click()
{
	// console.info(Number(input_add_num.value) == NaN + "   " + Number(input_add_price.value) == NaN);
	// if(input_add_num.value == "" || isNaN(input_add_num.value) || Number(input_add_num.value) == 0 || Number(input_add_num.value).toFixed(0) != Number(input_add_num.value))
	if(input_add_num.value == "" || isNaN(input_add_num.value) || Number(input_add_num.value) == 0)
	{
		input_add_num.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	if(input_add_price.value == "" || isNaN(input_add_price.value) || Number(input_add_price.value) == 0)
	{
		input_add_price.style.backgroundColor = "rgba(255,255,128,1)";
		return;
	}
	for(var i = 0; i < added_item.length; i++)
		if(added_item[i].Name == select_add_name.options[select_add_name.selectedIndex].text)
		{
			select_add_name.style.backgroundColor = "rgba(255,255,128,1)";
			exist_tip.style.visibility = "visible";
			return;
		}

	var item = new Object();
	item.SN = select_add_index.options[select_add_index.selectedIndex].text;
	item.Name = select_add_name.options[select_add_name.selectedIndex].text;
	item.Count = input_add_num.value;
	item.Price = input_add_price.value;
	item.TotalPrice = Number(input_add_num.value) * Number(input_add_price.value);
	item.Others = input_add_others.value;
	added_item.push(item);

	table_add(item);

	reset_final_cell();

	cancle_click();
}

function myremove(index)
{
	if(confirming == false)
	{
		var e = document.getElementById("line_" + index);
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
}

function myremove_confirm(index)
{
	var e = document.getElementById("line_" + index);

	e.parentNode.removeChild(e);

	added_item.splice(index, 1);
	now_index = now_index - 1;
	rebuild_table();
}

function myremove_cancle(index)
{
	var e = document.getElementById("confirm_window" + index);

	e.parentNode.removeChild(e);
}

function rebuild_table()
{
	table_inner.innerHTML = "";
	now_line_style = 1;
	total_count = 0;
	total_money = 0.00;
	now_index = 0;

	for(var i = 0; i < added_item.length; i++)
		table_add(added_item[i]);

	reset_final_cell();
}

function item_index_changed()
{
	var index = select_add_index.selectedIndex;
	select_add_name.options[index].selected = true;
}

function item_type_changed()
{
	var index = select_add_name.selectedIndex;
	select_add_index.options[index].selected = true;
}

function cancle_click()
{
	select_add_index.options[0].selected = true;
	select_add_name.options[0].selected = true;
	input_add_num.value = 0;
	input_add_price.value = 0;
	input_add_others.value = "";
	exist_tip.style.visibility = "hidden";

	select_add_name.style.backgroundColor = "#FFFFFF";
	input_add_num.style.backgroundColor = "#FFFFFF";
	input_add_price.style.backgroundColor = "#FFFFFF";
	setTimeout("hide_window()", 10);
}

function trade_confirm_click()
{
	parent.myxmlhttp = getXmlHttpObject();

	if (parent.myxmlhttp)
	{
		var data = JSON.stringify(added_item);

		var myDate = new Date();
		var month = Number(myDate.getMonth()) + 1;
		if(month < 10)
			month = "0" + month;
		var day = Number(myDate.getDate());
		if(day < 10)
			day = "0" + day;
		
		var hour = Number(myDate.getHours());
		if(hour < 10)
			hour = "0" + hour;
		var minute = Number(myDate.getMinutes());
		if(minute < 10)
			minute = "0" + minute;
		var second = Number(myDate.getSeconds());
		if(second < 10)
			second = "0" + second;
		var millisecond = Number(myDate.getMilliseconds());
		if(millisecond < 10)
			millisecond = "00" + millisecond;
		else if(millisecond < 100)
			millisecond = "0" + millisecond;
		
		data.orderID = myDate.getFullYear() + month.toString() + day.toString() + hour.toString() + minute.toString() + second.toString() + millisecond.toString();
		data.carNum = trade_car.value;
		data.stockLoca = trade_store.options[trade_store.selectedIndex].text;
		data.name = trade_person.value;
		data.remark = trade_remark.value;
		data.Product = added_item;

		var data_send = JSON.stringify(data);

		// var aim_url = "/BMMS/DelProductInfo?time=" + new Date();
		alert(data);
		// createXMLHttpRequest();
		// myxmlhttp.open("post", aim_url, true);
		// myxmlhttp.onreadystatechange = dispose;
		// myxmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// myxmlhttp.send(data);
	}
}

function trade_cancle_click()
{
	setTimeout("hide_window_trade()", 10);
}

//Select 控件相关
// 1.动态创建select

// function createSelect()
// {
// 	var mySelect = document.createElement("select");
// 	mySelect.id = "mySelect";
// 	document.body.appendChild(mySelect);
// }

// 2.添加选项option

// function addOption()
// {
// 	//根据id查找对象，
// 	var obj=document.getElementById('mySelect');
// 	//添加一个选项
// 	obj.add(new Option("文本","值"));
// }

// 3.删除所有选项option

// function removeAll()
// {
// 	var obj=document.getElementById('mySelect');
// 	obj.options.length=0;
// }

// 4.删除一个选项option

// function removeOne()
// {
// 	var obj=document.getElementById('mySelect');
// 	//index,要删除选项的序号，这里取当前选中选项的序号
// 	var index=obj.selectedIndex;
// 	obj.options.remove(index); 
// }

// 5.获得选项option的值

// var obj=document.getElementById('mySelect');
// var index=obj.selectedIndex; //序号，取当前选中选项的序号
// var val = obj.options[index].value;

// 6.获得选项option的文本

// var obj=document.getElementById('mySelect');
// var index=obj.selectedIndex; //序号，取当前选中选项的序号
// var val = obj.options[index].text;

// 7.修改选项option

// var obj=document.getElementById('mySelect');
// var index=obj.selectedIndex; //序号，取当前选中选项的序号
// var val = obj.options[index]=new Option("新文本","新值");

// 8.删除select

// function removeSelect()
// {
// 	var mySelect = document.getElementById("mySelect");
// 	mySelect.parentNode.removeChild(mySelect);
// }

// 9.设置select option被中

// function removeSelect()
// {
// 	// 向办件人员下拉列表动态添加员工
// 	for ( var i = 0; i < json.length; i++)
// 	{
// 		var newOption = new Option(json[i].empname, json[i].empid, i);
// 		//向办件人员下拉列表添加员工信息
// 		objDeal.options.add(newOption);
// 		//客户业务员的Id不为空
// 		if(empbyDealEmpId != "" || empbyDealEmpId != 0)
// 		{
// 			//员工id等于下拉列表中的值,则下拉列表被选中
// 			if(empbyDealEmpId==objDeal.options[i].value)
// 			{
// 				//判断此下拉列表被选中
// 				objDeal.options[i].selected=true;
// 			}
// 		}
// 	}
// }

// 1 检测是否有选中
// if(objSelect.selectedIndex > -1)
// {
// 	//说明选中 
// }
// else
// {
// 	//说明没有选中
// }
// 2 删除被选中的项
// objSelect.options[objSelect.selectedIndex] = null;
// 3 增加项
// objSelect.options[objSelect.length] = new Option("你好","hello");
// 4 修改所选择中的项
// objSelect.options[objSelect.selectedIndex] = new Option("你好","hello");
// 5 得到所选择项的文本
// objSelect.options[objSelect.selectedIndex].text;
// 6 得到所选择项的值
// objSelect.options[objSelect.selectedIndex].value;
