<%@page import="dou.metaObject.Supplier"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta charset="utf-8">

<html>
	<head>
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
		<script type="text/javascript" src="JS/orderation_info.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
	</head>
	<body>
		<div id="orderation_info_pad" class="right-page-contains">
			<div class="right-page-title"> 供应商档案 </div>
			<div>
				<div class="table-line">
					<div class="table-title-cell cell-head"></div>
					<div class="table-title-cell" style="width: 35%;"> 名称 </div>
					<div class="table-title-cell" style="width: 15%;"> 电话 </div>
					<div class="table-title-cell" style="width: 15%;"> 传真 </div>
					<div class="table-title-cell" style="width: 15%;"> 联系人 1 </div>
					<div class="table-title-cell" style="width: 15%;"> 联系人 2 </div>
				</div>
				<div id="table_inner">
				
					<%
						ArrayList<Supplier> supplierList = Supplier.getAllSupplierInfo();
					
						if (null != supplierList){
							for (int i = 0; i < supplierList.size(); i++){
							 	Supplier supplierObject = supplierList.get(i);
						
								out.print("<div class=\"table-line\">");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + " cell-head\"> - </div>");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + "\" style=\"width: 35%;\">" + supplierObject.getsName() + "</div>");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + "\" style=\"width: 15%;\">" + supplierObject.getsTel() + "</div>");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + "\" style=\"width: 15%;\">" + supplierObject.getsFax() + "</div>");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + "\" style=\"width: 15%;\">" + supplierObject.getsContact1() + "</div>");
								out.print("<div class=\"table-cell-" + ((i % 2) + 1)  + "\" style=\"width: 15%;\">" + supplierObject.getsContact2() + "</div>");
								out.print("</div>");
							}
						}
					%>
					<!--
 					<div class="table-line">
						<div class="table-cell-1 cell-head"> - </div>
						<div class="table-cell-1" style="width: 35%;"> 001-2016040201 Trash Inc. BMMS™ 项目组 </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
						<div class="table-cell-1" style="width: 15%;"> 13266618140 </div>
						<div class="table-cell-1" style="width: 15%;"> 18215600298 </div>
					</div>
					<div class="table-line">
						<div class="table-cell-2 cell-head"> - </div>
						<div class="table-cell-2" style="width: 35%;"> 002-20160040802 Alibaba Inc. AliCloud™ </div>
						<div class="table-cell-2" style="width: 15%;"> / </div>
						<div class="table-cell-2" style="width: 15%;"> / </div>
						<div class="table-cell-2" style="width: 15%;"> / </div>
						<div class="table-cell-2" style="width: 15%;"> / </div>
					</div>
					<div class="table-line">
						<div class="table-cell-1 cell-head"> - </div>
						<div class="table-cell-1" style="width: 35%;"> 003-20160040903 Huawei Inc. </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
						<div class="table-cell-1" style="width: 15%;"> / </div>
					</div>
					-->
				</div>
			</div>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="buyinfo_footer_button_1" onmouseenter="button_mouseenter_footer('buyinfo_footer_button_1')" onmouseleave="button_mouseleave_footer('buyinfo_footer_button_1')" onmousedown="button_mousedown_footer('buyinfo_footer_button_1')" onmouseup="button_mouseup_footer('buyinfo_footer_button_1')" onclick="add_click('orderation_info_pad')">
					<img src="IMG/add.png" class="footer-button-img">
					<p>添加</p>
				</div>
			</dir>
		</div>
		<div id="add_window" class="new_float_window">
			<div class="set_center" style="height: 300px; width: 400px;">
				<h2> 添加供应商 </h2>
				<div style="height: 40px; text-align: left;">
					<span style="margin-left: 30px;"> 名称： </span> <input id="input_add_name" class="textbox-common"></input>
				</div>
				<div style="height: 40px; text-align: left;">
					<span style="margin-left: 30px;"> 电话： </span> <input id="input_add_tel" class="textbox-common"></input>
				</div>
				<div style="height: 40px; text-align: left;">
					<span style="margin-left: 30px;"> 传真： </span> <input id="input_add_fix" class="textbox-common"></input>
				</div>
				<div style="height: 40px; text-align: left;">
					<span> 联系人 1： </span> <input id="input_add_phone1" class="textbox-common"></input>
				</div>
				<div style="height: 40px; text-align: left;">
					<span> 联系人 2： </span> <input id="input_add_phone2" class="textbox-common"></input>
				</div>
				<div id="confirm_button" class="blue_button" style="margin-right: 54px;" onmouseenter="button_mouseenter('confirm_button')" onmouseleave="button_mouseleave('confirm_button')" onmousedown="button_mousedown('confirm_button')" onmouseup="button_mouseup('confirm_button')" onclick="confirm_click()">
					<p style="top: 50%; transform: translateY(-50%);">
						确定
					</p>
				</div>
				<div id="cancle_button" class="red_button" style="margin-right: 10px;" onmouseenter="button_mouseenter('cancle_button')" onmouseleave="button_mouseleave('cancle_button')" onmousedown="button_mousedown('cancle_button')" onmouseup="button_mouseup('cancle_button')" onclick="cancle_click()">
					<p style="top: 50%; transform: translateY(-50%);">
						取消
					</p>
				</div>
			</div>
		</div>
	</body>
</html>