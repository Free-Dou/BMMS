var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var cover_alpha = 0;
var pi_parent_scale = 1;
var myxmlhttp = "";

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

setTimeout("login_banner_show()", 10);
function login_banner_show()
{
	var x = document.getElementById("test");
	var v = (200 - x.offsetHeight) / 6;
	if(v < 1)
		return;
	x.style.height = x.offsetHeight + v + "px";
	setTimeout("login_banner_show()", 10);
}

function login_click()
{
	myxmlhttp = getXmlHttpObject();
	// document.forms["login_form"].submit();
	// console.info("clicked");
	login_show();
}

function login_success(hold_time)
{
	var e = document.getElementById("process_tip");
	e.innerHTML="登录成功，" + hold_time + " 秒后跳转";
	hold_time = hold_time - 1;
	if(hold_time < 0)
	{
		location.href='mainpage.html';
		return;
	}
	setTimeout("login_success('" + hold_time + "')", 1000);
}
function login_show()
{
	var e = document.getElementById("pi1");

	e = document.getElementById("process_message");
	e.style.visibility = "visible";

	var s_id = setInterval("process_anime()", 10);
	setTimeout("login_show_anime()", 10);
	setTimeout("process_going('" + s_id + "')", 10);
}

function login_show_anime()
{
	var e = document.getElementById("process_message");
	cover_alpha = cover_alpha + 0.03;
	e.style.backgroundColor = "rgba(0,0,0," + cover_alpha + ")";
	if(cover_alpha >= 0.6)
		return;
	setTimeout("login_show_anime()", 10);
}

function process_anime()
{
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
	}
}

function process_going(session_id)
{
	process_time_last = process_time_last + 1;
	if(process_time_last >= 300)
	{
		setTimeout("process_complete('" + session_id +"')", 10);
		
		var e = document.getElementById("process_tip");
		e.innerHTML="登录成功，3 秒后跳转";

		setTimeout("login_success('" + 2 + "')", 1000);
		return;
	}
	setTimeout("process_going('" + session_id +"')", 10);
}

function process_complete(session_id)
{
	var e = document.getElementById("pi_parent");
	var e1 = document.getElementById("login_success_img");
	pi_parent_scale = pi_parent_scale - 0.03;
	var temp = 1 - pi_parent_scale;
	e.style.transform = "translateX(-50%) scale(" + pi_parent_scale + ", " + pi_parent_scale + ")";
	e1.style.transform = "translateX(-50%) scale(" + temp + ", " + temp + ")";
	console.info(e1.style.transform);
	if(pi_parent_scale <= 0)
	{
		clearInterval(session_id);
		return;
	}
	setTimeout("process_complete('" + session_id +"')", 10);
}
