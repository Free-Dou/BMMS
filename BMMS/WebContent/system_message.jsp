<%@page import="dou.metaObject.SystemMessage"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta charset="utf-8">

<html>
	<head>
		<title></title>
		<style type="text/css">
			@import url(CSS/right_common_style.css);
		</style>
		<style type="text/css">
			@import url(CSS/message_common.css);
		</style>
		<script type="text/javascript" src="JS/system_message.js"> </script>
		<script type="text/javascript" src="JS/common-js.js"> </script>
	</head>
	<body>
		<div class="right-page-contains" id="sys_message_pad">
			<div class="right-page-title"> 系统消息 </div>
				<%
					String username = (String)session.getAttribute("username");
					if (null == username){
						out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
					}
				
					ArrayList<SystemMessage> systemMessageList = SystemMessage.getAllSystemMessageInfo();
			
					if (null != systemMessageList){
						for (int i = 0; i < systemMessageList.size(); i++){
							SystemMessage systemMessageObject = systemMessageList.get(i);
							
							out.print("<div class=\"message-box-" + ((i % 2) + 1) + "\">");
							out.print("<div class=\"message-title\"> " + systemMessageObject.getsMessageName() + " </div>");
							out.print("<div class=\"message-contains\"> " + systemMessageObject.getsMessage() + "</div>");
							out.print("<div class=\"message-time\"> User : " + systemMessageObject.getUserName() + " Time : " + systemMessageObject.getTime() + "</div>");
							out.print("</div>");
						}
					}
					else
					{
						out.print("<div class=\"message-title\"> 暂时没有收到任何消息 </div>");
					}
				%>
			<dir class="page-footer main-page-footer">
				<div class="footer-button" id="message_footer_button_1" onmouseenter="button_mouseenter_footer('message_footer_button_1')" onmouseleave="button_mouseleave_footer('message_footer_button_1')" onmousedown="button_mousedown_footer('message_footer_button_1')" onmouseup="button_mouseup_footer('message_footer_button_1')" onclick="refreshme()">
					<img src="IMG/refresh.png" class="footer-button-img">
					<p>刷新</p>
				</div>
			</dir>
		</div>
	</body>
</html>