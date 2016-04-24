var testundefined,DefaultCheckType;
function MyPrint(){
if (parent.produce_ready==0){
	alert('您操作有误！');return;
	}
if (document.Title.InStoreID.value=='NULL'||document.Title.InStoreID.length==0)alert('请选择保存过的单据！');
else printURL('SALES_Print.asp?ID=InStore&SerialNo='+document.Title.InStoreID.value+'&time='+new Date().valueOf());
}
function MyKeyDown(){
var f=window.event.srcElement.form;if(f==testundefined)return;
l=f.elements.length;k=window.event.keyCode;e=window.event.srcElement;n=e.name;
if(k==13&&n=='Source'){getcsulist('Source',6,e.value);window.event.returnValue=false;return;}
if(k==27){parent.Bottom.Search.find.focus();window.event.returnValue=false;return;}
if(k==13){parent.Bottom.Search.find.focus();return;}
for (var i=0;i<l;i++)if(f.elements[i]==e){switch (k){
case 37:for(j=i-1;j>=0;j--)if(!f.elements[j].disabled&&(f.elements[j].type=='text'||f.elements[j].type=='select-one')){f.elements[j].focus();break;}break;
case 39:for(j=i+1;j<l;j++)if(!f.elements[j].disabled&&(f.elements[j].type=='text'||f.elements[j].type=='select-one')){f.elements[j].focus();break;}break;}}}
document.onkeydown=MyKeyDown;
function getcsulist(obj,flag,str){parent.View.location.replace('SALES_CSUView.asp?Object='+obj+'&Flag='+flag+'&find='+str+'&time='+new Date().valueOf());return (false);}
function a(no,name,price,goodprice,number,memo,isserial){parent.Run._additem(no,name,price,goodprice,number,memo,isserial);}
function MSG2Remind(type,id){parent.View.document.location.replace('SALES_MSG2Remind.asp?type='+type+'&id='+id+'&flag=1&time='+new Date().valueOf());}
o = document.Title.Store;
document.Title.Source.focus();
if (parent.Run.rtTestUser('InStore',128,0)){document.Title.discount.value='1.00';document.Title.discount.readOnly=1;}

function SetSelect(odiv, ctrlid, defval, vstr, nwidth){
	var sdeli =String.fromCharCode(1);
	var va =vstr.split(sdeli);
	var n =va.length, iIndex =0, varstyle ="";
	if (nwidth!=undefined) varstyle ='style=width:"'+nwidth+'"'; 
	vtext ='<SELECT Name="'+ctrlid+'" ID="'+ctrlid+'" '+varstyle+'>';
	for (var i=0; i <n; i+=2){
		if (va[i].length){
			if(va[i] ==defval) vtext += '<OPTION Value="'+va[i]+'" selected>' + unescape(va[i+1]) + "</OPTION>";
			else vtext += '<OPTION Value="'+va[i]+'">' + unescape(va[i+1]) + "</OPTION>";
		}
	}
	odiv.innerHTML = vtext;
}
function SetSelect2(odiv, ctrlid, defval, vstr, nwidth){
	var sdeli =String.fromCharCode(1);
	var va =vstr.split(sdeli);
	var n =va.length, iIndex =0, varstyle ="";
	if (nwidth!=undefined) varstyle ='style=width:"'+nwidth+'"'; 
	vtext ='<SELECT Name="'+ctrlid+'" ID="'+ctrlid+'" '+varstyle+'>';
	for (var i=0; i <n; i++){
		if (va[i].length){
			if(va[i] ==defval) vtext += '<OPTION Value="'+va[i]+'" selected>' + unescape(va[i]) + "</OPTION>";
			else vtext += '<OPTION Value="'+va[i]+'">' + unescape(va[i]) + "</OPTION>";
		}
	}
	odiv.innerHTML = vtext;
}
function SetSelectValue(o, defval){
	var n =o.length; 
	for (var i=0; i<n; i++){
		if (o.options[i].value ==defval){
			o.selectedIndex =i;
			return(i);
		}
	}
}
