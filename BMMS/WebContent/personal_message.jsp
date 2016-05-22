<%@page import="java.util.ArrayList"%>
<%@page import="dou.metaObject.PersionMessage"%>
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
			@import url(CSS/message_common.css);
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
		<div class="right-page-contains" id="sys_message_pad">
			<div class="right-page-title"> 个人消息 </div>
			<%
				Integer userGrade = (Integer)session.getAttribute("usergrade");
				if (null == userGrade){
					out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
					return;
				}
				
				ArrayList<PersionMessage> persionMessageList = PersionMessage.getAllpersionMessageListInfo();
				if (null == persionMessageList){
					return;
				}
				Integer orderNum = 0;										/* 订单个数，只用于控制订单的样式 */
				
				for (int i = 0; i < persionMessageList.size(); i++){
					PersionMessage persionMessageObject = persionMessageList.get(i);
					String operationType = (persionMessageObject.getOperation() == 1) ? "销售单" : "入库单";
					String relationType = (persionMessageObject.getOperation() == 1) ? "客户" : "供应商";
					Float allProductTotalPrice = 0.0f;							/* 用于记录当前订单商品的总价 */
					String orderid = persionMessageObject.getOrderid();			/* 用于记录当前订单的订单号 */
					Integer columnNo = 0;										/* 用于记录当前订单列(材料种类)的数量 */
					Float productTotalNum = 0.0f;			
					
					out.print("<div class=\"message-box-" + (((orderNum++) % 2) + 1) + "\">");
					out.print("<div class=\"message-title\"> " + operationType + " ：" + persionMessageObject.getOrderid() + " </div>");
					out.print("<div class=\"message-contains\">");
					out.print("<div> &emsp;&emsp;" + relationType + ": " + persionMessageObject.getRelationName() + 
							  "&emsp;&emsp;仓库: " + persionMessageObject.getStockLoca() + "&emsp;&emsp;车号: " 
							  + persionMessageObject.getCarNum() + "&emsp;&emsp; </div>");
					out.print("<div>");
					%>
					<div class="table-line" style="margin-left: 0px;">
							<div class="table-title-cell" style="width: 8%;">  </div>
							<div class="table-title-cell" style="width: 20%;"> 编号 </div>
							<div class="table-title-cell" style="width: 20%;"> 商品 </div>
							<div class="table-title-cell" style="width: 8%;"> 数量 </div>
							<div class="table-title-cell" style="width: 8%;"> 单价 </div>
							<div class="table-title-cell" style="width: 8%;"> 金额 </div>
							<div class="table-title-cell" style="width: 25%;"> 备注 </div>
					</div>
					<%
					/* 
						开始显示订单材料表信息，即依次显示订单每一项:
							1. 先显示当前查询的这条数据
							2. 判断下一条数据的单号，如果一样就继续显示
							3. 如果下一条数据非当前订单的，则显示完当前订单的尾信息
							4. 显示完一个订单后，初始化订单索引信息，开始显示下一条订单
					*/
					out.print("<div id=\"table_inner\">");
					for (int j = i; j < persionMessageList.size(); j++){
						persionMessageObject = persionMessageList.get(j);
						
						if (persionMessageObject.getOrderid().equals(orderid)){
							/* 当前处理的数据，是这个订单的，显示一列数据 */
							out.print("<div class=\"table-line\" style=\"margin-left: 0px;\">");
							out.print("<div id=\"final_cell_0\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 8%;\"> </div>");
							out.print("<div id=\"final_cell_1\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 20%;\">" + persionMessageObject.getMpspec() + "</div>");
							out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 20%;\">" + persionMessageObject.getMname() + "</div>");
							out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">" + String.format("%.3f", persionMessageObject.getNumber()) + "</div>");
							out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">" + String.format("%.2f", persionMessageObject.getPrice()) + "¥</div>");
							out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">" + String.format("%.2f", persionMessageObject.getTotalPrice()) + "¥</div>");
							out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
									  + ((columnNo % 2) + 1) + "\" style=\"width: 25%;\">" + persionMessageObject.getRemark() + "</div>");
							out.print("</div>");
								
							allProductTotalPrice += persionMessageObject.getTotalPrice();
							productTotalNum += persionMessageObject.getNumber();
							columnNo++;
							i = j;
						}else{
							/* 当前处理的数据，是下一个订单的 */
							/* 更新索引，回退一条数据 */
							i = j - 1;
							
							break;
						}
					}
					/* 当前订单的商品信息显示完，显示合计信息 */
					out.print("<div class=\"table-line\" style=\"margin-left: 0px;\">");
					out.print("<div id=\"final_cell_0\" class=\"table-cell-" 
								 + ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">合计</div>");
					out.print("<div id=\"final_cell_1\" class=\"table-cell-" 
								+ ((columnNo % 2) + 1) + "\" style=\"width: 20%;\">/</div>");
					out.print("<div id=\"final_cell_2\" class=\"table-cell-" 
								+ ((columnNo % 2) + 1) + "\" style=\"width: 20%;\">/</div>");
					out.print("<div id=\"final_cell_3\" class=\"table-cell-" 
								+ ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">" + String.format("%.3f", productTotalNum) + "</div>");
					out.print("<div id=\"final_cell_4\" class=\"table-cell-" 
								+ ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">/</div>");
					out.print("<div id=\"final_cell_5\" class=\"table-cell-" 
								+ ((columnNo % 2) + 1) + "\" style=\"width: 8%;\">" + String.format("%.2f", allProductTotalPrice) + "¥</div>");
					out.print("<div id=\"final_cell_6\" class=\"table-cell-" 
								 + ((columnNo % 2) + 1) + "\" style=\"width: 25%;\">／</div>");
					out.print("</div>");
					out.print("</div>");
					
					/* 表信息显示完闭， 显示备注、处理选项等 */
					persionMessageObject = persionMessageList.get(i);
					out.print("<div> &emsp;&emsp;备注：" + persionMessageObject.getOrderRemark() + " </div>");
					out.print("</div>");
					out.print("</div>");
					out.print("<div class=\"message-time\"> User:" + persionMessageObject.getUsername() + " Time:" + persionMessageObject.getCreateTime() + " </div>");
	
					if (1 == userGrade){
						/* 用户，不可以审批 */
						String messageStatus = (persionMessageObject.getApproval().equals("1")) ? "已审核" : "待审核";
						out.print("<div style=\"height: 32px;\">");
						out.print("<div style=\"text-align: right; margin-right: 34px;\"> " + messageStatus + "</div>");
					} else if (2 == userGrade){
						/* 管理员，有审核权限 */
						if (persionMessageObject.getApproval().equals("0")){		/* 未审核订单 */
							out.print("<div style=\"height: 32px;\">");
						
							out.print("<div id=\"cancle_button\" class=\"red_button\" style=\"margin-right: 34px;\"onmouseenter=\""
									  + "button_mouseenter('cancle_button')\" onmouseleave=\"button_mouseleave('cancle_button')\" "
									  + "onmousedown=\"button_mousedown('cancle_button')\" onmouseup=\"button_mouseup('cancle_button')\" "
									  + "onclick=\"cancle_click('" + persionMessageObject.getOrderid() + "')\">");
							out.print("<p style=\"top: 50%; transform: translateY(-50%);\">打回</p>");
							out.print("</div>");
							out.print("<div id=\"confirm_button\" class=\"blue_button\" style=\"margin-right: 10px;\" onmouseenter=\""
									 + "button_mouseenter('confirm_button')\" onmouseleave=\"button_mouseleave('confirm_button')\" "
									 + "onmousedown=\"button_mousedown('confirm_button')\" onmouseup=\"button_mouseup('confirm_button')\""
									 + " onclick=\"confirm_click('" + persionMessageObject.getOrderid() + "')\">");
							out.print("<p style=\"top: 50%; transform: translateY(-50%);\">通过</p>");
							out.print("</div>");
						}else{			/* 已审核订单 */
							out.print("<div style=\"height: 32px;\">");
							out.print("<div style=\"text-align: right; margin-right: 34px;\"> 已审核通过 </div>");
						}
					}
					out.print("</div>");
					out.print("</div>");
				}
			%>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="message_footer_button_2" onmouseenter="button_mouseenter_footer('message_footer_button_2')" onmouseleave="button_mouseleave_footer('message_footer_button_2')" onmousedown="button_mousedown_footer('message_footer_button_2')" onmouseup="button_mouseup_footer('message_footer_button_2')">
					<img src="IMG/refresh.png" class="footer-button-img">
					<p>刷新</p>
				</div>
			</dir>
		</div>
	</body>
</html>