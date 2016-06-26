<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上传文件</title>
</head>
<body>
	<form action="UploadFile" enctype="multipart/form-data"
		method="post">
		请选择需要上传文件：<input type="file" name="file"><br /> <input
			type="submit" value="提交">
	</form>
</body>
</html>