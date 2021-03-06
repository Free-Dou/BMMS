<%@page import="dou.metaObject.Supplier"%>
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
		<script type="text/javascript" src="JS/buy_make.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
		<script type="text/javascript" src="JS/trade_make_common.js"> </script>
	</head>
	<body onload="body_onload()">
		<div id="buy_make_pad" class="right-page-contains">
			<div style="padding-right: 40px; height: 67px; overflow: hidden;">
				<div class="right-page-title" style="float: left;"> 入库开单 </div>
			</div>
			<div id="buy_make_pad_inner">
				<div style="height: 80px;">
					<div style="float: left; padding: 0px;">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float:left; height: 24px;"> 供应商 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;">
								<select style="width: 254px;" id="trade_person">
									<%
										ArrayList<Supplier> supplierList = Supplier.getAllSupplierInfo();
										if (null != supplierList){
											for (int i = 0; i < supplierList.size(); i++){
												String supplierName = supplierList.get(i).getsName();
												out.print("<option name=\"" + supplierName + "\" value=\"" + supplierName + "\">" + supplierName + "</option>");
											}
										}
									%>
								</select>
								<!-- <input id="trade_person" class="textbox-common"></input> -->
							</div>
							<div style="float:left; padding-left: 15px; height: 24px;"> 备注 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;"> <input id="trade_remark" class="textbox-common"></input> </div>
						</div>
						<div style="height: 36px; padding-left: 50px;">
							<div style="float:left; height: 24px;"> 仓库 </div>
							<div style="float:left; padding-left: 15px; height: 24px;">
								<select id="trade_store" style="width: 254px;">
									<option value="1"> 总库 </option>
								</select>
							</div>
							<div style="float:left; padding-left: 12px; height: 24px;"> 车号 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;"> <input id="trade_car" class="textbox-common"></input> </div>
						</div>
					</div>
					<div class="title-button" id="make_buy" onmouseenter="button_mouseenter_footer('make_buy')" onmouseleave="button_mouseleave_footer('make_buy')" onmousedown="button_mousedown_footer('make_buy')" onmouseup="button_mouseup_footer('make_buy')" onclick="add_click_trade('buy_make_pad')">
						<div style="float: right; padding-top: 10px;"> <img src="IMG/send.png" class="footer-button-img"> </div>
						<div style="float: right; padding-top: 14px; padding-right: 5px;"> 开单 </div>
					</div>
				</div>
				<div id="full_table">
					<div class="table-line">
						<div class="table-title-cell" style="width: 8%;">  </div>
						<div class="table-title-cell" style="width: 20%;"> 编号 </div>
						<div class="table-title-cell" style="width: 20%;"> 商品 </div>
						<div class="table-title-cell" style="width: 8%;"> 数量 </div>
						<div class="table-title-cell" style="width: 8%;"> 单价 </div>
						<div class="table-title-cell" style="width: 8%;"> 金额 </div>
						<div class="table-title-cell" style="width: 25%;"> 备注 </div>
					</div>
					<div id="table_inner">
					</div>
					<div class="table-line">
						<div id="final_cell_0" class="table-cell-1" style="width: 8%;"> 合计 </div>
						<div id="final_cell_1" class="table-cell-1" style="width: 20%;"> / </div>
						<div id="final_cell_2" class="table-cell-1" style="width: 20%;"> / </div>
						<div id="final_cell_3" class="table-cell-1" style="width: 8%;"> 0.000 </div>
						<div id="final_cell_4" class="table-cell-1" style="width: 8%;"> / </div>
						<div id="final_cell_5" class="table-cell-1" style="width: 8%;"> 0.00￥ </div>
						<div id="final_cell_6" class="table-cell-1" style="width: 25%;"> / </div>
					</div>
				</div>
				<dir class="page-footer main-page-footer">
					<div class="footer-button" id="buy_footer_button_1" onmouseenter="button_mouseenter_footer('buy_footer_button_1')" onmouseleave="button_mouseleave_footer('buy_footer_button_1')" onmousedown="button_mousedown_footer('buy_footer_button_1')" onmouseup="button_mouseup_footer('buy_footer_button_1')" onclick="add_click('buy_make_pad')">
						<img src="IMG/add.png" class="footer-button-img">
						<p>添加</p>
					</div>
				</dir>
			</div>
		</div>
		<div id="add_window" class="new_float_window">
			<div class="set_center" style="height: 200px; width: 400px;">
				<h2> 添加 </h2>
				<%
					ArrayList<Product> productList = Product.getAllProductInfo();
				%>
				<div style="height: 30px; text-align: left;">
					<span> 编号： </span>
					<select style="width: 300px;" onchange="item_index_changed()" id="select_add_index">
						<%
							if (null != productList){
								for (int i = 0; i < productList.size(); i++){
									String pSpec = productList.get(i).getpSpec();
									out.print("<option name=\"" + pSpec + "\" value=\"" + pSpec + "\">" + pSpec + "</option>");
								}
							}
						%>
					</select>
				</div>
				<div style="height: 30px; text-align: left;">
					<span> 商品： </span>
					<select style="width: 300px;" onchange="item_type_changed()" id="select_add_name">
						<%
							if (null != productList){
								for (int i = 0; i < productList.size(); i++){
									String pName = productList.get(i).getpName();
									out.print("<option name=\"" + pName + "\" value=\"" + pName + "\">" + pName + "</option>");
								}
							}
						%>
					</select>
					<div id="exist_tip" style="visibility: hidden; float: right; font-size: 12px; margin-top: 4px; color: #FFFF80;"> 已存在 </div>
				</div>
				<div style="height: 30px; text-align: left;">
					<span> 数量： </span> <span> <input style="width: 50px;" id="input_add_num" value="0"></input> </span>
					<span style="margin-left: 10px;"> 单价： </span> <span> <input style="width: 50px;" id="input_add_price" value="0"></input> </span> <span> ￥ </span>
				</div>
				<div style="height: 30px; text-align: left;">
					<span> 备注： </span> <span> <input style="width: 297px;" id="input_add_others"></input> </span>
				</div>
				<div id="cancle_button" class="red_button" style="margin-right: 46px;" onmouseenter="button_mouseenter('cancle_button')" onmouseleave="button_mouseleave('cancle_button')" onmousedown="button_mousedown('cancle_button')" onmouseup="button_mouseup('cancle_button')" onclick="cancle_click()">
					<p style="top: 50%; transform: translateY(-50%);">
						取消
					</p>
				</div>
				<div id="confirm_button" class="blue_button" style="margin-right: 10px;" onmouseenter="button_mouseenter('confirm_button')" onmouseleave="button_mouseleave('confirm_button')" onmousedown="button_mousedown('confirm_button')" onmouseup="button_mouseup('confirm_button')" onclick="confirm_click()">
					<p style="top: 50%; transform: translateY(-50%);">
						确定
					</p>
				</div>
			</div>
		</div>
		<div id="confirm_window" class="new_float_window">
			<div id="confirm_window_inner" class="set_center" style="height: 200px; width: 1000px;">
				<h2> 确认信息 </h2>
				<div id="copy_table">
				
				</div>
				<div style="margin-top: 10px;">
					<div id="trade_cancle_button" class="red_button" style="margin-right: 15px;" onmouseenter="button_mouseenter('trade_cancle_button')" onmouseleave="button_mouseleave('trade_cancle_button')" onmousedown="button_mousedown('trade_cancle_button')" onmouseup="button_mouseup('trade_cancle_button')" onclick="trade_cancle_click()">
						<p style="top: 50%; transform: translateY(-50%);">
							取消
						</p>
					</div>
					<div id="trade_confirm_button" class="blue_button" style="margin-right: 10px;" onmouseenter="button_mouseenter('trade_confirm_button')" onmouseleave="button_mouseleave('trade_confirm_button')" onmousedown="button_mousedown('trade_confirm_button')" onmouseup="button_mouseup('trade_confirm_button')" onclick="trade_confirm_click()">
						<p style="top: 50%; transform: translateY(-50%);">
							开单
						</p>
					</div>
				</div>
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