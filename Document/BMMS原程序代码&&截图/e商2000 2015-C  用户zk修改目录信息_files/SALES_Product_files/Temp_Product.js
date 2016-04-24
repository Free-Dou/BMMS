var s1='<table border="0" width="100%" cellspacing="1" style="font-size: 9pt">';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'"><span OnClick="addto()">+</span></td>';
s1+='<td nowrap width="12%" align="center"><font color="'+parent.eB_ListTextColor+'">编号</td>';
s1+='<td nowrap width="47%" align="center"><font color="'+parent.eB_ListTextColor+'">名称（厂商或供应商）</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">进价</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">考核价</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">零售价</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">批发价１</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">批发价２</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">批发价３</td>';
s1+='<td nowrap width="7%" align="center"><font color="'+parent.eB_ListTextColor+'">∈</td></tr>';
document.writeln(s1);
var maxpage,curpage,listcount,icount=0,cursel=-1,arrayID=new Array();
function selchg(n){if(cursel==n)return;
var obj;eval('obj=document.all.item("trname'+n+'")');
obj.style.backgroundColor=parent.eB_MenuSelColor;obj.style.cursor='default';
if(cursel%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
if(cursel!=-1&&cursel<listcount)eval('document.all.item("trname'+cursel+'").style.backgroundColor=\''+colorstr+'\';');
cursel=n;}
function selchgOnFocus(){if(cursel!=-1)selchg(cursel);}
function MyKeyDown(){
k=window.event.keyCode;n=window.event.srcElement.name;
if(n=='pageno')return;
switch (k){
case 13:if(cursel!=-1)mod(arrayID[cursel]*2);break;
case 27:parent.Bottom.Search.find.focus();break;
case 33:gotopage(curpage-1);break;
case 34:gotopage(curpage+1);break;
case 45:addto();break;
case 46:if(cursel!=-1){if(arrayID[cursel*2+1]=='1')undel(arrayID[cursel*2]);else del(arrayID[cursel*2]);}break;
case 38:
	if(cursel==0){gotopage(curpage-1);break;}
	if(cursel==-1)cursel=listcount;
	if(cursel>0)selchg(cursel-1);
	break;
case 40:
	if(cursel==listcount-1){gotopage(curpage+1);break;}
	if(cursel<listcount-1)selchg(cursel+1);
	break;
	}
}
function EnterPSLimit(id){
document.location.replace('SALES_PSLimit.asp?id='+id+'&time='+new Date().valueOf());
}
function d(no,me,n1,n2,n3,checkprice,n4,n5,n6,n7,n8){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
arrayID[arrayID.length]=no;
arrayID[arrayID.length]=n8;
s='<tr id="trname'+icount+'" bgcolor="'+colorstr+'" OnMouseOver="selchg('+icount+')">\n';
if (n8 == '1'){
	s+='<span OnClick="undel(\''+no+'\')"><td align="center"><font color="'+colorfont+'">o</font></td></span>\n';
	colorstr='#FF00FF';
	}
else{
	s+='<span OnClick="del(\''+no+'\')"><td align="center"><font color="'+colorfont+'">x</font></td></span>\n';
	}
s+='<span OnClick="mod(\''+no+'\')">';
s+='<td nowrap><font color="'+colorfont+'">'+n1+'</td>\n';
s+='<td nowrap><font color="'+colorfont+'">'+n2+(me.length?'<font color="#008080">（'+me+'）</font>':'')+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+n3+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+checkprice+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+n4+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+n5+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+n6+'</td>\n';
s+='<td nowrap align="right"><font color="'+colorfont+'">'+n7+'</td>\n';
s+='</span>';
s+='<td nowrap align="right"><font color="'+colorfont+'"><span OnClick="EnterPSLimit(\''+no+'\')">∈</span></td>\n';
s+='</tr>\n';icount++;
document.write(s);
}
function TestPage(){
x=parseInt(document.gtpage.pageno.value);
if (x == curpage){
	alert('您目前正在本页！');
	return (false);
	}
if (x > 0 && x <= maxpage)return (true);
else{
	alert('您输入的不是有效页数！');
	return (false);
	}
return (true);
}
function TestPage1(np){
x=parseInt(np);
if (x == curpage){
	alert('您目前正在本页！');
	return (false);
	}
if (x > 0 && x <= maxpage)return (true);
else{
	return (false);
	}
return (true);
}
function detail(s){
if (s=='x')	alert('点击表格左边的 x，即可删除该条目！');
if (s=='o')	alert('点击表格左边的 o，即可恢复该条目！');
if (s=='?')	alert('点击表格其它部分，即可修改该条目！');
if (s=='∈')alert('点击表格右边的∈，即可修改该条目的库存上下限！');
}
var jsfind='',jspageno='1';
function addto(){
document.location.replace('SALES_ProductModify.asp?fun=addto&find='+jsfind+'&pageno='+jspageno+'&time='+new Date().valueOf());
}
function del(id){
if (!confirm('您确定删除（'+id+'）吗！')) return;
document.location.replace('SALES_ProductFun.ASP?fun=delete&id='+escape(id)+'&find='+jsfind+'&pageno='+jspageno+'&time='+new Date().valueOf());
}
function undel(id){
if (!confirm('您确定恢复（'+id+'）吗！')) return;
document.location.replace('SALES_ProductFun.ASP?fun=undelete&id='+escape(id)+'&find='+jsfind+'&pageno='+jspageno+'&time='+new Date().valueOf());
}
function mod(id){
document.location.replace('SALES_ProductModify.asp?fun=modify&id='+escape(id)+'&time='+new Date().valueOf());
}
function gotopage(np){
t = new Date().valueOf();
if (TestPage1(np)){document.onkeydown=null;document.location.replace('SALES_Product.asp?find='+jsfind+'&pageno='+np+'&time='+t);}
}