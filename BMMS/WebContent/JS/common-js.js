var color_store = "";

var process_time_last = 0;
var pi_pos = new Array();
var center_y = 50;
var center_x = 50;
var s_process_timer = 0;

for(var i = 0; i < 5; i++)
	pi_pos[i] = 0;

function button_mouseenter(button_id)
{
	var x = document.getElementById(button_id);
	color_store = x.style.backgroundColor;
	x.style.color = "black";
	x.style.backgroundColor = "white";
}
function button_mouseleave(button_id)
{
	var x = document.getElementById(button_id);
	x.style.color = "white";
	// x.style.backgroundColor = "#0078D7";
	x.style.backgroundColor = color_store;
}
function button_mousedown(button_id)
{
	var x = document.getElementById(button_id);
	x.style.color = "black";
	x.style.backgroundColor = "#F7F7F7";
}
function button_mouseup(button_id)
{
	var x = document.getElementById(button_id);
	x.style.color = "black";
	x.style.backgroundColor = "white";
}

function button_mouseenter_footer(button_id)
{
	var x = document.getElementById(button_id);
	x.style.backgroundColor = "rgba(255,255,255,0.2)";
}
function button_mouseleave_footer(button_id)
{
	var x = document.getElementById(button_id);
	x.style.backgroundColor = "rgba(255,255,255,0.0)";
}
function button_mousedown_footer(button_id)
{
	var x = document.getElementById(button_id);
	x.style.backgroundColor = "rgba(255,255,255,0.1)";
}
function button_mouseup_footer(button_id)
{
	var x = document.getElementById(button_id);
	x.style.backgroundColor = "rgba(255,255,255,0.2)";
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
		console.info("item info processtimer running.");
	}
}
