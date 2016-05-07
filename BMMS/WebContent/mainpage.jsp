<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>主要界面</title>
	<style type="text/css">
		@import url(CSS/common-style.css);
	</style>
	<style type="text/css">
		@import url(CSS/mainpage.css);
	</style>
	<script type="text/javascript" src="JS/mainpage.js"> </script>
	<script type="text/javascript" src="JS/common-js.js"> </script>
</head>
<body onresize="set_main()" onload="body_onload()">
	<div class="main-background main-background-img" id="main_back">
		<div class="page-title" id="page_title">
			<div style="float: left; color: #FFFFFF; padding-left: 10px; font-size: 36px; font-weight: 300;">BMMS-Project™</div>
			<div style="float: right; color: #FFFFFF; padding-right: 10px; padding-top: 12px; font-size: 18px; font-weight: 100;">
				<%
					String username = (String)session.getAttribute("username");
					if (null == username){
						out.print("<script>alert('登录失效，请重新登录'); window.document.location.href = 'index.html'</script>");
					}
					else{
						out.print("Welcome, Mr." + username);
					}
				%>
			</div>
		</div>
		<div class="page-main" id="page_main">
			<div class="left-menu" id="left_menu"></div>
			<div class="right-page-base" id="right_base">
				<div class="right-page-main" id="page_right_0_0">
					<div class="right-page-contains" id="sys_message_pad">
						<div class="message-box-1">
							<div class="message-title">BMMS项目会议记录</div>
							<div class="message-contains">
								&emsp;&emsp;BMMS项目组全体成员就页面风格问题和工期问题展开讨论，期间成员竞争激烈，激情澎湃，主要就配色、界面流程、数据库设计方面展开了多重讨论。<br>
								&emsp;&emsp;其中意见分歧最大的部分是页面背景和主题问题，窦总和谢总建议将页面设置为明色基调，并且去掉背景图，其中窦总还建议页面要设计为定宽模式，而不是现在的动态调整模式。但是王总认为，目前项目的基调基本已经确定，如果突然间进行修改改动太大，并且会造成风格不统一。<br>
								&emsp;&emsp;最终各方保留意见，先按照当前页面风格和主题进行设计。
							</div>
							<div class="message-time">User:System Time:2016-04-14</div>
						</div>
						<div class="message-box-2">
							<div class="message-title">BMMS项目第一次会议记录</div>
							<div class="message-contains">
								&emsp;&emsp;项目组今日就各部分分工问题进行了简单讨论。<br>
								&emsp;&emsp;简单讨论之后，最终决定，目前分工：谢总：数据库交互部分，窦总：后台java部分，王总：前端页面业务逻辑部分。各部分成员相互协调，互相帮助。
								<br> &emsp;&emsp;会后对项目的基本配置管理信息进行了创建。
							</div>
							<div class="message-time">User:System Time:2016-04-08</div>
						</div>
						<div class="message-box-1">
							<div class="message-title">BMMS项目开工</div>
							<div class="message-contains">
								&emsp;&emsp;BMMS项目正式开工，BMMS-Project™
								设立，其中成员有：窦峥、王克强、谢腾飞（按姓氏首字母排序），成员表示保证完成组织交给的任务，以最快最优最稳定的方式完成项目需求，使项目尽善尽美，满足客户需求，解决客户难题。
							</div>
							<div class="message-time">User:System Time:2016-04-07</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="message_footer_button_1"
								onmouseenter="button_mouseenter_footer('message_footer_button_1')"
								onmouseleave="button_mouseleave_footer('message_footer_button_1')"
								onmousedown="button_mousedown_footer('message_footer_button_1')"
								onmouseup="button_mouseup_footer('message_footer_button_1')">
								<img src="IMG/refresh.png" class="footer-button-img">
								<p>刷新</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_0_1">
					<div id="usr_message_pad" class="right-page-contains">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							您暂时还没有收到任何消息</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="message_footer_button_2"
								onmouseenter="button_mouseenter_footer('message_footer_button_2')"
								onmouseleave="button_mouseleave_footer('message_footer_button_2')"
								onmousedown="button_mousedown_footer('message_footer_button_2')"
								onmouseup="button_mouseup_footer('message_footer_button_2')">
								<img src="IMG/refresh.png" class="footer-button-img">
								<p>刷新</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_1_0">
					<div id="item_info_pad" class="right-page-contains">
						<div class="table-line">
							<div class="table-title-cell cell-head"></div>
							<div class="table-title-cell">编号</div>
							<div class="table-title-cell">产品名称</div>
						</div>
						<div class="table-line">
							<div class="table-cell-1 cell-head">-</div>
							<div class="table-cell-1">SWSS</div>
							<div class="table-cell-1">水稳碎石</div>
						</div>
						<div class="table-line">
							<div class="table-cell-2 cell-head">-</div>
							<div class="table-cell-2">SWSM</div>
							<div class="table-cell-2">水稳石沫</div>
						</div>
						<div class="table-line">
							<div class="table-cell-1 cell-head">-</div>
							<div class="table-cell-1">CL-D</div>
							<div class="table-cell-1">粗料（吨）</div>
						</div>
						<div class="table-line">
							<div class="table-cell-2 cell-head">-</div>
							<div class="table-cell-2">LQ-100#</div>
							<div class="table-cell-2">100#沥青</div>
						</div>
						<div class="table-line">
							<div class="table-cell-1 cell-head">-</div>
							<div class="table-cell-1">LQ-70#</div>
							<div class="table-cell-1">70#沥青</div>
						</div>
						<div class="table-line">
							<div class="table-cell-2 cell-head">-</div>
							<div class="table-cell-2">LQ-GXLQ</div>
							<div class="table-cell-2">改良沥青</div>
						</div>
						<div class="table-line">
							<div class="table-cell-1 cell-head">-</div>
							<div class="table-cell-1">LQ-CSLQ</div>
							<div class="table-cell-1">彩色沥青</div>
						</div>
						<div class="table-line">
							<div class="table-cell-2 cell-head">-</div>
							<div class="table-cell-2">WG-HL-G（出料）</div>
							<div class="table-cell-2">外购黑料（出料-锅）</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="item_footer_button_1"
								onmouseenter="button_mouseenter_footer('item_footer_button_1')"
								onmouseleave="button_mouseleave_footer('item_footer_button_1')"
								onmousedown="button_mousedown_footer('item_footer_button_1')"
								onmouseup="button_mouseup_footer('item_footer_button_1')">
								<img src="IMG/add.png" class="footer-button-img">
								<p>添加</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_2_0">
					<div style="padding-right: 40px; height: 67px; overflow: hidden;">
						<div class="right-page-title" style="float: left;">销售开单</div>
						<div class="title-button" id="make_sale"
							onmouseenter="button_mouseenter_footer('make_sale')"
							onmouseleave="button_mouseleave_footer('make_sale')"
							onmousedown="button_mousedown_footer('make_sale')"
							onmouseup="button_mouseup_footer('make_sale')">
							<div style="float: right; padding-top: 20px;">
								<img src="IMG/send.png" class="footer-button-img">
							</div>
							<div style="float: right; padding-top: 24px; padding-right: 5px;">
								开单</div>
						</div>
					</div>
					<div id="sale_make_pad" class="right-page-contains">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">客户</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								备注</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: right; padding-right: 40px; height: 24px;">
								<input type="date" value="2016-04-10" style="width: 130px"></input>
							</div>
							<div style="float: right; padding-right: 15px; height: 24px;">
								日期</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">货位</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">总库
									<option value="2">仓库1
									<option value="3">仓库2
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								开票</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">其他
									<option value="2">普通
									<option value="3">电子
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								折扣</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 35px;" value="1.00"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input type="checkbox"> 商场 </input>
							</div>
							<div style="float: right; padding-right: 40px; height: 24px;">
								<select style="width: 135px;">
									<option value="1">admin
									<option value="2">user1
									<option value="3">user2
								</select>
							</div>
							<div style="float: right; padding-right: 15px; height: 24px;">
								业务员</div>
						</div>
						<div>
							<div class="table-line">
								<div class="table-title-cell" style="width: 8%;"></div>
								<div class="table-title-cell" style="width: 20%;">编号</div>
								<div class="table-title-cell" style="width: 20%;">商品</div>
								<div class="table-title-cell" style="width: 8%;">数量</div>
								<div class="table-title-cell" style="width: 8%;">单价</div>
								<div class="table-title-cell" style="width: 8%;">金额</div>
								<div class="table-title-cell" style="width: 25%;">备注</div>
							</div>
							<div class="table-line">
								<div class="table-cell-1" style="width: 8%;">合计</div>
								<div class="table-cell-1" style="width: 20%;">/</div>
								<div class="table-cell-1" style="width: 20%;">/</div>
								<div class="table-cell-1" style="width: 8%;">0</div>
								<div class="table-cell-1" style="width: 8%;">￥</div>
								<div class="table-cell-1" style="width: 8%;">￥</div>
								<div class="table-cell-1" style="width: 25%;">/</div>
							</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="sale_footer_button_1"
								onmouseenter="button_mouseenter_footer('sale_footer_button_1')"
								onmouseleave="button_mouseleave_footer('sale_footer_button_1')"
								onmousedown="button_mousedown_footer('sale_footer_button_1')"
								onmouseup="button_mouseup_footer('sale_footer_button_1')">
								<img src="IMG/add.png" class="footer-button-img">
								<p>添加</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_2_1">
					<div id="sale_analyze_pad">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 日期： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								开始日期：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								结束日期：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px; padding-left: 25px;">
								方法：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">
									<option value="2">方法 1
									<option value="3">方法 2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示货位： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择货位
									<option value="2">总库
									<option value="3">仓库 1
									<option value="4">仓库 2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示制单： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择制单
									<option value="2">其他
									<option value="3">普通
									<option value="4">电子
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示业务员： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								搜索：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示客户： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择业务员
									<option value="2">admin
									<option value="3">user1
									<option value="4">user2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示商品： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 500px;"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示备注： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 500px;"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 分类聚集： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">商品编号
									<option value="2">客户
									<option value="3">供应商
									<option value="4">业务员
									<option value="5">日期
									<option value="6">货位
									<option value="7">制单
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px; padding-left: 25px;">
								统计方式：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">已审核
									<option value="2">未审核
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								商场模式：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">全部
									<option value="2">商场
									<option value="2">非商场
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 按月合计 </input>
							</div>
							<div style="float: left; height: 24px; padding-left: 15px;">
								<input type="checkbox"> 按日合计 </input>
							</div>
							<div style="float: left; height: 24px; padding-left: 15px;">
								<input type="checkbox"> 按单合计 </input>
							</div>
							<div style="float: left; height: 24px; padding-left: 15px;">
								<input type="checkbox"> 考核价成本 </input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 使用分页显示 </input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div id="search_button"
								style="float: left; margin-right: 66px; background-color: #0078D7; height: 30px; width: 100px; text-align: center; cursor: pointer; color: white;"
								onmouseenter="button_mouseenter('search_button')"
								onmouseleave="button_mouseleave('search_button')"
								onmousedown="button_mousedown('search_button')"
								onmouseup="button_mouseup('search_button')">
								<p style="top: 50%; transform: translateY(-50%);">开始查询</p>
							</div>
						</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_2_2">
					<div id="custom_info_pad">
						<div class="table-line">
							<div class="table-title-cell cell-head"></div>
							<div class="table-title-cell" style="width: 35%;">名称</div>
							<div class="table-title-cell" style="width: 15%;">电话</div>
							<div class="table-title-cell" style="width: 15%;">传真</div>
							<div class="table-title-cell" style="width: 15%;">联系人 1</div>
							<div class="table-title-cell" style="width: 15%;">联系人 2</div>
						</div>
						<div class="table-line">
							<div class="table-cell-1 cell-head">-</div>
							<div class="table-cell-1" style="width: 35%;">
								<% out.print("王总豪宅"); %>
							</div>
							<div class="table-cell-1" style="width: 15%;">
								<% out.print("王总电话1"); %>
							</div>
							<div class="table-cell-1" style="width: 15%;">
								<% out.print("王总传真"); %>
							</div>
							<div class="table-cell-1" style="width: 15%;">
								<% out.print("王总秘书1"); %>
							</div>
							<div class="table-cell-1" style="width: 15%;">
								<% out.print("王总秘书2"); %>
							</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="saleinfo_footer_button_1"
								onmouseenter="button_mouseenter_footer('saleinfo_footer_button_1')"
								onmouseleave="button_mouseleave_footer('saleinfo_footer_button_1')"
								onmousedown="button_mousedown_footer('saleinfo_footer_button_1')"
								onmouseup="button_mouseup_footer('saleinfo_footer_button_1')">
								<img src="IMG/add.png" class="footer-button-img">
								<p>添加</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_3_0">
					<div style="padding-right: 40px; height: 67px; overflow: hidden;">
						<div class="right-page-title" style="float: left;">入库开单</div>
						<div class="title-button" id="make_buy"
							onmouseenter="button_mouseenter_footer('make_buy')"
							onmouseleave="button_mouseleave_footer('make_buy')"
							onmousedown="button_mousedown_footer('make_buy')"
							onmouseup="button_mouseup_footer('make_buy')">
							<div style="float: right; padding-top: 20px;">
								<img src="IMG/send.png" class="footer-button-img">
							</div>
							<div style="float: right; padding-top: 24px; padding-right: 5px;">
								开单</div>
						</div>
					</div>
					<div id="buy_make_pad">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">供应商</div>
							<div
								style="float: left; padding-left: 15px; height: 24px; width: 250px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								备注</div>
							<div
								style="float: left; padding-left: 15px; height: 24px; width: 250px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: right; padding-right: 40px; height: 24px;">
								<input type="date" value="2016-04-10" style="width: 130px"></input>
							</div>
							<div style="float: right; padding-right: 15px; height: 24px;">
								日期</div>
						</div>
						<div style="height: 36px; padding-left: 50px;">
							<div style="float: left; height: 24px;">货位</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px;">
									<option value="1">总库
									<option value="2">仓库1
									<option value="3">仓库2
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								开票</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px;">
									<option value="1">其他
									<option value="2">普通
									<option value="3">电子
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								折扣</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 35px;" value="1.00"></input>
							</div>
							<div style="float: right; padding-right: 40px; height: 24px;">
								<select style="width: 135px;">
									<option value="1">admin
									<option value="2">user1
									<option value="3">user2
								</select>
							</div>
							<div style="float: right; padding-right: 15px; height: 24px;">
								业务员</div>
						</div>
						<div>
							<div class="table-line">
								<div class="table-title-cell" style="width: 8%;"></div>
								<div class="table-title-cell" style="width: 20%;">编号</div>
								<div class="table-title-cell" style="width: 20%;">商品</div>
								<div class="table-title-cell" style="width: 8%;">数量</div>
								<div class="table-title-cell" style="width: 8%;">单价</div>
								<div class="table-title-cell" style="width: 8%;">金额</div>
								<div class="table-title-cell" style="width: 25%;">备注</div>
							</div>
							<div class="table-line">
								<div class="table-cell-1" style="width: 8%;">合计</div>
								<div class="table-cell-1" style="width: 20%;">/</div>
								<div class="table-cell-1" style="width: 20%;">/</div>
								<div class="table-cell-1" style="width: 8%;">0</div>
								<div class="table-cell-1" style="width: 8%;">￥</div>
								<div class="table-cell-1" style="width: 8%;">￥</div>
								<div class="table-cell-1" style="width: 25%;">/</div>
							</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="buy_footer_button_1"
								onmouseenter="button_mouseenter_footer('buy_footer_button_1')"
								onmouseleave="button_mouseleave_footer('buy_footer_button_1')"
								onmousedown="button_mousedown_footer('buy_footer_button_1')"
								onmouseup="button_mouseup_footer('buy_footer_button_1')">
								<img src="IMG/add.png" class="footer-button-img">
								<p>添加</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_3_1">
					<div id="buy_analyze_pad">
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 日期： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								开始日期：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								结束日期：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px; padding-left: 25px;">
								方法：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">
									<option value="2">方法 1
									<option value="3">方法 2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示货位： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择货位
									<option value="2">总库
									<option value="3">仓库 1
									<option value="4">仓库 2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示制单： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择制单
									<option value="2">其他
									<option value="3">普通
									<option value="4">电子
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示业务员： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								搜索：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示客户： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input class="textbox-common"></input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">选择业务员
									<option value="2">admin
									<option value="3">user1
									<option value="4">user2
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示商品： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 500px;"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 显示备注： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<input style="width: 500px;"></input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 分类聚集： </input>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">商品编号
									<option value="2">客户
									<option value="3">供应商
									<option value="4">业务员
									<option value="5">日期
									<option value="6">货位
									<option value="7">制单
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px; padding-left: 25px;">
								统计方式：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">已审核
									<option value="2">未审核
								</select>
							</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								商场模式：</div>
							<div style="float: left; padding-left: 15px; height: 24px;">
								<select style="width: 254px">
									<option value="1">全部
									<option value="2">商场
									<option value="2">非商场
								</select>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 按月合计 </input>
							</div>
							<div style="float: left; height: 24px; padding-left: 15px;">
								<input type="checkbox"> 按日合计 </input>
							</div>
							<div style="float: left; height: 24px; padding-left: 15px;">
								<input type="checkbox"> 按单合计 </input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div style="float: left; height: 24px;">
								<input type="checkbox"> 使用分页显示 </input>
							</div>
						</div>
						<div style="height: 36px; padding-left: 35px;">
							<div id="search_button_1"
								style="float: left; margin-right: 66px; background-color: #0078D7; height: 30px; width: 100px; text-align: center; cursor: pointer; color: white;"
								onmouseenter="button_mouseenter('search_button_1')"
								onmouseleave="button_mouseleave('search_button_1')"
								onmousedown="button_mousedown('search_button_1')"
								onmouseup="button_mouseup('search_button_1')">
								<p style="top: 50%; transform: translateY(-50%);">开始查询</p>
							</div>
						</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_3_2">
					<div id="orderation_info_pad">
						<div>
							<div class="table-line">
								<div class="table-title-cell cell-head"></div>
								<div class="table-title-cell" style="width: 35%;">名称</div>
								<div class="table-title-cell" style="width: 15%;">电话</div>
								<div class="table-title-cell" style="width: 15%;">传真</div>
								<div class="table-title-cell" style="width: 15%;">联系人 1</div>
								<div class="table-title-cell" style="width: 15%;">联系人 2</div>
							</div>
							<div class="table-line">
								<div class="table-cell-1 cell-head">-</div>
								<div class="table-cell-1" style="width: 35%;">
									001-2016040201 Trash Inc. BMMS™ 项目组</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
								<div class="table-cell-1" style="width: 15%;">13266618140
								</div>
								<div class="table-cell-1" style="width: 15%;">18215600298
								</div>
							</div>
							<div class="table-line">
								<div class="table-cell-2 cell-head">-</div>
								<div class="table-cell-2" style="width: 35%;">
									002-20160040802 Alibaba Inc. AliCloud™</div>
								<div class="table-cell-2" style="width: 15%;">/</div>
								<div class="table-cell-2" style="width: 15%;">/</div>
								<div class="table-cell-2" style="width: 15%;">/</div>
								<div class="table-cell-2" style="width: 15%;">/</div>
							</div>
							<div class="table-line">
								<div class="table-cell-1 cell-head">-</div>
								<div class="table-cell-1" style="width: 35%;">
									003-20160040903 Huawei Inc.</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
								<div class="table-cell-1" style="width: 15%;">/</div>
							</div>
						</div>
						<dir class="page-footer main-page-footer">
							<div class="footer-button" id="buyinfo_footer_button_1"
								onmouseenter="button_mouseenter_footer('buyinfo_footer_button_1')"
								onmouseleave="button_mouseleave_footer('buyinfo_footer_button_1')"
								onmousedown="button_mousedown_footer('buyinfo_footer_button_1')"
								onmouseup="button_mouseup_footer('buyinfo_footer_button_1')">
								<img src="IMG/add.png" class="footer-button-img">
								<p>添加</p>
							</div>
						</dir>
					</div>
				</div>
				<div class="right-page-main" id="page_right_4_0">
					<div id="storehouse_info_pad">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_5_0">
					<div id="assistant_tools_pad">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_6_0">
					<div id="meeting_room_1">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_6_1">
					<div id="meeting_room_2">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_6_2">
					<div id="meeting_room_3">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_7_0">
					<div id="storehouse_take_on">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
				<div class="right-page-main" id="page_right_7_1">
					<div id="people_take_on">
						<div
							style="font-size: 18px; padding-left: 35px; padding-top: 18px; padding-right: 35px;">
							此页面需求确认中</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 			<div class="page-footer" id="page_footer">
				<p>Copyright © BMMS Project™</p>
				<p>All Right Reserved</p>
			</div> -->
	</div>
</body>
</html>