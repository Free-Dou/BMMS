function addcsu(str){
obj=document.search.customtext;
var senddata=obj.value.split(',');
var value = str;
if (senddata[0].length==0){
	senddata[0]=value;
	obj.value=senddata.join(',');
	return;
	}
for (var i=0;i<senddata.length;i++) if (senddata[i]==value) return;
senddata[i]=value;
obj.value=senddata.join(',');
delete senddata;
}

function csufind(flag,str){
csulist.location.replace('DynLoad/Dyn2_CSUView.asp?Flag='+flag+'&find='+str+'&time='+new Date().valueOf());
}

function vbjsGetForm(obj){
var pagebgcolor;
var i, value, str;
var vbjsobj = new vbjsSyncObject(obj.name, 2)
	
for (i=0;i<obj.length;i++){
	if (obj.elements[i].name=='date1'|| obj.elements[i].name=='date2')continue;
	else if (obj.elements[i].type=='text')value = obj.elements[i].value;
	else if (obj.elements[i].type=='select-one' && obj.elements[i].name=='gblist')value = obj.elements[i].selectedIndex;
	else if (obj.elements[i].type=='checkbox')value = (obj.elements[i].checked)?1:0;
	else continue;
	vbjsobj.appendobj(new Array(obj.elements[i].name, value));
	}
str = vbjsobj.getdata();
delete vbjsobj;
return str;
}
function vbjsFillForm(obj, str){
var i, value;
var vbjsobj = new vbjsSyncObject('', 0);

vbjsobj.putdata(str);
for (i=0;i<obj.length;i++){
	value = vbjsobj.finddata(obj.elements[i].name);
	if (value != null){
		if (obj.elements[i].type == 'text')obj.elements[i].value = value;
		else if (obj.elements[i].type == 'checkbox')obj.elements[i].checked = parseInt(value);
		else if (obj.elements[i].type == 'select-one')obj.elements[i].selectedIndex = parseInt(value);
		}
	}
delete vbjsobj;
return (true);
}
function sending(){
t = new Date().valueOf();
if (document.search.funtext.value.length==0){
	alert('必须输入查询方法！');
	document.search.funtext.focus();
	return;
	}
document.senddata.action = 'SALES_InStoreSelect.ASP?fun=create&FunctionName='+escape(document.search.funtext.value)+'&time='+t;
document.senddata.senddata.value = vbjsGetForm(document.search);
document.senddata.method = "POST"
document.senddata.submit();
}
function deleteitem(){
t = new Date().valueOf();
if (document.search.funlist.selectedIndex == -1) return;
if (!confirm('您确定删除吗！')) return;
document.senddata.action='SALES_InStoreSelect.ASP?fun=delete&FunctionName='+escape(document.search.funlist.options[document.search.funlist.selectedIndex].text)+'&time='+t;
document.senddata.method = "POST"
document.senddata.submit();
}
function fill(str){
vbjsFillForm(document.custom, str);
}
function loading(str){
if (document.search.funlist.selectedIndex == -1) return;
t = new Date().valueOf();
document.location.replace('SALES_InStoreSelect.asp?FunctionName='+document.search.funlist.options[document.search.funlist.selectedIndex].text+'&time='+t);
}
function addto(obj, objlist){
var senddata=obj.value.split(',');
var value = objlist.options[objlist.selectedIndex].text
if (value=='***请选择***'){
	obj.value='';
	return;
}
if (senddata[0].length==0){
	senddata[0]=value;
	obj.value=senddata.join(',');
	return;
	}
for (var i=0;i<senddata.length;i++) if (senddata[i]==value) return;
senddata[i]=value;
obj.value=senddata.join(',');
delete senddata;
}
function datetest(){
	obj = document.search;
	if (IsVBDate(obj.date1.value)==0)
	{
		alert('错误的开始日期！');
		obj.date1.focus();
		return (false);
	}
	
	if (IsVBDate(obj.date2.value)==0)
	{
		alert('错误的结束日期！');
		obj.date2.focus();
		return (false);
	}
	return (true);
}

function startsearch(){
if (!datetest()) return (false);

if (document.search.newface.checked) str ='SALES_InStoreViewEx.asp?search=1';
else str ='SALES_InStoreView.asp?search=1';
 
obj = document.search;

str+='&fos='+obj.fos.options[obj.fos.selectedIndex].value;

str+='&isdate='+(obj.datetest.checked?1:0);
str+='&date1='+obj.date1.value;
str+='&date2='+obj.date2.value;

str+='&isuser='+(obj.usertest.checked?1:0);
str+='&usertext='+escape(obj.usertext.value);

str+='&isuser1='+(obj.usertest1.checked?1:0);
str+='&usertext1='+escape(obj.usertext1.value);

str+='&isstore='+(obj.storetest.checked?1:0);
str+='&storetext='+escape(obj.storetext.value);

str+='&isproductsource='+(obj.customtest.checked?1:0);
str+='&productsourcetext='+escape(obj.customtext.value);

if (parent.Run.cVersion==0){
str+='&isproduct='+(obj.producttest.checked?1:0);
str+='&producttext='+escape(obj.producttext.value);
}
else{
str+='&ispm='+(obj.producttest.checked?1:0);
str+='&pmtext='+escape(obj.producttext.value);
	str+='&iscolor='+(obj.colortest.checked?1:0);
	str+='&colortext='+escape(obj.colortext.value);
	str+='&issize='+(obj.sizetest.checked?1:0);
	str+='&sizetext='+escape(obj.sizetext.value);
}

str+='&ismemo='+(obj.memotest.checked?1:0);
str+='&memotext='+escape(obj.memo.value);

str+='&isgb='+(obj.gbtest.checked?1:0);
str+='&gbtext='+escape(obj.gblist.options[obj.gblist.selectedIndex].value);
str+='&gbfrom='+obj.gbfrom.value;
str+='&gblen='+obj.gblen.value;

str+='&islist1='+(obj.list1.checked?1:0);
str+='&islist='+(obj.list.checked?1:0);
str+='&iscalc='+(obj.calc.checked?1:0);

t = new Date().valueOf();
if (document.search.newface.checked) parent.Recv.document.location.replace(str+'&time='+t);
else parent.View.document.location=str+'&time='+t;
return (false);
}
function e(cus){
o.options[o.length] = new Option(cus, cus, false, (o.length)?false:true);
}
function f(id, cus){
o.options[o.length] = new Option(cus, cus, false, (o.length)?false:true);
}
function startsearchex(){
startsearch();
document.close();
document.open();
document.write('<body bgcolor="'+pagebgcolor+'"><center><font color="#FF0000">清稍等……</center></body>');
}
function LoadSource(){
o = document.search.customlist;
if(o.length>1)return;
o.options[0] = new Option('***请选择***', '***请选择***', false, false);
dynload.location.replace('DYNLoad/Load_CSU.asp?cb=e&csu=2&time='+new Date().valueOf());
}