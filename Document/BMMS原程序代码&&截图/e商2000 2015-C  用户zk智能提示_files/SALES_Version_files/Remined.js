var icount=0;
function gs(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">δ���ƾ֤</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">���ݺ�</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
s1+='<td nowrap width="60%" align="center"><font color="'+parent.eB_ListTextColor+'">ժҪ</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">�Ƶ���</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">��</td></tr>';
document.writeln(s1);
}
function g(n1,n2,n3,n4,n5){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'mone'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">��'+n1+'</a></td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}
function es(){
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">δ�����ⵥ</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">���ݺ�</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">��λ</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">�Ƶ���</td>';
s1+='<td nowrap width="50%" align="center"><font color="'+parent.eB_ListTextColor+'">��Ӧ��</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">��</td></tr>';
document.writeln(s1);
}
function e(n1,n2,n3,n4,n5,n6){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'InStore'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">��'+n1+'</a></td>';
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
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">δ������۵�</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">���ݺ�</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">��λ</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">�Ƶ���</td>';
s1+='<td nowrap width="50%" align="center"><font color="'+parent.eB_ListTextColor+'">�ͻ�����</td>';
s1+='<td nowrap width="2%" align="center"><font color="'+parent.eB_ListTextColor+'">��</td></tr>';
document.writeln(s1);
}
function d(n1,n2,n3,n4,n5,n6){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'Sale'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">��'+n1+'</a></td>';
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
var s1='<tr><td align="center"><table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr><td colspan="10" align="right"><font color="'+parent.eB_AlertTextColor+'">δ��˵�����</td></tr>';
s1+='<tr bgcolor="'+parent.eB_ListColor+'">';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">���ݺ�</td>';
s1+='<td nowrap width="14%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
s1+='<td nowrap width="33%" align="center"><font color="'+parent.eB_ListTextColor+'">������λ</td>';
s1+='<td nowrap width="33%" align="center"><font color="'+parent.eB_ListTextColor+'">�����λ</td>';
s1+='<td nowrap width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">�Ƶ���</td></tr>';
document.writeln(s1);
}
function f(n1,n2,n3,n4,n5){
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
var s='<tr bgcolor="'+colorstr+'" '+parent.Run.sme+'>';
s+='<span OnClick="parent.Run.parseFunctionString(\'StoreToStore'+n1+'\')"><td nowrap align="center"><font color="'+colorfont+'">��'+n1+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n2+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n3+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n4+'</td>';
s+='<td nowrap align="center"><font color="'+colorfont+'">'+n5+'</td>';
s+='</span></tr>';
icount++;
document.writeln(s);
}