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
		<script type="text/javascript" src="JS/httprequestclass.js"> </script>
		<script type="text/javascript" src="JS/buy_analyze.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
		<script type="text/javascript" src="JS/float_window_common.js"> </script>
		<script type="text/javascript" src="JS/analyze_common.js"> </script>
		<script type="text/javascript" src="JS/del_common.js"> </script>
	</head>
	<body onload="body_onload()">
		<%
			String username = (String)session.getAttribute("username");
			if (null == username){
				out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
			}
		%>
		
		<div id="sale_analyze_pad" class="right-page-contains">
			<div class="right-page-title"> 采购分析 </div>
			<div style="height: 110px;">
				<div style="float: left;">
					<div style="height: 36px; padding-left: 35px;">
						<div style="float:left; height: 24px;"> 开始日期： </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> <input id="start_date" type="date" value="2016-04-10" style="width: 250px"></input> </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> 结束日期： </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> <input id="end_date" type="date" value="2016-04-10" style="width: 250px"></input> </div>
					</div>
					<!--
					<div style="height: 36px; padding-left: 35px;">
						<div style="float:left; height: 24px;">
							<input type="checkbox"> 显示货位： </input>
						</div>
						<div style="float:left; padding-left: 15px; height: 24px;">
							<select style="width: 254px">
								<option value="1">选择货位</option>
								<option value="2">总库</option>
								<option value="3">仓库 1</option>
								<option value="4">仓库 2</option>
							</select>
						</div>
					</div>
					-->
		 			<div style="height: 36px; padding-left: 35px;">
						<div style="float:left; padding-left: 16px; height: 24px;">	供应商： </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> <input id="input_customer" class="textbox-common"></input> </div>
						<div style="float:left; padding-left: 48px; height: 24px;"> 商品： </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> <input id="input_item" class="textbox-common"></input> </div>
					</div>
					<div style="height: 36px; padding-left: 35px;">
						<div style="float:left; padding-left: 32px; height: 24px;">	备注： </div>
						<div style="float:left; padding-left: 15px; height: 24px;"> <input id="input_remark" class="textbox-common"></input> </div>
						<!-- <div style="float:left; padding-left: 16px; height: 24px;"> 审核状态： </div>
						<div style="float:left; padding-left: 15px; height: 24px;">
							<select id="select_status" style="width: 254px">
								<option value="1">已审核</option>
								<option value="2">未审核</option>
							</select>
						</div> -->
					</div>
				</div>
				<div style="height: 90px; padding-left: 35px; float: left;">
					<div id="search_button" style="width: 100px; height: 90px; float: left;" class="blue_button" onmouseenter="button_mouseenter('search_button')" onmouseleave="button_mouseleave('search_button')" onmousedown="button_mousedown('search_button')" onmouseup="button_mouseup('search_button')" onclick="get_result()">
						<p style="margin-top: 44px; transform: translateY(-50%);"> 开始查询 </p>
					</div>
				</div>
			</div>
			<div id="result_board" style="visibility: hidden; height: 100%;">
				<div class="table-line-little">
					<div class="table-title-cell-little cell-head" style="width: 2%"></div>
					<div class="table-title-cell-little" style="width: 10%;"> 单号 </div>
					<div class="table-title-cell-little" style="width: 10%;"> 编号 </div>
					<div class="table-title-cell-little" style="width: 10%;"> 商品 </div>
					<div class="table-title-cell-little" style="width: 6%;"> 数量 </div>
					<div class="table-title-cell-little" style="width: 6%;"> 单价 </div>
					<div class="table-title-cell-little" style="width: 6%;"> 金额 </div>
					<div class="table-title-cell-little" style="width: 15%;"> 备注 </div>
					<div class="table-title-cell-little" style="width: 6%;"> 时间 </div>
					<div class="table-title-cell-little" style="width: 20%;"> 客户 </div>
					<div class="table-title-cell-little" style="width: 6%;"> 车号 </div>
				</div>
				<!-- <iframe id="result_loader" style="height: 100%; width: 100%; border-width: 0px; position: relative;" src="search_result.html"></iframe> -->
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