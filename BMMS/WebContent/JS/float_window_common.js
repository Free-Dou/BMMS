var Base_Blur = 0;
var Base = null;
/*	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
*/

function add_click(bName)
{
	Base = document.getElementById(bName);
	add_window.style.visibility = "visible";
	setTimeout("show_window()", 10);
}

function show_window()
{
	add_window.style.opacity = Number(add_window.style.opacity) + 0.1;

	Base.style.webkitFilter = "blur(" + 6 * Number(add_window.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;

	if(add_window.style.opacity >= 1.0)
	{
		add_window.style.opacity = 1.0;
		Base.style.webkitFilter = "blur(6px)"
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		return;
	}
	setTimeout("show_window()", 10);
}

function hide_window()
{
	var opacity_now = Number(add_window.style.opacity);
	opacity_now = opacity_now - 0.1;
	if(opacity_now <= 0.0)
		add_window.style.opacity = 0.0;
	else
		add_window.style.opacity = opacity_now;
	// add_window.style.opacity = Number(add_window.style.opacity) - 0.1;
	Base.style.webkitFilter = "blur(" + 6 * Number(add_window.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;
	if(add_window.style.opacity <= 0.0)
	{
		add_window.style.opacity = 0.0;
		Base.style.webkitFilter = "blur(0px)"
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		add_window.style.visibility = "hidden";
		return;
	}
	setTimeout("hide_window()", 10);
}
