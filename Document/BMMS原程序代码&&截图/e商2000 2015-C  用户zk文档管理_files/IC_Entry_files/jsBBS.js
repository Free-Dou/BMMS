function CreateBodyElem(){
	return '<body bgcolor="'+eB_PageBgColor+'" text="'+eB_TextColor+'">';
}

function CreateAddGroupCtrl(action,type){
	return '<table border=0 cellpadding=0 cellspacing=0><tr><form method="POST" action="'+action+'"><td><input type="hidden" name="id" value="'+type+'"><font style="font-size:12pt">名称：<input name="title" style="width:300px"><br>附言：<br><TEXTAREA name="message" style="width:348px;height:60px"></TEXTAREA><br><input type="submit" value=" 新建 "></td></form></tr></table>';
}

function CreateBindGroupCtrl(action,type){
	return '<table border=0 cellpadding=0 cellspacing=0><tr><form method="POST" action="'+action+'"><td><input type="hidden" name="id" value="'+type+'"><font style="font-size:12pt">版号（删除）：<input name="deleteid" style="width:236px"><br>版号：<input name="groupid" style="width:222px">　<input type="submit" value=" 合并 "></td></form></tr></table>';
}

function CreateOwnerGroupCtrl(action,type){
	return '<table border=0 cellpadding=0 cellspacing=0><tr><form method="POST" action="'+action+'"><td><input type="hidden" name="id" value="'+type+'"><font style="font-size:12pt">版号：<input name="groupid" style="width:300px"><br>版主：<input name="owner" style="width:222px"><br>版主１：<input name="owner1" style="width:206px"><br>版主２：<input name="owner2" style="width:206px">　<input type="submit" value=" 修改 "></td></form></tr></table>';
}

function CreateWindow(title,form,gsp,gfr,width,height){
	var s='<table'+(width==''?'':(' width='+width))+(height==''?'':(' height='+height))+' border=0 cellpadding=0 cellspacing=0><tr bgcolor="'+eB_ListColor+'"><td colspan=5 height='+(gsp+1)+'></td></tr>';
	s+='<tr bgcolor="'+eB_ListColor+'"><td width='+gfr+'></td><td width='+gsp+'></td><td style="font-size:11.5pt"><font color="'+eB_ListTextColor+'">'+title+'</td><td width='+gsp+'></td><td width='+gfr+'></td></tr>';
	s+='<tr bgcolor="'+eB_ListColor+'"><td colspan=5 height='+(gsp-1)+'></td></tr><tr height='+(gsp+1)+'><td bgcolor="'+eB_ListColor+'"></td><td></td><td></td><td></td><td bgcolor="'+eB_ListColor+'"></td></tr>';
	s+='<tr><td bgcolor="'+eB_ListColor+'"></td><td></td><td>'+form+'</td><td></td><td bgcolor="'+eB_ListColor+'"></td></tr><tr height='+(gsp-1)+'><td bgcolor="'+eB_ListColor+'"></td><td></td><td></td><td></td><td bgcolor="'+eB_ListColor+'"></td></tr>';
	s+='<tr bgcolor="'+eB_ListColor+'" height='+gfr+'><td colspan=5></td></tr></table>';
	return s;	
}

function CreatePageCtrl(action,groupID,pageTotal,curPage,findStr){
	var s;
	s='<form method=get action="'+action+'"><tr><td align="right" style="font-size:9pt"><input type="hidden" name="id" value="'+groupID+'"><input type="text" size="20" name="find" value="'+findStr+'">　<input type=submit value="搜索">　';
	if(curPage>1)s+='<a href="'+action+'?id='+groupID+'&find='+findStr+'&pageno='+(curPage-1)+'">上页</a>　';
	else s+='上页　';
	if(curPage<pageTotal)s+='<a href="'+action+'?id='+groupID+'&find='+findStr+'&pageno='+(curPage+1)+'">下页</a>　'
	else s+='下页　';
	s+='共'+pageTotal+'页　第<input type="text" size="3" name="pageno" value="'+curPage+'" maxlength="5">页　<input type=submit value="转"><br><br></td></tr></form>';
	return s;
}

function CreatePost(action,groupID){
	var s;
	s='<form method="POST" action="'+action+'"><input type="hidden" name="id" value="'+groupID+'">';
	s+='<tr><td>标题：<input name="title" style="width:470px"><br>';
	s+='暗送：<input name="sendto" style="width:470px"><br>';
	s+='内容：　<input name="htmlencode" type="checkbox" value="1">使用HTML语法<br>';
	s+='<TEXTAREA name="message" style="width:510px;height:300px"></TEXTAREA><br><input type="submit" value=" 保存 "></td></tr></form>';
	return s;
}

function CreatePostFollow(action,groupID,followID){
	var s;
	s='<form method="POST" action="'+action+'"><input type="hidden" name="id" value="'+groupID+'"><input type="hidden" name="fid" value="'+followID+'"><input type="hidden" name="title" value="_PostFollow">';
	s+='暗送：<input name="sendto" style="width:470px"><br>';
	s+='<tr><td>内容：　<input name="htmlencode" type="checkbox" value="1">使用HTML语法<br>';
	s+='<TEXTAREA name="message" style="width:510px;height:300px"></TEXTAREA><br><input type="submit" value=" 保存 "></td></tr></form>';
	return s;
}

function CreateRemindCtrl(action,type,id,flag){
	date1=new Date();
	date1.setMonth(date1.getMonth()+1,date1.getDate());
	return '<table border=0 cellpadding=0 cellspacing=0><tr><form method="POST" action="'+action+'"><td><input type="hidden" name="flag" value="'+flag+'"><input type="hidden" name="type" value="'+type+'"><input type="hidden" name="id" value="'+id+'"><font style="font-size:12pt">提醒日期：<input type="text" name="year1" size="4" value="'+date1.getYear()+'" style="width: 34px;text-align: right">年<input type="text" name="month1" size="2" value="'+(date1.getMonth()+1)+'" style="width: 20px;text-align: right">月<input type="text" name="day1" size="2" value="'+date1.getDate()+'" style="width: 20px;text-align: right">日　<input type="submit" value=" 设定 "><br>附言：<br><TEXTAREA name="message" style="width:348px;height:60px"></TEXTAREA></td></form></tr></table>';
}

document.write(CreateBodyElem());