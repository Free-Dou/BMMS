var now_line_style = 1;
var line_width = new Array(8,20,20,8,8,8,25);
var total_count = 0;
var total_money = 0;
var added_item = new Array();
var now_index = 0;
var confirming = false;

var tip_goto = "";

function body_onload()
{
	if(trade_person.options.length == 0)
	{
		// alert('供应商列表为空，清先添加一个供应商。');
		tip_window.style.visibility = "visible";
		tip_contain.innerHTML = "供应商列表为空，清先添加一个供应商";
		tip_goto = "32";
		tip_window.style.opacity = 1.0;

		buy_make_pad.style.webkitFilter = "blur(6px)";
		return;
		// parent.title_onclick(3, 2);
	}
	if(select_add_name.options.length == 0)
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
}

function tip_button_click()
{
	if(tip_goto == "32")
		parent.lv2_mouseup(3, 2);
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
		
		var aim_url = "/BMMS/ProcWareHousingOrder?time=" + new Date();
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data_send);
	}
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
