<%@page import="dou.metaObject.ProjectQunatity"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta charset="utf-8">

<html>
	<head>
		<title></title>
		<style type="text/css">
			@import url(CSS/right_common_style.css);
		</style>
		<style type="text/css">
			@import url(CSS/table_common.css);
		</style>
		<script type="text/javascript" src="JS/project_info.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
	</head>
	<body>
		<div id="item_info_pad" class="right-page-contains">
			<div class="right-page-title"> 工程量管理 </div>
			<div class="table-line">
				<div class="table-title-cell" style="width: 2%;"></div>
				<div class="table-title-cell" style="width: 30%;"> 工程名 </div>
				<div class="table-title-cell" style="width: 30%;"> 预算 </div>
				<div class="table-title-cell" style="width: 30%;"> 已支付 </div>
				<div class="table-title-cell" style="width: 5%;"> 操作 </div>
			</div>
			<div class="table-line">
				<%
					ArrayList<ProjectQunatity> projectQunatityList = ProjectQunatity.getAllCustomerInfo();
					
					if (null != projectQunatityList){
						for (int i = 0; i < projectQunatityList.size(); i++){
							ProjectQunatity projectQunatityObject = projectQunatityList.get(i);
						
							out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 2%;\"> - </div>");
							out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 30%;\">" + projectQunatityObject.getProjectName() + "</div>");
							out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 30%;\">" + String.format("%.2f", projectQunatityObject.getBudget()) + "￥</div>");
							out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 30%;\">" + String.format("%.2f", projectQunatityObject.getPaid()) + "￥</div>");
							out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 5%;\">" + "￥</div>");
						}
					}
				%>
			</div>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="item_footer_button_1" onmouseenter="button_mouseenter_footer('item_footer_button_1')" onmouseleave="button_mouseleave_footer('item_footer_button_1')" onmousedown="button_mousedown_footer('item_footer_button_1')" onmouseup="button_mouseup_footer('item_footer_button_1')">
					<img src="IMG/add.png" class="footer-button-img">
					<p>添加</p>
				</div>
			</dir>
		</div>
	</body>
</html>