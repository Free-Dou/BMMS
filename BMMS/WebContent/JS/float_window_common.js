var Base_Blur = 0;
var Base = null;
var ADD_WINDOW = null;
/*	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
*/

// function add_click(bName)
// {
// 	Base = document.getElementById(bName);
// 	ADD_WINDOW = document.getElementById("add_window");
// 	ADD_WINDOW.style.visibility = "visible";
// 	// add_window.style.visibility = "visible";
// 	setTimeout("show_window()", 10);
// }

function add_click(bName, aWindowName)
{
	
	Base = document.getElementById(bName);
	ADD_WINDOW = document.getElementById(aWindowName);
	ADD_WINDOW.style.visibility = "visible";
	// add_window.style.visibility = "visible";
	setTimeout("show_window()", 10);
}

function show_window()
{
	ADD_WINDOW.style.opacity = Number(ADD_WINDOW.style.opacity) + 0.1;

	Base.style.webkitFilter = "blur(" + 6 * Number(ADD_WINDOW.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;

	if(ADD_WINDOW.style.opacity >= 1.0)
	{
		ADD_WINDOW.style.opacity = 1.0;
		Base.style.webkitFilter = "blur(6px)";
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		return;
	}
	setTimeout("show_window()", 10);
}

function hide_window_timer()
{
	var opacity_now = Number(ADD_WINDOW.style.opacity);
	opacity_now = opacity_now - 0.1;
	if(opacity_now <= 0.0)
		ADD_WINDOW.style.opacity = 0.0;
	else
		ADD_WINDOW.style.opacity = opacity_now;
	// add_window.style.opacity = Number(add_window.style.opacity) - 0.1;
	Base.style.webkitFilter = "blur(" + 6 * Number(ADD_WINDOW.style.opacity) + "px)";
	Base.style.mozFilter = Base.style.webkitFilter;
	Base.style.msFilter = Base.style.webkitFilter;
	Base.style.Filter = Base.style.webkitFilter;
	if(ADD_WINDOW.style.opacity <= 0.0)
	{
		ADD_WINDOW.style.opacity = 0.0;
		Base.style.webkitFilter = "blur(0px)";
		Base.style.mozFilter = Base.style.webkitFilter;
		Base.style.msFilter = Base.style.webkitFilter;
		Base.style.Filter = Base.style.webkitFilter;
		ADD_WINDOW.style.visibility = "hidden";
		return;
	}
	setTimeout("hide_window_timer()", 10);
}

function hide_window(bName, aWindowName)
{
	Base = document.getElementById(bName);
	ADD_WINDOW = document.getElementById(aWindowName);
	setTimeout("hide_window_timer()", 10);
}
