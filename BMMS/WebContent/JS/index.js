var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var pi_parent_scale = 1;
var myxmlhttp = "";
var anime_session = 0;
var final_img = "";

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

function check_login_result()
{
	if (myxmlhttp.readyState==4 && myxmlhttp.status==200)
	{
		var b = myxmlhttp.responseText;    
		if(b == "success")
		{
			final_img = "login_success_img";
			setTimeout("process_complete('" + anime_session +"')", 10);

			var e = document.getElementById("process_tip");
			e.innerHTML="登录成功，3 秒后跳转";

			setTimeout("login_success('" + 2 + "')", 1000);

			// window.document.location.href = "mainpage.jsp";
		}
		else if(b == "failed")
		{
			final_img = "login_failed_img";
			setTimeout("process_complete('" + anime_session +"')", 10);
		
			var e = document.getElementById("process_tip");
			e.innerHTML="登录失败，请重试";

			setTimeout("login_failed('" + 1 + "')", 1000);
		}
	}
}

function login_click()
{
	login_show();

	var e = document.getElementById("password");
	e.value = hex_md5(e.value);
	var e1 = document.getElementById("username");
	myxmlhttp = getXmlHttpObject();

	if (myxmlhttp)
	{
		var aim_url = "/BMMS/LoginServlet?time=" + new Date();
		var data = "username=" + e1.value + "&password=" + e.value;
		
		myxmlhttp.open("post", aim_url, true);
		myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		myxmlhttp.onreadystatechange = check_login_result;
		myxmlhttp.send(data);
	}
	// document.forms["login_form"].submit();
}

function login_failed(hold_time)
{
	hold_time = hold_time - 1;
	if(hold_time < 0)
	{
		setTimeout("login_hide_anime()", 10);
		return;
	}
	setTimeout("login_failed('" + hold_time + "')", 1000);
}

function login_hide_anime()
{
	var e = document.getElementById("process_message");
	e.style.opacity = Number(e.style.opacity) - 0.1;
	if(e.style.opacity <= 0.0)
	{
		e.style.opacity = 0.0;
		e.style.visibility = "hidden";

		pi_parent_scale = 1;

		e = document.getElementById("process_tip");
		e.innerHTML = "登录中，请稍后。。。";

		e = document.getElementById("pi_parent");
		var e1 = document.getElementById(final_img);
		var temp = 1 - pi_parent_scale;
		e.style.transform = "translateX(-50%) scale(" + pi_parent_scale + ", " + pi_parent_scale + ")";
		e1.style.transform = "translateX(-50%) scale(" + temp + ", " + temp + ")";

		return;
	}
	setTimeout("login_hide_anime()", 10);
}

function login_success(hold_time)
{
	var e = document.getElementById("process_tip");
	e.innerHTML="登录成功，" + hold_time + " 秒后跳转";
	hold_time = hold_time - 1;
	if(hold_time < 0)
	{
		location.href='mainpage.jsp';
		return;
	}
	setTimeout("login_success('" + hold_time + "')", 1000);
}

function login_show()
{
	var e = document.getElementById("process_message");
	e.style.visibility = "visible";

	anime_session = setInterval("process_anime()", 10);
	setTimeout("login_show_anime()", 10);
	// setTimeout("process_going('" + s_id + "')", 10);
}

function login_show_anime()
{
	var e = document.getElementById("process_message");
	e.style.opacity = Number(e.style.opacity) + 0.1;
	if(e.style.opacity >= 1.0)
	{
		e.style.opacity = 1.0;
		return;
	}
	setTimeout("login_show_anime()", 10);
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
	}
}

// function process_going(session_id)
// {
// 	if(process_time_last >= 300)
// 	{
// 		setTimeout("process_complete('" + session_id +"')", 10);
		
// 		var e = document.getElementById("process_tip");
// 		e.innerHTML="登录成功，3 秒后跳转";

// 		setTimeout("login_success('" + 2 + "')", 1000);
// 		return;
// 	}
// 	setTimeout("process_going('" + session_id +"')", 10);
// }

function process_complete(session_id)
{
	var e = document.getElementById("pi_parent");
	var e1 = document.getElementById(final_img);
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
