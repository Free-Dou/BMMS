var Base_Blur = 0;
var Base = null;
/*	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
*/

var now_line_style = 1;
var line_width = new Array(8,20,20,8,8,8,25);
var total_count = 0;
var total_money = 0;
var added_item = new Array();
var now_index = 0;
var confirming = false;
var hasTradeNum = false;

var tip_goto = "";

var data_add = null;

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

function body_onload_common()
{
	var date_now = get_now_date();
	trade_time.value = date_now;
}

function add_click_trade(bName)
{
	hide_myselect();
	var person_exist = false;
	for(var i = 0; i < saved_person.options.length; i++)
		if(saved_person.options[i].text ==  trade_person.value)
		{
			person_exist = true;
			break;
		}
	if(person_exist == false)
	{
		alert('用户信息不存在');
		return;
	}

	var obj = document.getElementById("trade_num");

	if(added_item.length != 0 && obj.getAttribute("HaveContains") == 1)
		trade_confirm_button.style.visibility = "visible";
	else
		trade_confirm_button.style.visibility = "hidden";

	Base = document.getElementById(bName);
	confirm_window.style.visibility = "visible";
	confirm_window_inner.style.height = full_table.offsetHeight + 100 + "px";
	copy_table.innerHTML = full_table.innerHTML;
	copy_tradeNum.innerHTML = obj.value;
	confirming = true;
	setTimeout("show_window_trade()", 10);
}

function add_click_addon(bName, aWindowName)
{
	hide_myselect();
	add_click(bName, aWindowName);
}

function show_window_trade()
{
	confirm_window.style.opacity = Number(confirm_window.style.opacity) + 0.1;

	Base.style.webkitFilter = "blur(" + 6 * Number(confirm_window.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;

	if(confirm_window.style.opacity >= 1.0)
	{
		confirm_window.style.opacity = 1.0;
		Base.style.webkitFilter = "blur(6px)";
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		return;
	}
	setTimeout("show_window_trade()", 10);
}

function hide_window_trade()
{
	var opacity_now = Number(confirm_window.style.opacity);
	opacity_now = opacity_now - 0.1;
	if(opacity_now <= 0.0)
		confirm_window.style.opacity = 0.0;
	else
		confirm_window.style.opacity = opacity_now;
	// confirm_window.style.opacity = Number(confirm_window.style.opacity) - 0.1;
	Base.style.webkitFilter = "blur(" + 6 * Number(confirm_window.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;
	if(confirm_window.style.opacity <= 0.0)
	{
		confirm_window.style.opacity = 0.0;
		Base.style.webkitFilter = "blur(0px)";
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		confirm_window.style.visibility = "hidden";

		copy_table.innerHTML = "";
		confirming = false;
		return;
	}
	setTimeout("hide_window_trade()", 10);
}

function table_add(data)
{
	var add_item_text = "<div id=\"line_" + now_index + "\" class=\"table-line\">";
	add_item_text = add_item_text + "<div class=\"table-cell-" + now_line_style + " cell-head\" style=\"width: 8%;\" onclick=\"myremove(\'line_" + now_index + "\')\"> - </div>";
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

function myremove(index)
{
	if(confirming == false)
		del_click(index);
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
	if(data_add == null)
	{
		alert('请选择一个产品');
		return;
	}
	if(input_add_num.value == "" || isNaN(input_add_num.value) || Number(input_add_num.value) == 0)
	{
		input_add_num.value = 0;
	}
	if(input_add_price.value == "" || isNaN(input_add_price.value) || Number(input_add_price.value) == 0)
	{
		input_add_price.value = 0;
	}
	
	var item = new Object();
	item.SN = data_add.Spec;
	item.Name = data_add.Name;
	item.Count = input_add_num.value;
	item.Price = input_add_price.value;
	item.TotalPrice = Number(input_add_num.value) * Number(input_add_price.value);
	item.Others = input_add_others.value;
	added_item.push(item);

	table_add(item);

	reset_final_cell();

	resetSelected(data_add.id);
	data_add = null;

	cancle_click("buy_make_pad", "add_window");
}

function myremove_confirm(index)
{
	var e = document.getElementById(index);

	e.parentNode.removeChild(e);

	added_item.splice(index, 1);
	now_index = now_index - 1;
	rebuild_table();
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

function cancle_click(bName, aWindowName)
{
	input_add_num.value = 0;
	input_add_price.value = 0;
	input_add_others.value = "";

	input_add_num.style.backgroundColor = "#FFFFFF";
	input_add_price.style.backgroundColor = "#FFFFFF";
	hide_window(bName, aWindowName);
}

function trade_cancle_click()
{
	setTimeout("hide_window_trade()", 10);
}

function hover_input_focus(id)
{
	var obj = document.getElementById(id);
	if(obj.getAttribute("HaveContains") == "0")
		obj.value = "";
	obj.style.color = "#FFFFFF";
	console.info("This focused.");
}

function hover_input_blur(id)
{
	var obj = document.getElementById(id);
	console.info(obj.value);
	if(obj.value == "")
	{
		console.info("This is null");
		obj.value = "请输入单号";
		obj.style.color = "#AAAAAA";
		obj.setAttribute("HaveContains", "0");
	}
	else
		obj.setAttribute("HaveContains", "1");
}

function resetSelected(id)
{
	var oldHead = document.getElementById(id + "_head");
	var oldSpec = document.getElementById(id + "_pSpec");
	var oldName = document.getElementById(id + "_pName");

	oldHead.innerHTML = "";
}

function lineclick(id)
{
	if(data_add != null)
		resetSelected(data_add.id);
	else
		data_add = new Object();
	var objHead = document.getElementById(id + "_head");
	var objSpec = document.getElementById(id + "_pSpec");
	var objName = document.getElementById(id + "_pName");

	objHead.innerHTML = "√";

	data_add.id = id;
	data_add.Spec = objSpec.innerHTML;
	data_add.Name = objName.innerHTML;
}

function searchProduct()
{
	var searchStr = search_box.value;
	var tempHTML = "";

	var selnow = 0;
	for(var i = 0; i < saved_item_spec.options.length; i++)
	{
		if(saved_item_spec.options[i].text.indexOf(searchStr) >= 0)
		{
			tempHTML = tempHTML + "<div class=\"table-line\">";
			tempHTML = tempHTML + "<div id=\"" + saved_item_name.options[i].text + "_head\" onclick=\"lineclick(\'" + saved_item_name.options[i].text + "\')\" class=\"table-cell-" + ((selnow % 2) + 1) + " cell-head\"> </div>";
			tempHTML = tempHTML + "<div id=\"" + saved_item_name.options[i].text + "_pSpec\" class=\"table-cell-" + ((selnow % 2) + 1) + "\">" + saved_item_spec.options[i].text + "</div>";
			tempHTML = tempHTML + "<div id=\"" + saved_item_name.options[i].text + "_pName\" class=\"table-cell-" + ((selnow % 2) + 1) + "\">" + saved_item_name.options[i].text + "</div>";
			tempHTML = tempHTML + "</div>";

			selnow++;
		}
	}
	table_inner_selectList.innerHTML = "";
	table_inner_selectList.innerHTML = tempHTML;
}

function select_item_enter(id)
{
	var select_item = document.getElementById(id);
	select_item.style.backgroundColor = "rgba(0,255,0,0.6)";
}

function select_item_leave(id)
{
	var select_item = document.getElementById(id);
	select_item.style.backgroundColor = "rgba(0,255,0,0)";
}

function select_item_down(id)
{
	var select_item = document.getElementById(id);
	select_item.style.backgroundColor = "rgba(0,255,0,0.4)";
}

function select_item_up(id)
{
	var select_item = document.getElementById(id);
	select_item.style.backgroundColor = "rgba(0,0,255,0.6)";
}

function select_item_click(id, input_id, select_id)
{
	var my_select = document.getElementById(select_id);
	var select_item = document.getElementById(id);
	var select_input = document.getElementById(input_id);
	select_input.value = select_item.innerHTML;
	my_select.style.visibility = "hidden";
}

function show_person_search(e, id, select_id)
{
	var keynum = 0;
	if(window.event) // IE
		keynum = e.keyCode
	else if(e.which) // Netscape/Firefox/Opera
		keynum = e.which

	if(keynum == 13)
	{
		var my_select = document.getElementById(select_id);
		var select_input = document.getElementById(id);

		var searchStr = select_input.value;
		var tempHTML = "";

		for(var i = 0; i < saved_person.options.length; i++)
			if(saved_person.options[i].text.indexOf(searchStr) >= 0)
			{
				var customerName = saved_person.options[i].text;
				tempHTML = tempHTML + "<div id=\"" + customerName + "\" class=\"select-item\" onmouseenter=\"select_item_enter('" + customerName + "')\" onmouseleave=\"select_item_leave('" + customerName + "')\" onmousedown=\"select_item_down('" + customerName + "')\" onmouseup=\"select_item_up('" + customerName + "')\" onclick=\"select_item_click('" + customerName + "', 'trade_person', 'my_select_person')\">" + customerName + "</div>";
			}
		my_select.innerHTML = "";
		my_select.innerHTML = tempHTML;

		my_select.style.visibility = "visible";
	}
}

function hide_myselect()
{
	var my_select = document.getElementById('my_select_person');
	my_select.style.visibility = "hidden";
}

// function select_lost_focus(select_id, input_id)
// {
// 	var my_select = document.getElementById(select_id);
// 	var select_input = document.getElementById(input_id);

// 	var person_exist = false;
// 	for(var i = 0; i < saved_person.options.length; i++)
// 		if(saved_person.options[i].text ==  select_input.value)
// 		{
// 			person_exist = true;
// 			break;
// 		}
// 	if(person_exist == false)
// 		select_input.value = "";
// 	my_select.style.visibility = "hidden";
// }

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
