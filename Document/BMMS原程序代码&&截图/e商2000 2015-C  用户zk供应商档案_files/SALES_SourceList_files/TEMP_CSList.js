var _szItemName='�ͻ�,custom,��Ӧ��,source,��ַ,address,��������,zipcode,��ַ,webaddress,�绰,tel1,����,fax,�绰��,tel2,�绰��,fax2,��ϵ�ˣ�,name1,�����ʼ�,name1email,ְ��,name1class,�ƺ�,name1call,����,name1birth,�Ա�,name1sexlist,�绰,name1tel,��ַ,name1address,�ֻ�,name1mobil,��ͥ,name1home,ϲ��,name1fov,��ϵ�ˣ�,name2,�����ʼ�,name2email,ְ��,name2class,�ƺ�,name2call,����,name2birth,�Ա�,name2sexlist,�绰,name2tel,��ַ,name2address,�ֻ�,name2mobil,��ͥ,name2home,ϲ��,name2fov',sw='custom';
var _ItemName=_szItemName.split(',');
function GetItemName(str){for(var i=0;i<_ItemName.length;i+=2)if(_ItemName[i]==str)return _ItemName[i+1];return str;}
var maxpage,curpage,listcount,icount=0,cursel=-1,arrayID=new Array();
function newcustom(){document.location.replace('SALES_Custom.asp');}
function newsource(){document.location.replace('SALES_Source.asp');}
function modcustom(n){document.location.replace('SALES_Custom.asp?custom='+arrayID[n]+'&time='+new Date().valueOf());}
function modsource(n){document.location.replace('SALES_Source.asp?custom='+arrayID[n]+'&time='+new Date().valueOf());}
function selchg(n){if(cursel==n)return;
var obj;eval('obj=document.all.item(\'trname'+n+'\');');
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
case 13:if(cursel!=-1)mod(cursel);break;
case 27:parent.Bottom.Search.find.focus();break;
case 33:gotopage(curpage-1);break;
case 34:gotopage(curpage+1);break;
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
function dh(){
var s='<table border="0" cellspacing="1" width="100%" style="font-size: 9pt"><tr bgcolor="'+parent.eB_ListColor+'">';
s+='<td nowrap align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
for(var i=0;i<fdis.length;i++)s+='<td nowrap align="center"><font color="'+parent.eB_ListTextColor+'">'+fdis[i]+'</td>';
s+='</tr>';
document.writeln(s);
}
function de(){document.writeln('</TABLE>');}
function d(n,str){
var s,vbjsobj = new vbjsSyncObject('', 0);
arrayID[arrayID.length]=n;
vbjsobj.putdata(str);
if(icount%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
s='<tr id="trname'+icount+'" bgcolor="'+colorstr+'" OnMouseOver="selchg('+icount+')"><span OnClick="mod'+sw+'('+icount+')">';
s+='<td nowrap><font color="'+colorfont+'">'+n+'</td>';
for(var i=0;i<fdis.length;i++){
	dynval=vbjsobj.finddata(GetItemName(fdis[i]));
	if(dynval==null)dynval='';
	s+='<td nowrap><font color="'+colorfont+'">'+dynval+'</td>';
	}
s+='</span></tr>';
document.writeln(s);
icount++;
delete vbjsobj;
}