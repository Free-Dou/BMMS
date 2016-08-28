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
	// var input_correct = true;
	// console.info(Number(input_add_num.value) == NaN + "   " + Number(input_add_price.value) == NaN);
	// if(input_add_num.value == "" || isNaN(input_add_num.value) || Number(input_add_num.value) == 0 || Number(input_add_num.value).toFixed(0) != Number(input_add_num.value))
	if(data_add == null)
	{
		alert('请选择一个产品');
		return;
	}
	if(input_add_num.value == "" || isNaN(input_add_num.value) || Number(input_add_num.value) == 0)
	{
		input_add_num.value = 0;
		// input_add_num.style.backgroundColor = "rgba(255,255,128,1)";
		// input_correct = false;
	}
	if(input_add_price.value == "" || isNaN(input_add_price.value) || Number(input_add_price.value) == 0)
	{
		input_add_price.value = 0;
		// input_add_price.style.backgroundColor = "rgba(255,255,128,1)";
		// input_correct = false;
	}
	// for(var i = 0; i < added_item.length; i++)
	// 	if(added_item[i].Name == select_add_name.options[select_add_name.selectedIndex].text)
	// 	{
	// 		select_add_name.style.backgroundColor = "rgba(255,255,128,1)";
	// 		exist_tip.style.visibility = "visible";
	// 		input_correct = false;
	// 	}

	// if(input_correct == false)
	// 	return;
	
	var item = new Object();
	// item.SN = select_add_index.options[select_add_index.selectedIndex].text;
	// item.Name = select_add_name.options[select_add_name.selectedIndex].text;
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
	// select_add_index.options[0].selected = true;
	// select_add_name.options[0].selected = true;
	input_add_num.value = 0;
	input_add_price.value = 0;
	input_add_others.value = "";
	// exist_tip.style.visibility = "hidden";

	// select_add_name.style.backgroundColor = "#FFFFFF";
	input_add_num.style.backgroundColor = "#FFFFFF";
	input_add_price.style.backgroundColor = "#FFFFFF";
	hide_window(bName, aWindowName);
	// setTimeout("hide_window()", 10);
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
