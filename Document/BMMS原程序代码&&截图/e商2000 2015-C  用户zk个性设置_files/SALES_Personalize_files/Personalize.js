var obj,defstore,PrintPos;
function personalize(){
if (isNaN(parseFloat(obj.s4.value))){
	alert('您输入的折扣有误！');
	return (false);
}
if (isNaN(parseFloat(obj.s7.value))){
	alert('您输入的天数有误！');
	return (false);
}
if (isNaN(parseFloat(obj.Print_Cols.value))){
	alert('您输入的打印行数有误！');
	return (false);
}
if (isNaN(parseFloat(obj.ViewCols.value))){
	alert('您输入的显示行数有误！');
	return (false);
}
if (isNaN(parseFloat(obj.FindCols.value))){
	alert('您输入的查找行数有误！');
	return (false);
}
if (isNaN(parseFloat(obj.OpenCols.value))){
	alert('您输入的打开行数有误！');
	return (false);
}
if(obj.s1.selectedIndex>=0)Store=obj.s1.options[obj.s1.selectedIndex].value;else Store=0;
Price=obj.s2.options[obj.s2.selectedIndex].value;
Check=obj.s3.options[obj.s3.selectedIndex].text;
PrintPos=obj.Print_Pos.options[obj.Print_Pos.selectedIndex].value;
PrintCols=obj.Print_Cols.value;
ViewCols=obj.ViewCols.value;
FindCols=obj.FindCols.value;
OpenCols=obj.OpenCols.value;
HomePage=obj.HomePage.options[obj.HomePage.selectedIndex].text;
Discount=obj.s4.value;
Custom=obj.s5.value;
Source=obj.s6.value;
Days=obj.s7.value;
str='SALES_Personalize.asp?fun=set&store='+Store+'&price='+Price+'&check='+escape(Check)+'&discount='+Discount+'&custom='+escape(Custom)+'&source='+escape(Source)+'&days='+escape(Days);
str+='&PrintPos='+PrintPos;
str+='&PrintCols='+PrintCols;
str+='&ViewCols='+ViewCols;
str+='&FindCols='+FindCols;
str+='&OpenCols='+OpenCols;
str+='&MoneyType='+obj.moneytype.selectedIndex;
str+='&HomePage='+escape(HomePage);
str+='&APSale='+(obj.AP_Sale.checked?1:0);
str+='&APInStore='+(obj.AP_InStore.checked?1:0);
str+='&APSTS='+(obj.AP_StoreToStore.checked?1:0);
str+='&APMoney='+(obj.AP_Money.checked?1:0);
str+='&WarnPSL='+(obj.Warn_PSL.checked?1:0);
str+='&WarnPSN='+(obj.Warn_PSN.checked?1:0);
str+='&MenuStyle='+(obj.Menu_Style.checked?1:0);
str+='&SelAutoTrace='+(obj.Sel_AutoTrace.checked?1:0);
str+='&SelBarCode='+(obj.Sel_BarCode.checked?1:0);
str+='&PrintMemo='+(obj.print_memo.checked?1:0);
str+='&SerialVer='+(obj.serial_ver.checked?1:0);
t=new Date().valueOf();
document.location.replace(str+'&time='+t);
return (false);
}
function setSelect(selstr){
if (isNaN(selstr)) selstr='0';
for (var i=0;i<document.personal.s2.length;i++)	if (document.personal.s2.options[i].value==selstr)	document.personal.s2.selectedIndex=i;
}
function alertex(str){
if (str.length>0)alert(str);
}
function e(id, store){
o.options[o.length] = new Option(store, id, false, false);
if(id==defstore)o.selectedIndex=o.length-1;
}
o=document.personal.HomePage;
for(i=0;i<parent.Run._funlist.length;i+=2){o.options[o.length] = new Option(parent.Run._funlist[i], parent.Run._funlist[i], false, false);}
obj=document.personal;
function f(str){obj.s3.options[obj.s3.length]=new Option(str,str,0,0);
i=obj.s3.length-1;if (DefaultCheckType==str)obj.s3.selectedIndex=i;}
function SetHomePage(){for(var i=0;i<parent.Run._funlist.length;i+=2)if(parent.Run._funlist[i]==parent.Run.iHomePage){document.personal.HomePage.selectedIndex=i/2;return;}parent.Run.iHomePage='欢迎';}
function v(id, store){
o.options[o.length] = new Option(store, id, false, false);
if(id==PrintPos)o.selectedIndex=o.length-1;
}