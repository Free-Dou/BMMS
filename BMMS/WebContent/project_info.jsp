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
			@import url(CSS/common-style.css);
		</style>
		<style type="text/css">
			@import url(CSS/table_common.css);
		</style>
		<style type="text/css">
			@import url(CSS/right_common_style.css);
		</style>
		<script type="text/javascript" src="JS/httprequestclass.js"> </script>
		<script type="text/javascript" src="JS/project_info.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
		<script type="text/javascript" src="JS/del_common.js"> </script>
	</head>
	<body>
		<div id="project_info_pad" class="right-page-contains">
			<div class="right-page-title"> 工程量管理 </div>
			<div class="table-line">
				<div class="table-title-cell" style="width: 2%;"></div>
				<div class="table-title-cell" style="width: 25%;"> 工程名 </div>
				<div class="table-title-cell" style="width: 25%;"> 总额 </div>
				<div class="table-title-cell" style="width: 25%;"> 已支付 </div>
				<div class="table-title-cell" style="width: 5%;"> 查看修改 </div>
				<div class="table-title-cell" style="width: 5%;"> 添加付款 </div>
				<div class="table-title-cell" style="width: 5%;"> 扫描件 </div>
			</div>
			<div id="table_inner">
				<%
					String username = (String)session.getAttribute("username");
					if (null == username){
						out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
					}
					
					ArrayList<ProjectQunatity> projectQunatityList = ProjectQunatity.getAllCustomerInfo();
					
					if (null != projectQunatityList){
						for (int i = 0; i < projectQunatityList.size(); i++){
							ProjectQunatity projectQunatityObject = projectQunatityList.get(i);
						
							out.print("<div id=\"" + projectQunatityObject.getProjectID() + "\" class=\"table-line\">");
							out.print("<div onclick=\"del_click('" + projectQunatityObject.getProjectID() + "')\" class=\"table-cell-" + ((i % 2) + 1) + " cell-head\" style=\"width: 2%;\"> - </div>");
							out.print("<div id=\"pjtName" + projectQunatityObject.getProjectID() + "\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 25%;\">" + projectQunatityObject.getProjectName() + "</div>");
							out.print("<div id=\"pjtBudget" + projectQunatityObject.getProjectID() + "\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 25%;\">" + String.format("%.2f", projectQunatityObject.getBudget()) + "￥</div>");
							out.print("<div id=\"pjtPaid" + projectQunatityObject.getProjectID() + "\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 25%;\">" + String.format("%.2f", projectQunatityObject.getPaid()) + "￥</div>");
							out.print("<div onclick=\"reedit_click('" + projectQunatityObject.getProjectID() + "')\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 5%; cursor: pointer;\"> <img src=\"IMG/edit.png\" class=\"footer-button-img\"> </div>");
							out.print("<div onclick=\"reedit_click('" + projectQunatityObject.getProjectID() + "')\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 5%; cursor: pointer;\"> $ </div>");
							out.print("<div onclick=\"reedit_click('" + projectQunatityObject.getProjectID() + "')\" class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 5%; cursor: pointer;\"> 📄 </div>");
							out.print("</div>");
						}
					}
				%>
			</div>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="item_footer_button_1" onmouseenter="button_mouseenter_footer('item_footer_button_1')" onmouseleave="button_mouseleave_footer('item_footer_button_1')" onmousedown="button_mousedown_footer('item_footer_button_1')" onmouseup="button_mouseup_footer('item_footer_button_1')" onclick="project_add_click('project_info_pad')">
					<img src="IMG/add.png" class="footer-button-img">
					<p>添加</p>
				</div>
			</dir>
		</div>
		<div id="add_window" class="new_float_window">
			<div class="set_center" style="height: 400px; width: 725px;">
				<h2 id="float_window_title"> 添加工程 </h2>
				<form action="/BMMS/AddProductInfo" method="post" id="form_post">
					<div style="height: 42px;">
						<div style="height: 40px; text-align: left; float: left; margin-left: 16px;">
							<span> 工程名： </span> <input class="textbox-common" id="projectName"></input>
						</div>
						<div style="height: 40px; text-align: left; float: left; margin-left: 42px;">
							<span> 甲方： </span> <input class="textbox-common" id="partyA"></input>
						</div>
					</div>
					<div style="height: 42px;">
						<div style="height: 40px; text-align: left; float: left;">
							<span> 施工日期： </span> <input id="constructDate" type="date" value="2016-04-10" style="width: 250px"></input>
						</div>
						<div style="height: 40px; text-align: left; float: left; margin-left: 10px;">
							<span> 合同编号： </span> <input class="textbox-common" id="contractNumber"></input>
						</div>
					</div>
					<div style="height: 42px;">
						<div style="height: 40px; text-align: left; float: left;">
							<span> 施工地点： </span> <input class="textbox-common" id="constructLoca"></input>
						</div>
						<div style="height: 40px; text-align: left; float: left; margin-left: 10px;">
							<span> 施工内容： </span>
							<select id="contractContent" style="width: 254px;">
								<option value="1"> 水稳辅筑 </option>
								<option value="2"> 黑料辅筑 </option>
								<option value="3"> 沥青辅筑 </option>
							</select>
						</div>
					</div>
					<div style="height: 100px; padding-left: 32px;">
						<div style="height: 40px; text-align: left; float: left;">
							<span style="vertical-align: top; margin-top: 4px;"> 水稳： </span> 
							<textarea id="water" cols="33" rows="5" style="resize: none; margin-top: 2px;"></textarea>
						</div>
						<div style="float: left; padding: 0px; margin-left: 42px;">
							<div style="height: 40px; text-align: left;">
								<span> 自产： </span> <input style="width: 225px;" id="waterSelfProduct"></input><span> 吨 </span>
							</div>
							<div style="height: 40px; text-align: left;">
								<span> 外购： </span> <input style="width: 225px;" id="waterBuy"></input><span> 吨 </span>
							</div>
						</div>
					</div>
					<div style="height: 125px; padding-left: 32px;">
						<div style="height: 40px; text-align: left; float: left;">
							<span style="vertical-align: top; margin-top: 4px;"> 黑料： </span>
							<textarea id="blackMaterial" cols="33" rows="5" style="resize: none; margin-top: 2px;"></textarea>
						</div>
						<div style="float: left; padding: 0px; margin-left: 42px;">
							<div style="height: 40px; text-align: left;">
								<span> 自产： </span> <input style="width: 225px;" id="blackMaterialSelfProduct"></input><span> 吨 </span>
							</div>
							<div style="height: 40px; text-align: left;">
								<span> 外购： </span> <input style="width: 225px;" id="blackMaterialBuy"></input><span> 吨 </span>
							</div>
							<div style="height: 40px; text-align: left;">
								<span> 卖料： </span> <input style="width: 225px;" id="blackMaterialSell"></input><span> 吨 </span>
							</div>
						</div>
					</div>
					<div style="height: 42px;">
						<div style="height: 40px; text-align: left; float: left;">
							<span> 水稳单价： </span> <input style="width: 225px;" id="waterPrice"></input><span> ￥ </span>
						</div>
						<div style="height: 40px; text-align: left; float: left; margin-left: 14px;">
							<span> 黑料单价： </span> <input style="width: 225px;" id="blackMaterialPrice"></input><span> ￥ </span>
						</div>
					</div>
					<div style="height: 42px;">
						<div style="height: 40px; text-align: left; float: left; margin-left: 32px;">
							<span> 总额： </span> <input style="width: 225px;" id="budget"></input> <span> ￥ </span>
						</div>
						<div style="height: 40px; text-align: left; float: left; margin-left: 30px;">
							<span> 已付款： </span> <input style="width: 225px;" id="paid"></input> <span> ￥ </span>
						</div>
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