var Base_Blur = 0;

/*	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
*/

function add_click()
{
	add_window.style.visibility = "visible";
	setTimeout("show_window()", 10);
}

function show_window()
{
	add_window.style.opacity = Number(add_window.style.opacity) + 0.1;
	item_info_pad.style.webkitFilter = "blur(" + 6 * Number(add_window.style.opacity) + "px)";
	item_info_pad.style.mozFilter = item_info_pad.style.webkitFilter;
	item_info_pad.style.msFilter = item_info_pad.style.webkitFilter;
	item_info_pad.style.Filter = item_info_pad.style.webkitFilter;
	if(add_window.style.opacity >= 1.0)
	{
		add_window.style.opacity = 1.0;
		item_info_pad.style.webkitFilter = "blur(6px)"
		item_info_pad.style.mozFilter = item_info_pad.style.webkitFilter;
		item_info_pad.style.msFilter = item_info_pad.style.webkitFilter;
		item_info_pad.style.Filter = item_info_pad.style.webkitFilter;
		return;
	}
	setTimeout("show_window()", 10);
}

function hide_window()
{
	add_window.style.opacity = Number(add_window.style.opacity) - 0.1;
	item_info_pad.style.webkitFilter = "blur(" + 6 * Number(add_window.style.opacity) + "px)";
	item_info_pad.style.mozFilter = item_info_pad.style.webkitFilter;
	item_info_pad.style.msFilter = item_info_pad.style.webkitFilter;
	item_info_pad.style.Filter = item_info_pad.style.webkitFilter;
	if(add_window.style.opacity <= 0.0)
	{
		add_window.style.opacity = 0.0;
		item_info_pad.style.webkitFilter = "blur(0px)"
		item_info_pad.style.mozFilter = item_info_pad.style.webkitFilter;
		item_info_pad.style.msFilter = item_info_pad.style.webkitFilter;
		item_info_pad.style.Filter = item_info_pad.style.webkitFilter;
		add_window.style.visibility = "hidden";
		return;
	}
	setTimeout("hide_window()", 10);
}

function cancle_click()
{
	setTimeout("hide_window()", 10);
}

function confirm_click()
{
	// document.forms["login_form"].submit();
}
