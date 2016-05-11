<%@page import="java.util.ArrayList"%>
<%@page import="dou.metaObject.Customer"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<style type="text/css">
			@import url(CSS/common-style.css);
		</style>
		<style type="text/css">
			@import url(CSS/table_common.css);
		</style>
		<style type="text/css">
			@import url(CSS/right_common_style.css);
		</style>
		<script type="text/javascript" src="JS/personal_message.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
	</head>
		<body>
		<div id="custom_info_pad" class="right-page-contains">
			<div class="right-page-title"> 客户档案 </div>
			<div class="table-line">
				<div class="table-title-cell cell-head"></div>
				<div class="table-title-cell" style="width: 35%;"> 名称 </div>
				<div class="table-title-cell" style="width: 15%;"> 电话 </div>
				<div class="table-title-cell" style="width: 15%;"> 传真 </div>
				<div class="table-title-cell" style="width: 15%;"> 联系人 1 </div>
				<div class="table-title-cell" style="width: 15%;"> 联系人 2 </div>
			</div>

			<%
				ArrayList<Customer> customerList = Customer.getAllCustomerInfo();
				
				for (int i = 0; i < customerList.size(); i++){
					Customer customerObject = customerList.get(i);
					
					out.print("<div class=\"table-line\">");
					out.print("<div class=\"table-cell-" + (i + 1) + " cell-head\"> - </div>");
					out.print("<div class=\"table-cell-" + (i + 1) + "\" style=\"width: 35%;\">" + customerObject.getcName() + "</div>");
					out.print("<div class=\"table-cell-" + (i + 1) + "\" style=\"width: 15%;\">" + customerObject.getcTel() + "</div>");
					out.print("<div class=\"table-cell-" + (i + 1) + "\" style=\"width: 15%;\">" + customerObject.getcFax() + "</div>");
					out.print("<div class=\"table-cell-" + (i + 1) + "\" style=\"width: 15%;\">" + customerObject.getcContact1() + "</div>");
					out.print("<div class=\"table-cell-" + (i + 1) + "\" style=\"width: 15%;\">" + customerObject.getcContact2() + "</div>");
					out.print("</div>");
				}
			%>

			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="saleinfo_footer_button_1" onmouseenter="button_mouseenter_footer('saleinfo_footer_button_1')" onmouseleave="button_mouseleave_footer('saleinfo_footer_button_1')" onmousedown="button_mousedown_footer('saleinfo_footer_button_1')" onmouseup="button_mouseup_footer('saleinfo_footer_button_1')">
					<img src="IMG/add.png" class="footer-button-img">
					<p>添加</p>
				</div>
			</dir>
		</div>
	</body>
</html>