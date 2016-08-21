function del_click(index)
{
	var e = document.getElementById(index);
	e.innerHTML = e.innerHTML + "<div id=\"confirm_window" + index + "\" class=\"table-cell-1\" style=\"background-color: rgba(0,0,0,0.8); width: 200px; position: absolute;\">"
							  + "<div style=\"float: left; padding-left: 10px;\"> 确认要删除？ </div>"
							  + "<div id=\"no_btn" + index + "\" style=\"cursor: pointer; float: right; height: 24px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 10px;\""
							  + " onmouseenter=\"button_mouseenter('no_btn" + index + "')\" onmouseleave=\"button_mouseleave('no_btn" + index + "')\" onmousedown=\"button_mousedown('no_btn" + index + "')\" onmouseup=\"button_mouseup('no_btn" + index + "')\""
							  + " onclick=\"myremove_cancle('" + index + "')\">"
							  +	"<p style=\"top: 50%; transform: translateY(-50%);\"> × </p>"
							  + "</div>"
							  + "<div id=\"yes_btn" + index + "\" style=\"cursor: pointer; float: right; height: 24px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 0px;\""
							  + " onmouseenter=\"button_mouseenter('yes_btn" + index + "')\" onmouseleave=\"button_mouseleave('yes_btn" + index + "')\" onmousedown=\"button_mousedown('yes_btn" + index + "')\" onmouseup=\"button_mouseup('yes_btn" + index + "')\""
							  + " onclick=\"myremove_confirm('" + index + "')\">"
							  + "<p style=\"top: 50%; transform: translateY(-50%);\"> √ </p>"
							  + "</div></div>";
}

function del_click_little(index)
{
	var e = document.getElementById(index);
	e.innerHTML = e.innerHTML + "<div id=\"confirm_window" + index + "\" class=\"table-cell-1-little\" style=\"background-color: rgba(0,0,0,0.8); width: 200px; position: absolute;\">"
							  + "<div style=\"float: left; padding-left: 10px;\"> 确认要删除？ </div>"
							  + "<div id=\"no_btn" + index + "\" style=\"cursor: pointer; float: right; height: 16px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 10px;\""
							  + " onmouseenter=\"button_mouseenter('no_btn" + index + "')\" onmouseleave=\"button_mouseleave('no_btn" + index + "')\" onmousedown=\"button_mousedown('no_btn" + index + "')\" onmouseup=\"button_mouseup('no_btn" + index + "')\""
							  + " onclick=\"myremove_cancle('" + index + "')\">"
							  +	"<p style=\"top: 50%; transform: translateY(-50%);\"> × </p>"
							  + "</div>"
							  + "<div id=\"yes_btn" + index + "\" style=\"cursor: pointer; float: right; height: 16px; width: 24px; font-size: 12px; margin-left: 0px; margin-right: 0px;\""
							  + " onmouseenter=\"button_mouseenter('yes_btn" + index + "')\" onmouseleave=\"button_mouseleave('yes_btn" + index + "')\" onmousedown=\"button_mousedown('yes_btn" + index + "')\" onmouseup=\"button_mouseup('yes_btn" + index + "')\""
							  + " onclick=\"myremove_confirm('" + index + "')\">"
							  + "<p style=\"top: 50%; transform: translateY(-50%);\"> √ </p>"
							  + "</div></div>";
}

function myremove_cancle(index)
{
	var e = document.getElementById("confirm_window" + index);

	e.parentNode.removeChild(e);
}
