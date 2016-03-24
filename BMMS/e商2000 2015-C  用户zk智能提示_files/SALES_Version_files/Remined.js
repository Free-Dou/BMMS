var icount=0;
function gs(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">未审核凭证</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">单据号</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">日期</td>';
s1+='<td nowrap width="60%" align="center"><font color="'+parent.eB_ListTextColor+'">摘要</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">制单人</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">类</td></tr>';
document.writeln(s1);
}
function g(n1,n2,n3,n4,n5){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'mone'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">№'+n1+'</a></td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}
function es(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">未审核入库单</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">单据号</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">日期</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">货位</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">制单人</td>';
s1+='<td nowrap width="50%" align="center"><font color="'+parent.eB_ListTextColor+'">供应商</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">类</td></tr>';
document.writeln(s1);
}
function e(n1,n2,n3,n4,n5,n6){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'InStore'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">№'+n1+'</a></td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n6+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}
function ds(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">未审核销售单</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">单据号</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">日期</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">货位</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">制单人</td>';
s1+='<td nowrap width="50%" align="center"><font color="'+parent.eB_ListTextColor+'">客户名称</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">类</td></tr>';
document.writeln(s1);
}
function d(n1,n2,n3,n4,n5,n6){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'Sale'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">№'+n1+'</a></td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n6+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}
function fs(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">未审核调拨单</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">单据号</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">日期</td>';
s1+='<td nowrap width="33%" align="center"><font color="'+parent.eB_ListTextColor+'">调出货位</td>';
s1+='<td nowrap width="33%" align="center"><font color="'+parent.eB_ListTextColor+'">调入货位</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">制单人</td></tr>';
document.writeln(s1);
}
function f(n1,n2,n3,n4,n5){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'StoreToStore'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">№'+n1+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}