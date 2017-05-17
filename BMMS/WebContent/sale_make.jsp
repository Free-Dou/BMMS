<%@page import="dou.metaObject.Customer"%>
<%@page import="java.util.ArrayList"%>
<%@page import="dou.metaObject.Product"%>
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
		<style type="text/css">
			@import url(CSS/message_common.css);
		</style>
		<style type="text/css">
			@import url(CSS/select_common.css);
		</style>
		<script type="text/javascript" src="JS/httprequestclass.js"> </script>
		<script type="text/javascript" src="JS/sale_make.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
		<script type="text/javascript" src="JS/trade_make_common.js"> </script>
		<script type="text/javascript" src="JS/del_common.js"> </script>
	</head>
	<body onload="body_onload()">
		<div id="buy_make_pad" class="right-page-contains">
			<div style="padding-right: 40px; height: 67px; overflow: hidden;">
				<div class="right-page-title" style="float: left;"> 销售开单 </div>
			</div>
			<div id="sale_make_pad_inner">
				<div style="height: 80px;">
					<input class="message-title" style="background-color: rgba(0,0,0,0); border: 0px; outline: none; color: #AAAAAA; font-family: '微软雅黑'" value="请输入单号" id="trade_num" onfocus="hover_input_focus('trade_num')" onblur="hover_input_blur('trade_num')" HaveContains="0"></input>
				</div>
				<div style="height: 80px;">
					<div style="float: left; padding: 0px;">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float:left; height: 24px;"> 客户 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;">
								<input id="trade_person" class="select-input" onkeyup="show_person_search(event, 'trade_person', 'my_select_person')"></input>
								<!-- <select style="width: 254px;" id="trade_person"> -->
								<%
									String username = (String)session.getAttribute("username");
									if (null == username){
										out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
									}
									ArrayList<Customer> customerList = Customer.getAllCustomerInfo();
								%>
								<!-- </select> -->
							</div>
							<select style="visibility: hidden; position: absolute;" id="saved_person">
							<%
								if (null != customerList){
									for (int i = 0; i < customerList.size(); i++){
										String customerName = customerList.get(i).getcName();
										out.print("<option name=\"" + customerName + "\" value=\"" + customerName + "\">" + customerName + "</option>");
									}
								}
							%>
							</select>
							<div style="float:left; padding-left: 15px; height: 24px;"> 备注 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;"> <input id="trade_remark" class="textbox-common" onclick="hide_myselect()"></input> </div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float:left; height: 24px;"> 仓库 </div>
							<div style="float:left; padding-left: 15px; height: 24px;">
								<select id="trade_store" style="width: 254px;">
									<option value="1"> 总库 </option>
								</select>
							</div>
							<div style="float:left; padding-left: 12px; height: 24px;"> 车号 </div>
							<div style="float:left; padding-left: 15px; height: 24px; width: 250px;"> <input id="trade_car" class="textbox-common" onclick="hide_myselect()"></input> </div>
							<div style="float:left; padding-left: 12px; height: 24px;"> 日期 </div>
							<div class="title-button" style="float: left; padding-left: 15px; height: 24px;"> <input id="trade_time" type="date" value="2016-04-10" style="width: 150px" onclick="hide_myselect()"></input> </div>
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
						<div id="final_cell_5" class="table-cell-1" style="width: 8%;"> 0￥ </div>
						<div id="final_cell_6" class="table-cell-1" style="width: 25%;"> / </div>
					</div>
				</div>
				<dir class="page-footer main-page-footer">
					<div class="footer-button" id="sale_footer_button_1" onmouseenter="button_mouseenter_footer('sale_footer_button_1')" onmouseleave="button_mouseleave_footer('sale_footer_button_1')" onmousedown="button_mousedown_footer('sale_footer_button_1')" onmouseup="button_mouseup_footer('sale_footer_button_1')" onclick="add_click_addon('buy_make_pad', 'add_window')">
						<img src="IMG/add.png" class="footer-button-img">
						<p>添加</p>
					</div>
				</dir>
			</div>
		</div>
		<div id="my_select_person" class="select-back">
		<%
			if (null != customerList){
				for (int i = 0; i < customerList.size(); i++){
					String customerName = customerList.get(i).getcName();
					out.print("<div id=\"" + customerName + "\" class=\"select-item\" onmouseenter=\"select_item_enter('" + customerName + "')\" onmouseleave=\"select_item_leave('" + customerName + "')\" onmousedown=\"select_item_down('" + customerName + "')\" onmouseup=\"select_item_up('" + customerName + "')\" onclick=\"select_item_click('" + customerName + "', 'trade_person', 'my_select_person')\">" + customerName + "</div>");
				}
			}
		%>
		</div>
		<div id="add_window" class="new_float_window">
			<div>
				<div style="padding-right: 40px; height: 67px; overflow: hidden;">
					<div class="right-page-title" style="float: left;"> 添加 </div>
				</div>
				<%
					ArrayList<Product> productList = Product.getAllProductInfo();
				%>
				<div style="height: 80px;">
					<div style="float: left; padding: 0px;">
						<div style="height: 30px; text-align: left;">
							<span style="margin-left: 50px;"> 数量 </span> <span> <input style="width: 50px; margin-left: 15px;" id="input_add_num" value="0"></input> </span>
							<span style="margin-left: 10px;"> 单价 </span> <span> <input style="width: 50px; margin-left: 15px;" id="input_add_price" value="0"></input> </span> <span> ￥ </span>
							<span style="margin-left: 10px;"> 备注 </span> <span> <input style="width: 297px; margin-left: 15px;" id="input_add_others"></input> </span>
						</div>
						<div style="height: 30px; text-align: left;">
							<span style="margin-left: 50px;"> 搜索 </span> <span> <input id="search_box" onkeyup="searchProduct(event)" style="width: 297px; margin-left: 15px;"></input> </span>
						</div>
					</div>
					<div id="cancle_button" class="red_button" style="margin-right: 46px;" onmouseenter="button_mouseenter('cancle_button')" onmouseleave="button_mouseleave('cancle_button')" onmousedown="button_mousedown('cancle_button')" onmouseup="button_mouseup('cancle_button')" onclick="cancle_click('buy_make_pad', 'add_window')">
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
				<div class="table-line">
					<div class="table-title-cell cell-head"></div>
					<div class="table-title-cell"> 编号 </div>
					<div class="table-title-cell"> 产品名称 </div>
				</div>
				<div id="table_inner_selectList">
				<%
					int i = 0;
					if (null != productList){
						for (i = 0; i < productList.size(); i++){
							Product productObject = productList.get(i);

							out.print("<div class=\"table-line\">");
							out.print("<div id=\"" + productObject.getpName() + "_head\" onclick=\"lineclick(\'" + productObject.getpName() + "\')\" class=\"table-cell-" + ((i % 2) + 1) + " cell-head\"> </div>");
							out.print("<div id=\"" + productObject.getpName() + "_pSpec\" class=\"table-cell-" + ((i % 2) + 1) + "\">" + productObject.getpSpec() + "</div>");
							out.print("<div id=\"" + productObject.getpName() + "_pName\" class=\"table-cell-" + ((i % 2) + 1) + "\">" + productObject.getpName() + "</div>");
							out.print("</div>");
						}
					}
					out.print("<input id=\"productCount\" value=\"" + i + "\" style=\"visibility: hidden;\"></input>");
				%>
				</div>
				<select style="visibility: hidden;" id="saved_item_name">
				<%
					if (null != productList){
						for (i = 0; i < productList.size(); i++){
							String pName = productList.get(i).getpName();
							out.print("<option name=\"" + pName + "\" value=\"" + pName + "\">" + pName + "</option>");
						}
					}
				%>
				</select>
				<select style="visibility: hidden;" id="saved_item_spec">
				<%
					if (null != productList){
						for (i = 0; i < productList.size(); i++){
							String pSpec = productList.get(i).getpSpec();
							out.print("<option name=\"" + pSpec + "\" value=\"" + pSpec + "\">" + pSpec + "</option>");
						}
					}
				%>
				</select>
			</div>
		</div>
		<div id="confirm_window" class="new_float_window">
			<div id="confirm_window_inner" class="set_center" style="height: 200px; width: 1000px;">
				<h2> 确认信息 </h2>
				<h4 id="copy_tradeNum"> </h4>
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
		<div id="tip_window" class="new_float_window">
			<div id="tip_window_inner" class="set_center" style="height: 200px; width: 400px;">
				<h2> 提示 </h2>
				<h4 id="tip_contain">  </h4>
				<div style="margin-top: 10px;">
					<div id="tip_confirm_button" class="blue_button" style="margin-right: 10px;" onmouseenter="button_mouseenter('tip_confirm_button')" onmouseleave="button_mouseleave('tip_confirm_button')" onmousedown="button_mousedown('tip_confirm_button')" onmouseup="button_mouseup('tip_confirm_button')" onclick="tip_button_click()">
						<p style="top: 50%; transform: translateY(-50%);">
							确定
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
