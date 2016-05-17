<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
	<body onresize="set_main()" onload="body_onload()" class="body_main">
		<div class="main-background main-background-img" id="main_back">
			<div class="page-title" id="page_title">
				<div style="float: left; color: #FFFFFF; padding-left: 10px; font-size: 36px; font-weight: 300;" >BMMS-Project™</div>
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
				<div class="left-menu" id="left_menu">
				</div>
				<div class="right-page-base" id="right_base">
					<div class="right-page-main" id="page_right_0_0">
						<iframe id="page_loader" style="height: 100%; width: 100%; border-width: 0px; position: absolute;" src="welcome.html"></iframe>
					</div>
					<div class="login-process-cover" style="text-align: center; background-color: rgba(0,0,0,0);" id="process_message">
						<div class="login-process-inner" id="pi_parent">
							<div id="pi0" class="process-item"></div>
							<div id="pi1" class="process-item"></div>
							<div id="pi2" class="process-item"></div>
							<div id="pi3" class="process-item"></div>
							<div id="pi4" class="process-item"></div>
						</div>
						<p id="process_tip" style="top: 460px; width: 100%; position: absolute;"> 页面加载中 </p>
					</div>
 				</div>
			</div>
		</div>
	</body>
</html>
