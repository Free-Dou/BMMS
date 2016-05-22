<%@page import="dou.metaObject.Product"%>
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
		<script type="text/javascript" src="JS/httprequestclass.js"> </script>
		<script type="text/javascript" src="JS/item_info.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
	</head>
	<body>
		<div id="item_info_pad" class="right-page-contains">
			<div class="right-page-title"> 产品信息 </div>
			<div class="table-line">
				<div class="table-title-cell cell-head"></div>
				<div class="table-title-cell"> 编号 </div>
				<div class="table-title-cell"> 产品名称 </div>
			</div>
			<div id="table_inner">
				<%
				/* 输出产品信息 */
				ArrayList<Product> productList = Product.getAllProductInfo();
				if (null != productList){
					for (int i = 0; i < productList.size(); i++){
						Product productObject = productList.get(i);
						
						out.print("<div id=\"" + productObject.getpName() + "\" class=\"table-line\">");
						out.print("<div onclick=\"del_click('" + productObject.getpName() + "')\" class=\"table-cell-" + ((i % 2) + 1) + " cell-head\"> - </div>");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\"> " + productObject.getpSpec() + " </div>");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\"> " + productObject.getpName() + " </div>");
						out.print("</div>");
					}
				}
				%>
			</div>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="item_footer_button_1" onmouseenter="button_mouseenter_footer('item_footer_button_1')" onmouseleave="button_mouseleave_footer('item_footer_button_1')" onmousedown="button_mousedown_footer('item_footer_button_1')" onmouseup="button_mouseup_footer('item_footer_button_1')" onclick="add_click('item_info_pad')">
					<img src="IMG/add.png" class="footer-button-img">
					<p>添加</p>
				</div>
			</dir>
		</div>
		<div id="add_window" class="new_float_window">
			<div class="set_center" style="height: 200px; width: 400px;">
				<h2> 添加产品 </h2>
				<form action="/BMMS/AddProductInfo" method="post" id="form_post">
					<div style="height: 40px; text-align: left;">
						<span style="margin-left: 32px;"> 编号： </span> <input class="textbox-common" name="input_add_spec" id="input_add_spec"></input>
					</div>
					<div style="height: 40px; text-align: left;">
						<span> 产品名称： </span> <input class="textbox-common" name="input_add_name" id="input_add_name"></input>
					</div>
					<!-- <input type="submit" value="确定"/> -->
					<div id="cancle_button" class="red_button" style="margin-right: 54px;" onmouseenter="button_mouseenter('cancle_button')" onmouseleave="button_mouseleave('cancle_button')" onmousedown="button_mousedown('cancle_button')" onmouseup="button_mouseup('cancle_button')" onclick="cancle_click()">
						<p style="top: 50%; transform: translateY(-50%);">
							取消
						</p>
					</div>
					<div id="confirm_button" class="blue_button" style="margin-right: 10px;" onmouseenter="button_mouseenter('confirm_button')" onmouseleave="button_mouseleave('confirm_button')" onmousedown="button_mousedown('confirm_button')" onmouseup="button_mouseup('confirm_button')" onclick="confirm_click()">
						<p style="top: 50%; transform: translateY(-50%);">
							确定
						</p>
					</div>
				</form>
			</div>
		</div>
		<div class="login-process-cover" style="text-align: center; background-color: rgba(0,0,0,0.5);" id="process_message">
			<div class="login-process-inner" id="pi_parent">
				<div id="pi0" class="process-item"></div>
				<div id="pi1" class="process-item"></div>
				<div id="pi2" class="process-item"></div>
				<div id="pi3" class="process-item"></div>
				<div id="pi4" class="process-item"></div>
			</div>
			<p id="process_tip" style="top: 460px; width: 100%; position: absolute;"> 处理中 </p>
		</div>
	</body>
</html>