var page_now = "";
var page_change_to = "";
var onchange_flag = false;
var selected = [-1, -1];

var left_base_status = new Array();

var LEFT_BASE_TITLE = new Array("信息中心", "产品", "销售", "采购", "仓储", "工程量");
var LEFT_BASE_LV2_TITLE = new Array();

LEFT_BASE_LV2_TITLE[0] = new Array("系统消息", "个人消息");
LEFT_BASE_LV2_TITLE[1] = new Array("产品信息");
LEFT_BASE_LV2_TITLE[2] = new Array("销售开单", "销售分析", "客户档案");
LEFT_BASE_LV2_TITLE[3] = new Array("入库开单", "采购分析", "供应商档案");
LEFT_BASE_LV2_TITLE[4] = new Array("仓储信息");
LEFT_BASE_LV2_TITLE[5] = new Array("工程量管理");

var RIGHT_PAGE_NAME = new Array();

RIGHT_PAGE_NAME[0] = new Array("system_message.jsp", "personal_message.html");
RIGHT_PAGE_NAME[1] = new Array("item_info.jsp");
RIGHT_PAGE_NAME[2] = new Array("sale_make.jsp", "sale_analyze.html", "custom_info.jsp");
RIGHT_PAGE_NAME[3] = new Array("buy_make.jsp", "buy_analyze.html", "suppliers_info.jsp");
RIGHT_PAGE_NAME[4] = new Array("storehouse_info.jsp");
RIGHT_PAGE_NAME[5] = new Array("project_info.html");

// LEFT_BASE_LV2_TITLE[6] = new Array("会议室 1", "会议室 2", "会议室 3");
// LEFT_BASE_LV2_TITLE[7] = new Array("仓库监视", "人员监视");

for(var i = 0; i < LEFT_BASE_TITLE.length; i++)
	left_base_status[i] = 0;
setTimeout("set_main()", 1);

var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var cover_alpha = 0;
var s_load_timer = 0;
var s_unload_timer = 0;
var s_process_timer = 0;

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

function myBrowser()
{
	var userAgent = navigator.userAgent;
	console.info(navigator.userAgent);
	if (userAgent.indexOf("Opera") > -1)
		return "Opera"
	if (userAgent.indexOf("Firefox") > -1)
		return "FF";
	if (userAgent.indexOf("Chrome") > -1)
		return "Chrome";
	if (userAgent.indexOf("Safari") > -1)
		return "Safari";
	if (userAgent.indexOf(".NET4.0C; .NET4.0E;") > -1)
		return "IE";
}
var mb = myBrowser();
if ("IE" == mb) {
	location.href='IE404.html';
}
if ("FF" == mb) {
}
if ("Chrome" == mb) {
}
if ("Opera" == mb) {
}
if ("Safari" == mb) {
}

function set_main()
{
	var e_b = document.getElementById("main_back");
	var e_n = document.getElementById("right_base");
	var x = document.getElementById("page_main");

	e_n.style.width = e_b.offsetWidth - 250 + "px";
	page_main.style.height = e_b.offsetHeight - 48 + "px";
}
function body_onload()
{
	// var x = document.getElementById("base_title_0");
	// x.style.color = "#FFFFB0";
	// x.style.backgroundColor = "rgba(255,255,255,0.4)";

	var x = document.getElementById("left_menu");
	x.innerHTML = "";
	for(var i = 0; i < LEFT_BASE_TITLE.length ; i++)
	{
		x.innerHTML += "<div class=\"left-item\" id=\"base_title_" + i + "\" onmouseenter=\"title_mouseenter('" + i + "')\" onmouseleave=\"title_mouseleave('" + i + "')\" onmousedown=\"title_mousedown('" + i + "')\" onmouseup=\"title_mouseup('" + i + "')\"> " + LEFT_BASE_TITLE[i] + " </div>";

		var control_string = "";
		control_string += "<div class=\"left-item-lv2-pad\" id=\"base_" + i + "_lv2\">";
		for(j = 0; j < LEFT_BASE_LV2_TITLE[i].length; j++)
		{
			control_string += "<div class=\"left-item-lv2\" id=\"base_" + i + "_lv2_" + j + "\" onmouseenter=\"lv2_mouseenter('" + i + "','" + j + "')\" onmouseleave=\"lv2_mouseleave('" + i + "','" + j + "')\" onmousedown=\"lv2_mousedown('" + i + "','" + j + "')\" onmouseup=\"lv2_mouseup('" + i + "','" + j + "')\"> " + LEFT_BASE_LV2_TITLE[i][j] + " </div>";
			// if(!(i == 2 && j == 0) && !(i == 3 && j == 0))
			// {
			// 	console.info(i + "  " + j)
			// 	var x1 = document.getElementById("page_right_" + i + "_" + j);
			// 	x1.innerHTML = "<div class=\"right-page-title\"> " + LEFT_BASE_LV2_TITLE[i][j] + " </div>" + x1.innerHTML;
			// }
		}
		control_string += "<div id=\"base_" + i + "_lv2_end\"></div>";

		control_string += "</div>";

		x.innerHTML += control_string;
	}
}
function title_mouseenter(index)
{
	if(left_base_status[index] == 0)
	{
		var x = document.getElementById("base_title_" + index);
		x.style.color = "#B0B0FF";
		x.style.backgroundColor = "rgba(128,128,128,0.4)";
	}
}
function title_mouseleave(index)
{
	if(left_base_status[index] == 0)
	{
		var x = document.getElementById("base_title_" + index);
		x.style.color = "#B0B0FF";
		x.style.backgroundColor = "rgba(128,128,128,0.2)";
	}
}
function title_mousedown(index)
{
	var x = document.getElementById("base_title_" + index);
	x.style.color = "#A0A0EE";
	x.style.backgroundColor = "rgba(128,128,128,0.3)";
}
function title_mouseup(index)
{
	if(left_base_status[index] == 0)
	{
		var x = document.getElementById("base_title_" + index);
		x.style.color = "#FFFFB0";
		x.style.backgroundColor = "rgba(255,255,255,0.4)";

		var x_1 = document.getElementById("base_" + index + "_lv2");
		var x_1_end = document.getElementById("base_" + index + "_lv2_end");

		x_1.style.height = x_1_end.offsetTop + "px";

		left_base_status[index] = 1;
	}
	else
	{
		var x = document.getElementById("base_title_" + index);
		x.style.color = "#B0B0FF";
		x.style.backgroundColor = "rgba(128,128,128,0.4)";

		var x_1 = document.getElementById("base_" + index + "_lv2");
		x_1.style.height = 0 + "px";

		left_base_status[index] = 0;
	}
}

function lv2_mouseenter(base, index)
{
	if(selected[0] != base || selected[1] != index)
	{
		var x = document.getElementById("base_" + base + "_lv2_" + index);
		x.style.color = "#FFFFFF";
		x.style.backgroundColor = "rgba(128,128,128,0.3)";
	}
}
function lv2_mouseleave(base, index)
{
	if(selected[0] != base || selected[1] != index)
	{
		var x = document.getElementById("base_" + base + "_lv2_" + index);
		x.style.color = "#FFFFFF";
		x.style.backgroundColor = "rgba(128,128,128,0.1)";
	}
}
function lv2_mousedown(base, index)
{
	var x = document.getElementById("base_" + base + "_lv2_" + index);
	x.style.color = "#DDDDDD";
	x.style.backgroundColor = "rgba(0,0,0,0.5)";
}
function lv2_mouseup(base, index)
{
	if(onchange_flag == false)
	{
		var temp = new Array();
		temp[0] = selected[0];
		temp[1] = selected[1];

		selected[0] = base;
		selected[1] = index;

		if(temp[0] != -1)
			lv2_mouseleave(temp[0], temp[1]);

		var x = document.getElementById("base_" + base + "_lv2_" + index);
		x.style.color = "#FFFFB0";
		x.style.backgroundColor = "rgba(0,0,0,0.3)";

		title_onclick(base, index);
	}
	else if(selected[0] != base || selected[1] != index)
	{
		var x = document.getElementById("base_" + base + "_lv2_" + index);
		x.style.color = "#FFFFFF";
		x.style.backgroundColor = "rgba(128,128,128,0.3)";
	}
}
function title_onclick(base, index)
{
	if(onchange_flag == false)
	{
		// page_change_to = "page_right_" + base + "_" + index;
		page_change_to = RIGHT_PAGE_NAME[base][index];
		if(page_change_to == page_now)
			return;

		onchange_flag = true;

		if(page_now == "")
		{
			page_now = page_change_to;
			// setTimeout("page_change_continue()", 10);

			// var e = document.getElementById(page_now);
			// e.style.visibility = "visible";
			var e = document.getElementById("page_right_0_0");
			e.innerHTML = "<iframe id=\"page_loader\" style=\"height: 100%; width: 100%; border-width: 0px;\" src=\"" + page_now + "\" onload=\"iframe_load_complete()\"></iframe>";
			e.style.visibility = "visible";

			// var e1 = document.getElementById("page_loader");
			// e1.src = page_now;

			process_message.style.visibility = "visible";
			s_process_timer = setInterval("process_anime()", 10);
			// s_load_timer = setInterval("login_show_anime()", 10);

			return;
		}
		else
			setTimeout("page_change()", 10);
	}
}
function page_change()
{
	// var p_old = document.getElementById(page_now);
	var p_old = document.getElementById("page_right_0_0");
	var v = p_old.style.opacity / 6;

	p_old.style.opacity = Number(p_old.style.opacity) - v;
	p_old.style.transform = "translateX(" + (-250) * (1 - p_old.style.opacity) + "px" + ")";

	if(p_old.style.opacity <= 0 || v < 0.001)
	{
		p_old.style.transform = "translateX(-250px)";
		p_old.style.opacity = 0;
		// p_old.style.visibility = "hidden";

		page_now = page_change_to;
		p_old.innerHTML = "<iframe id=\"page_loader\" style=\"height: 100%; width: 100%; border-width: 0px;\" src=\"" + page_now + "\" onload=\"iframe_load_complete()\"></iframe>";
		// var e = document.getElementById(page_now);
		// e.style.visibility = "visible";
		// var e1 = document.getElementById("page_loader");
		// e1.src = page_now;

		process_message.style.visibility = "visible";
		s_process_timer = setInterval("process_anime()", 10);
		// s_load_timer = setInterval("login_show_anime()", 10);

		return;
	}
	setTimeout("page_change()", 10);
}
function page_change_continue()
{
	// var e = document.getElementById(page_now);
	var e = document.getElementById("page_right_0_0");
	var v = (1 - e.style.opacity) / 6;

	e.style.opacity = Number(e.style.opacity) + v;
	e.style.transform = "translateX(" + (-250) * (1 - e.style.opacity) + "px" + ")";

	if(e.style.opacity >= 1 || v < 0.001)
	{
		e.style.transform = "translateX(0px)";
		e.style.opacity = 1;

		onchange_flag = false;
		return;
	}
	setTimeout("page_change_continue()", 10);
}

function login_show_anime()
{
	var e = document.getElementById("process_message");
	cover_alpha = cover_alpha + 0.03;
	e.style.backgroundColor = "rgba(0,0,0," + cover_alpha + ")";
	if(cover_alpha >= 0.6)
	{
		clearInterval(s_load_timer);
		return;
	}
}

function process_anime()
{
	process_time_last = process_time_last + 1;
	var need_change = parseInt(process_time_last / 10);
	if(need_change > 5)
		need_change = 5;
	for(var i = 0; i < need_change; i++)
	{
		var e = document.getElementById("pi" + i);
		if (pi_pos[i] > 360) 
			pi_pos[i] = pi_pos[i] - 360;

		if(pi_pos[i] < 180)
			pi_pos[i] = pi_pos[i] + (pi_pos[i] + 10) / 20;
		else if(pi_pos[i] < 360)
			pi_pos[i] = pi_pos[i] + (360 - pi_pos[i] + 10) / 20;

		var new_x = center_x + Math.sin(2 * Math.PI / 360 * pi_pos[i]) * 50;
		var new_y = center_y - Math.cos(2 * Math.PI / 360 * pi_pos[i]) * 50;

		e.style.top = new_y + "px";
		e.style.left = new_x + "px";
		console.info("processtimer running.");
	}
}

function iframe_load_complete()
{
	if (!page_loader.readyState || page_loader.readyState == "complete")
	{
		clearInterval(s_process_timer);
		// clearInterval(s_load_timer);
		// s_unload_timer = setInterval("load_complete_anime()");
		process_message.style.visibility = "hidden";
		setTimeout("page_change_continue()", 10);
		
		console.info("load complete stop loadtimer & processtimer.");
	}
}

function load_complete_anime()
{
	var e = document.getElementById("process_message");
	cover_alpha = cover_alpha - 0.03;
	e.style.backgroundColor = "rgba(0,0,0," + cover_alpha + ")";
	if(cover_alpha <= 0.0)
	{
		clearInterval(s_unload_timer);
		process_message.style.visibility = "hidden";
		console.info("hiddened");
		return;
	}
}

function refresh_now_page()
{
	setTimeout();
	if(onchange_flag == false)
	{
		page_change_to = page_now;
		setTimeout("page_change()", 10);
	}
}
