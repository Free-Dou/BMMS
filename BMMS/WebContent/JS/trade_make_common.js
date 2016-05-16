var Base_Blur = 0;
var Base = null;
/*	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
*/

function add_click_trade(bName)
{
	Base = document.getElementById(bName);
	confirm_window.style.visibility = "visible";
	confirm_window_inner.style.height = full_table.offsetHeight + 100 + "px";
	copy_table.innerHTML = full_table.innerHTML;
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
		Base.style.webkitFilter = "blur(6px)"
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
		Base.style.webkitFilter = "blur(0px)"
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		confirm_window.style.visibility = "hidden";

		copy_table.innerHTML = "";
		return;
	}
	setTimeout("hide_window_trade()", 10);
}
