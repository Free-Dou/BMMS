<%@page import="dou.metaObject.MaterialInStock"%>
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
			@import url(CSS/table_common.css);
		</style>
		<script type="text/javascript" src="JS/common-js.js"> </script>
	</head>
	<body>
		<div id="item_info_pad" class="right-page-contains">
			<div class="right-page-title"> 仓储信息 </div>
			<div class="table-line">
				<div class="table-title-cell" style="width: 15%;"> 货位 </div>
				<div class="table-title-cell" style="width: 30%"> 编号 </div>
				<div class="table-title-cell" style="width: 30%"> 产品名称 </div>
				<div class="table-title-cell" style="width: 15%"> 数量 </div>
			</div>
			<div id="table_inner">
				<%
				String username = (String)session.getAttribute("username");
				if (null == username){
					out.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
				}
				/* 输出仓储信息 */
				ArrayList<MaterialInStock> materialInStockList = MaterialInStock.getAllMaterialInStockInfo();
				if (null != materialInStockList){
					for (int i = 0; i < materialInStockList.size(); i++){
						MaterialInStock materialInStock = materialInStockList.get(i);
						
						out.print("<div class=\"table-line\">");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 15%;\"> " + materialInStock.getStockloca() + " </div>");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 30%;\"> " + materialInStock.getmPSpec() + " </div>");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 30%;\"> " + materialInStock.getmName() + " </div>");
						out.print("<div class=\"table-cell-" + ((i % 2) + 1) + "\" style=\"width: 15%;\"> " + materialInStock.getNumber() + " </div>");
						out.print("</div>");
					}
				}
				%>
			</div>
		</div>
	</body>
</html>