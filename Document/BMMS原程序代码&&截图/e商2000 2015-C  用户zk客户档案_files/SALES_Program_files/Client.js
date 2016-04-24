function fnumber(val){return fixFloat2(val/100);}
function fnumber4(val){return fixFloat4(val/10000);}
function fnumber42(val){return fnumber(IFNUM(fnumber4(val)));}
function finddot(str1){i=0;while(i<str1.length){if (str1.charAt(i) == '.'.charAt(0))return i;i++;}return -1;}
function IFNUM(val){v=parseFloat(val);if(isNaN(v))return 0;return ((v<0)?parseInt(v*100-0.5):parseInt(v*100+0.5));}
function IFNUM4(val){var v =parseFloat(val);if(isNaN(v)) return 0;return ((v<0)?parseInt(v*10000-0.5):parseInt(v*10000+0.5));}
function fixFloat4(f){var v=parseFloat(f);if (isNaN(v)) return 0;var prec=Math.pow(10, 4);return (parseInt(v*prec+(v<0?(-0.5):0.5))/prec);}
function fixFloat2(f){var v=parseFloat(f);if (isNaN(v)) return 0;var prec=Math.pow(10, 2);return (parseInt(v*prec+(v<0?(-0.5):0.5))/prec);}
function validInt(i, def){var n = parseInt(i);return (isNaN(n)?def:n);}
function validFloat(f, def){var n = parseFloat(f);return(isNaN(n)?def:n);}
function csvenc(s){return s.replace(/\\/g, "\\;").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t");}
function csvdec(s){return s.replace(/\\t/g, "\t").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\;/g, "\\");}

function objMONEY(class1no, class1, class2, class3, amount, mark){
	this.length=7;
	this.memo='';
	this.class1no=class1no;
	this.class1=class1;
	this.class2=class2;
	this.class3=class3;
	this.amount=amount;
	this.mark=mark;
}

function GOODS(no, name, price, goodprice, number,memo,isserial){
	this.length=5;
	this.no=no;
	this.name=name;
	this.price=IFNUM4(price);
	this.goodprice=IFNUM4(goodprice);
	this.number=IFNUM4(number);
	this.isserial =validInt(isserial,0);
	this.memo=((memo==undefined)?'':memo);
}

function setGOODS(o, no, name, price, goodprice, number,memo,isserial){
	o.length=5;
	o.no=no;
	o.name=name;
	o.price=IFNUM4(price);
	o.goodprice=IFNUM4(goodprice);
	o.number=IFNUM4(number);
	o.isserial =validInt(isserial,0);
	o.memo=((memo==undefined)?'':memo);	
}

function checkgoods(){
	var o, amo, n =goodslib.length;
	if (n<=0) return "";
	for(var i=0; i<n; i++){
		o =goodslib[i];
		if (o.isserial==1){
			amo =o.memo.split('\r\n');
			if (amo.length!=Math.abs(o.number/10000)) return (o.no+"û��������Ӧ�����Ĵ���.");
		}
	}
	return "";
}

function cnum(price){
	var v=new String(price);
	if(finddot(v)==-1)v+='.00';
	v+='00';
	return parseInt(v.substr(0,finddot(v)),10)*100+parseInt(v.substr(finddot(v)+1,2),10);
}

function gopage(pageno){
	var v =parseInt(pageno);
	if (!isNaN(v))curpos=(v-1)*prepage;
	delay();
	return (false);
}

function donewpage(key){
	if(key==0)
		curpos-=prepage;
	else
		curpos+=prepage;
	delay();
}

function bsFocus(){setTimeout('parent.Bottom.Search.find.focus();',100);}
function delay(){UpdateView();bsFocus();}
function modifyitempn(itemno,goodprice,number,memo){
	if (itemno>=igoods||itemno<0)
		return;
	goodslib[itemno].goodprice=IFNUM4(goodprice);
	goodslib[itemno].number=IFNUM4(number);
	goodslib[itemno].memo=memo;
	unsave=1;
	delay();
	return (false);
}

var iModifyView=0;
function modifyitem(i){
	if (i>=igoods||i<0)return;
	iModifyView=i;
	SetHtmlLoc(parent.View,'ModifyItem.htm');
}

function GetModifyItem(){
	var s='<body bgcolor="'+parent.eB_PageBgColor+'"><div align="center"><center>';
	s+='<table border="0" width="100%" cellpadding="1" cellspacing="1" style="font-size: 10.5pt"><tr bgcolor="'+parent.eB_ListColor+'">';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">���</td>';
	s+='<td width="32%" align="center"><font color="'+parent.eB_ListTextColor+'">��Ʒ</td>';
	s+='<td width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
	s+='<td width="13%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td></tr>';
	s+='<form name="modify" OnSubmit="return modifyitempn('+iModifyView+',document.modify.price.value,document.modify.number.value,document.modify.memo.value)">';
	s+='<tr bgcolor="'+parent.eB_ListColor1+'">\n<td><font color="'+parent.eB_ListTextColor1+'">'+goodslib[iModifyView].no+'</td>';
	s+='<td><font color="'+parent.eB_ListTextColor1+'">'+goodslib[iModifyView].name+'</td>';
	s+='<td align="center"><input type="text" size="8" name="number" value="'+fnumber4(goodslib[iModifyView].number)+'" style="text-align: right" OnFocus="select()"></td>';
	s+='<td align="center"><input type="text" size="12" name="price" value="'+fnumber4(goodslib[iModifyView].goodprice)+'" style="text-align: right" OnFocus="select()"></td></tr>';
	s+='<tr><td bgcolor="'+parent.eB_ListColor1+'" colspan="4">��ע(����)��<textarea onkeyup="fnCheckSerialNum(idSerialNum, this.value)" rows="16" cols="70" style="width:100%" name="memo" OnFocus="select()"></textarea></td></tr>';
	s+='<tr><td bgcolor="'+parent.eB_ListColor1+'" colspan="3">'+(iSerialVer==1?'���кŸ�����':'')+'<span id="idSerialNum"></span></td>';
	s+='<td valign="bottom" bgcolor="'+parent.eB_ListColor1+'" align="center"><input type="submit" tabindex=-1 value="ȷ��">��<input name="cancel" type="button" value="ȡ��" OnClick="parent.Run.delay();"></td></tr>';
	s+='</form></table></body>';
	return s;
}

function getdiscount(){
	var discount=1,i,obj=parent.Title.Title;
	for (i=0;i<obj.length;i++) if (obj.elements[i].name=='discount' && obj.elements[i].type=='text'){
		if (!isNaN(obj.elements[i].value)) discount=parseFloat(obj.elements[i].value);
		break;
	}
	return discount;
}

function additem(no,name,price,goodprice,number,memo,isserial){
	if (buy_enable==0)return(alert('���ڲ�����ѡ���Ʒ��'));
	if(igoods>=goodslib.length){goodslib[igoods]=new GOODS(no,name,price,goodprice,number,memo,isserial);}
	else{setGOODS(goodslib[igoods],no,name,price,goodprice,number,memo,isserial);}
	igoods++;
	unsave=1;
	curpos = igoods;
	delay();
}

function _additem(no,name,price,goodprice,number,memo,isserial){
	if (buy_enable==0)return(alert('���ڲ�����ѡ���Ʒ��'));
	if(igoods>=goodslib.length){goodslib[igoods]=new GOODS(no,name,price,goodprice,number,memo,isserial);}
	else{setGOODS(goodslib[igoods],no,name,price,goodprice,number,memo,isserial);}
	igoods++;
	curpos = igoods;
}

function delitem(num){
	if (num==-1){delall();return;}
	if (num>=igoods || num<0) return;
	for (i=num;i<igoods-1;i++){
		goodslib[i].no=goodslib[i+1].no;
		goodslib[i].name=goodslib[i+1].name;
		goodslib[i].price=goodslib[i+1].price;
		goodslib[i].goodprice=goodslib[i+1].goodprice;
		goodslib[i].number=goodslib[i+1].number;
		goodslib[i].isserial=goodslib[i+1].isserial;
		goodslib[i].memo=goodslib[i+1].memo;
		}
	igoods--;
	delay();
	unsave=1;
}

function delall(){igoods=0;bsFocus();unsave=0;}
function delallx(){igoods=0;delay();unsave=1;}

function WriteProductList(tarobj){
	var vstr ='';
	tarobj.document.writeln('<input type="hidden" name="checksum" value="'+igoods+'">');
	for (i=0;i<igoods;i++){
		vstr ='<input type="hidden" name="id'+i+'" value="'+escape(goodslib[i].no)+'">';
		vstr +='<input type="hidden" name="price'+i+'" value="'+goodslib[i].goodprice/10000+'">';
		vstr +='<input type="hidden" name="number'+i+'" value="'+goodslib[i].number/10000+'">';
		vstr +='<input type="hidden" name="memo'+i+'" value="'+escape(goodslib[i].memo)+'">';
		vstr +='<input type="hidden" name="isserial'+i+'" value="'+goodslib[i].isserial+'">'
		vstr +='<input type="hidden" name="ok'+i+'" value="1">';
		tarobj.document.writeln(vstr);
	}
}

function autotimer(){
	if (parent.ar_switch){
		dog1++;
		if (dog1*interleave>30000){
			parent.al_loadok=1;
			dog1=0;
			}
		if (parent.al_loadok==1){
			parent.al_loadok=0;
			dog1=0;
			SetLoc(parent.AutoRecv,'SALES_AutoRecv.asp?');
			}
		}
	setTimeout('autotimer();', interleave);
}

function LoadFun(funid, id){
	SetHtmlLoc(parent.View,'TipsWait.htm');
	SetLoc(parent.Title,'SALES_Title.asp?ID='+funid+'&SerialNo='+id);
}

function NewFun(funid){
	var bAutoDel = parent.Bottom.Search.newtodel.checked;
	if (bAutoDel) delall();	 
	SetLoc(parent.Title,'SALES_Title.asp?ID='+funid);
	buy_enable=1;
	if (igoods>0)  unsave=1; else unsave=0;
	UpdateView();
}

function SwitchView(us,m)
{
	buy_enable=1;
	unsave=us;
	if(m)UpdateMoneyView();
	else UpdateView();
	parent.produce_ready=1;
}

function ProcFun(funid, id, undo)
{
	if (funid.toLowerCase()=='sales')
	{
		EnterSales(0);
		SetLoc(parent.Send,'SALES_SaleOutStore.asp?SerialNo='+id+'&Undo='+undo);
	}
	if (funid.toLowerCase()=='instore')
	{
		EnterInStore(0);
		SetLoc(parent.Send,'SALES_InStore.asp?SerialNo='+id+'&Undo='+undo);
	}
	if (funid.toLowerCase()=='storetostore')
	{
		EnterStoreToStore(0);
		SetLoc(parent.Send,'SALES_StoreToStore.asp?SerialNo='+id+'&Undo='+undo);
	}
	if (funid.toLowerCase()=='checkin')
	{
		EnterCheckIn(0);
		SetLoc(parent.Send,'SALES_CheckMoney.asp?SerialNo='+id+'&Undo='+undo);
	}
}

function GetStringNumericPos(str){
	for (var i=0;i<str.length;i++) {
		if (str.charCodeAt(i)<=57 && str.charCodeAt(i)>=48) return i;
	}
}

function parseFunctionString(str)
{
	var p1=0, p2=0, LoadID = 0, IDTo = -1, sStr1 = '', sStr2 = '', AuditID;
	str = str.toLowerCase();
	var p1 = GetStringNumericPos(str);
	var p2 = str.indexOf('-');
	if (p2 > p1) 
	{
		sStr1 = str.substr(p1, p2-p1);
		sStr2 = str.substr(p2+1);
		LoadID = validInt(sStr1, 0);
		IDTo = validInt(sStr2, 0);
		if (IDTo < LoadID) return;
		AuditID = "'"+LoadID+"-"+IDTo+"'";
	}
	else
	{
		sStr1 = str.substr(p1);	
		LoadID = validInt(sStr1, 0);
		AuditID = LoadID;
	}
	if (str.indexOf('����')==0 || str.indexOf('sale')==0){setTimeout('EnterSales('+LoadID+');', '100');return;}
	if (str.indexOf('���')==0 || str.indexOf('����')==0 || str.indexOf('inst')==0){setTimeout('EnterInStore('+LoadID+');', '100');return;}
	if (str.indexOf('����')==0 || str.indexOf('stor')==0){setTimeout('EnterStoreToStore('+LoadID+');', '100');return;}
	if (str.indexOf('ƾ֤')==0 || str.indexOf('mone')==0 || str.indexOf('acc')==0){setTimeout('EnterCheckIn('+LoadID+');', '100');return;}
	if (str.indexOf('psale')==0){setTimeout('ProcFun(\'sales\','+AuditID+',0);', '100');return;}
	if (str.indexOf('pinst')==0){setTimeout('ProcFun(\'instore\','+AuditID+',0);', '100');return;}
	if (str.indexOf('pstor')==0){setTimeout('ProcFun(\'storetostore\','+AuditID+',0);', '100');return;}
	if (str.indexOf('pmone')==0){setTimeout('ProcFun(\'checkin\','+LoadID+',0);', '100');return;}
	if (str.indexOf('usale')==0){setTimeout('ProcFun(\'sales\','+LoadID+',1);', '100');return;}
	if (str.indexOf('uinst')==0){setTimeout('ProcFun(\'instore\','+LoadID+',1);', '100');return;}
	if (str.indexOf('ustor')==0){setTimeout('ProcFun(\'storetostore\','+LoadID+',1);', '100');return;}
	if (str.indexOf('umone')==0){setTimeout('ProcFun(\'checkin\','+LoadID+',1);', '100');return;}
	if (str.indexOf('mo')==0){if (iswitch==0)setTimeout('modifyitem('+(LoadID-1)+');', '100');return;}
	if (str.indexOf('de')==0)
	{
		if (iswitch==0){delitem(LoadID-1);delay();}
		if (iswitch==1){Moneydelitem(LoadID-1);UpdateMoneyView();}
		return;
	}
	if (str.indexOf('osale')==0){setTimeout('parent.produce_ready=1;LoadSale('+LoadID+');', '100');return;}
	if (str.indexOf('oinst')==0){setTimeout('parent.produce_ready=1;LoadInStore('+LoadID+');', '100');return;}
	if (str.indexOf('ostor')==0){setTimeout('parent.produce_ready=1;LoadStoreToStore('+LoadID+');', '100');return;}
	if (str.indexOf('omone')==0){setTimeout('parent.produce_ready=1;LoadPayMoney('+LoadID+');', '100');return;}
}


function Moneyadditem(class1no,class1,class2,class3,amount,mark,memo)
{
	if (buy_enable==0){
		alert('���ڲ�����ѡ��Ʊ�ݣ�');
		return;
		}
	if(imoney>=moneylib.length)moneylib[imoney]=new objMONEY('','','','',0,0,'');
	moneylib[imoney].class1no=class1no;
	moneylib[imoney].class1=class1;
	moneylib[imoney].class2=class2;
	moneylib[imoney].class3=class3;
	moneylib[imoney].amount=IFNUM(amount);
	moneylib[imoney].mark=mark;
	if(memo==valueUndefined) moneylib[imoney].memo='';
	else moneylib[imoney].memo=memo;
	imoney++;
	unsave=1;
	setTimeout('Moneydelay();', 100);
}

function Money_additem(class1no,class1,class2,class3,amount,mark,memo)
{
	if (buy_enable==0){
		alert('���ڲ�����ѡ��Ʊ�ݣ�');
		return;
		}
	if(imoney>=moneylib.length)moneylib[imoney]=new objMONEY('','','','',0,0,'');
	moneylib[imoney].class1no=class1no;
	moneylib[imoney].class1=class1;
	moneylib[imoney].class2=class2;
	moneylib[imoney].class3=class3;
	moneylib[imoney].amount=IFNUM(amount);
	moneylib[imoney].mark=mark;
	if(memo==valueUndefined) moneylib[imoney].memo='';
	else moneylib[imoney].memo=memo;
	imoney++;
}

function Moneydelitem(num)
{
	if (num==-1){Moneydelall();return;}
	if (num>=imoney || num<0) return;
	for (i=num;i<imoney-1;i++){
		moneylib[i].class1no=moneylib[i+1].class1no;
		moneylib[i].class1=moneylib[i+1].class1;
		moneylib[i].class2=moneylib[i+1].class2;
		moneylib[i].class3=moneylib[i+1].class3;
		moneylib[i].amount=moneylib[i+1].amount;
		moneylib[i].mark=moneylib[i+1].mark;
		moneylib[i].memo=moneylib[i+1].memo;
		}
	imoney--;
	UpdateMoneyView();
	bsFocus();
	unsave=1;
}

function Moneydelall()
{
	imoney=0;
	bsFocus();
	unsave=0;
}

function Moneydelallx()
{
	imoney=0;
	UpdateMoneyView();
	bsFocus();
	unsave=1;
}

function WriteMoneyList(tarobj)
{
	tarobj.document.writeln('<input type="hidden" name="checksum" value="'+imoney+'">');
	for (i=0;i<imoney;i++)
	{
		tarobj.document.writeln('<input type="hidden" name="class1_'+i+'" value="'+escape(moneylib[i].class1no)+'">');
		tarobj.document.writeln('<input type="hidden" name="class2_'+i+'" value="'+escape(moneylib[i].class2)+'">');
		tarobj.document.writeln('<input type="hidden" name="class3_'+i+'" value="'+escape(moneylib[i].class3)+'">');
		tarobj.document.writeln('<input type="hidden" name="amount'+i+'" value="'+moneylib[i].amount/100+'">');
		tarobj.document.writeln('<input type="hidden" name="mark'+i+'" value="'+moneylib[i].mark+'">');
		tarobj.document.writeln('<input type="hidden" name="memo'+i+'" value="'+escape(moneylib[i].memo)+'">');
		tarobj.document.writeln('<input type="hidden" name="ok'+i+'" value="1">');
	}
}

function CheckMoneyOK()
{
	sum_debit=0;
	sum_credit=0;
	sum_debit_num=0;
	sum_credit_num=0;
	for (i=0;i<imoney;i++)
	{
		if (moneylib[i].mark == 0)
		{
			sum_debit+=moneylib[i].amount;
			sum_debit_num++;
		}
		else
		{
			sum_credit+=moneylib[i].amount;
			sum_credit_num++;
		}
	}
	if (sum_debit==sum_credit)	return (true); 	else return (false);
}

function SetTitle(obj,str){obj.location.replace('/TitleDisplay.htm?String='+str);}
function SetLoc(obj,str){obj.location.replace('/'+str+'&time='+new Date().valueOf());}
function SetHtmlLoc(obj,str){obj.location.replace('/'+str);}
function SetHelp(id){parent.Bottom.helpid=id;parent.Bottom.helpstr=ho.gethelp(id);}
function SetSearch(str){parent.Bottom.SetSearchURL(str);}
function SetSearchEx(str){parent.Bottom.SetSearchURLEx(str);}
function SetUrlEx(str){parent.Bottom.extra_url=str;}

function rtTestUser(id,rt1,ex1)
{
	var rt=parseInt(rt1),ex=parseInt(ex1),rv=0;
	if(isNaN(rt)||isNaN(ex))return 0;
	if(ex)rt|=32;
	for(var i=2;i<arrayRight.length;i+=2){
		if(arrayRight[i].toLowerCase()==id.toLowerCase()){
			rv=arrayRight[i+1];
			break;
			}
		}
	if(rt){
		if((rv&rt)==rt)return 1;
		else return 0;
		}
	else return rv;
}

function EnterSales(LoadID)
{
	LoadID = validInt(LoadID, 0);
	parent.FormAll.rows='72,*,22';
	parent.Bottom.SetSearchURL('SALES_View.asp?ID=Sale&find=');
	SetHelp('Sale');
	if (LoadID==0) NewFun('Sales'); else LoadFun('Sales', LoadID);
}

function EnterInStore(LoadID)
{
	LoadID = validInt(LoadID, 0);
	parent.FormAll.rows='72,*,22';
	parent.Bottom.SetSearchURL('SALES_View.asp?ID=InStore&find=');
	SetHelp('InStore');
	if (LoadID==0) NewFun('InStore'); else LoadFun('InStore', LoadID);
}

function EnterStoreToStore(LoadID)
{
	parent.FormAll.rows='70,*,22';
	parent.Bottom.SetSearchURL('SALES_View.asp?ID=StoreToStore&find=');
	SetHelp('StoreToStore');
	if (isNaN(LoadID)||LoadID==0)NewFun('StoreToStore');
	else LoadFun('StoreToStore', parseInt(LoadID));
}

function EnterUserDefine(LoadID)
{
	LoadID = validInt(LoadID, 0);
	parent.FormAll.rows='66,*,22';
	parent.Bottom.SetSearchURL('SALES_View.asp?find=');
	SetHelp('UserDefine');
	if (LoadID==0) NewFun('UserDefine'); else LoadFun('UserDefine', LoadID);
}

function EnterCheckIn(LoadID,AccWizName,Class2,Amount)
{
	parent.FormAll.rows='70,*,22';
	SetHelp('CheckIn');
	parent.Bottom.SetSearchURL('SALES_ViewMoney.asp?fpay=0&find=');
	if (isNaN(LoadID)||LoadID==0){
		if(parent.Bottom.Search.newtodel.checked)Moneydelall();
		if (arguments.length==4){
			SetLoc(parent.Title,'SALES_Title.asp?ID=CheckIn&pzMemo='+AccWizName+'&class2='+Class2+'&amount='+Amount);
			}
		else{
			SetLoc(parent.Title,'SALES_Title.asp?ID=CheckIn');
			UpdateMoneyView();
			}
		buy_enable=1;
		if (imoney>0)	unsave=1;
		else	unsave=0;
		}
	else LoadFun('CheckIn',LoadID);
}

function EnterAccount(flag)
{
	parent.FormAll.rows='32,*,0';
	SetHelp('Account');
	SetTitle(parent.Title,'�鿴��ҳ');
	SetSearch('');
	if(flag==valueUndefined||flag==0)SetLoc(parent.View,'SALES_AccSelect.asp?');
	else SetLoc(parent.View,'SALES_AccSelect.ASP?AccountFirstClass=1');
}

function EnterTblSel()
{
	parent.FormAll.rows='0,*,0';
	SetHelp('tblsel');
	SetTitle(parent.Title,'');
	SetSearch('');
	SetLoc(parent.View,'SALES_TblSelect.asp?');
}

function EnterAccCheck()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('AccCheck');
	SetTitle(parent.Title,'����');
	SetSearch('');
	SetLoc(parent.View,'SALES_AccCheck.asp?');
}

function EnterViewEx(Class1No, Class1Name)
{
	parent.FormAll.rows='32,*,22';
	SetHelp('');
	if(Class1No=='122')SetHelp('AccView122');
	if(Class1No=='204')SetHelp('AccView204');
	SetTitle(parent.Title,'�鿴'+Class1Name);
	SetSearch('');
	parent.Search_Value='';
	SetLoc(parent.View,'SALES_AccViewEx.asp?find=&Class1No='+Class1No);
	SetSearch('SALES_AccViewEx.asp?Class1No='+Class1No+'&find=');
}

function EnterModifyProduct()
{
	parent.FormAll.rows='32,*,22';
	SetHelp('ModifyProduct');
	SetTitle(parent.Title,'�޸Ĳ�ƷĿ¼');
	SetSearch('SALES_Product.asp?find=');
	SetLoc(parent.View,'SALES_Product.asp?');
	bsFocus();
}

function EnterDataProcess(url,flag)
{
	parent.FormAll.rows='32,*,0';
	SetHelp('SaleView');
	SetTitle(parent.Title,'�������ݷ���');
	SetSearch('');
	if(url==valueUndefined)
		SetLoc(parent.View,'SALES_SaleSelect.asp?');
	else
	{
		if(flag==valueUndefined||flag==0)SetLoc(parent.View,'SALES_SaleView.asp?search=1'+url);
		else SetLoc(parent.Recv,'SALES_SaleViewEx.asp?search=1'+url);
	}
}

function EnterInStoreProcess(url,flag)
{
	parent.FormAll.rows='32,*,0';
	SetHelp('InStoreView');
	SetTitle(parent.Title,'�ɹ����ݷ���');
	SetSearch('');
	if(url==valueUndefined)
		SetLoc(parent.View,'SALES_InStoreSelect.asp?');
	else
	{
		if(flag==valueUndefined||flag==0)SetLoc(parent.View,'SALES_InStoreView.asp?search=1'+url);
		else SetLoc(parent.Recv,'SALES_InStoreViewEx.asp?search=1'+url);
	}
}

function EnterSTSProcess(url,flag)
{
	parent.FormAll.rows='32,*,0';
	SetHelp('STSView');
	SetTitle(parent.Title,'�������ݷ���');
	SetSearch('');
	if(url==valueUndefined)
		SetLoc(parent.View,'SALES_STSSelect.asp?');
	else
	{
		if(flag==valueUndefined||flag==0)SetLoc(parent.View,'SALES_STSView.asp?search=1'+url);
		else SetLoc(parent.Recv,'SALES_STSViewEx.asp?search=1'+url);
	}
}

function EnterIORProcess()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('IORView');
	SetTitle(parent.Title,'��������ܱ�');
	SetSearch('');
	SetLoc(parent.View,'SALES_IORSelect.asp?');
}

function EnterPSLView(flag)
{
	parent.FormAll.rows='32,*,0';
	SetHelp('PSLView');
	SetTitle(parent.Title,'�鿴��������޾���');
	SetSearch('');
	SetLoc(parent.View,'SALES_PSLView.asp?');
}

function EnterStoreProcess(type,flag,find,total)
{
	parent.FormAll.rows='32,*,22';
	if(total==valueUndefined)tt=1;else tt=0;
	if(find==valueUndefined)SetLoc(parent.View,'SALES_StoreViewSelect.asp?');
	if(type==0){SetSearchEx('SALES_StoreViewEx.asp?find=');idstr='��ҳʽ';if(find!=valueUndefined)SetLoc(parent.Recv,'SALES_StoreViewEx.asp?find='+find);}
	if(type==1){SetSearch('SALES_StoreView.asp?find=');idstr='����ʽ';if(find!=valueUndefined)SetLoc(parent.View,'SALES_StoreView.asp?find='+find);}
	if(type==2){SetSearch('SALES_MultiStoreView.asp?find=');idstr='����ʽ';if(find!=valueUndefined)SetLoc(parent.View,'SALES_MultiStoreView.asp?find='+find+'&flag='+tt);}
		SetTitle(parent.Title,'������ݷ���<span style="font-size: 9pt">��'+idstr+'��</span>&Function=StoreView');
		SetHelp('StoreView');
	bsFocus();
}

function EnterIOProcess()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('IOView');
	SetTitle(parent.Title,'�������ݷ���');
	SetSearch('');
	SetLoc(parent.View,'SALES_IOSelect.asp?');
}

function EnterCustomMan()
{
	parent.FormAll.rows='32,*,22';
	SetHelp('CustomMan');
	SetTitle(parent.Title,'����ͻ���Ϣ');
	SetSearch('SALES_CustomList.asp?find=');
	SetLoc(parent.View,'SALES_CustomList.asp?');
	SetUrlEx('');
}

function EnterSourceMan()
{
	parent.FormAll.rows='32,*,22';
	SetHelp('CustomMan');
	SetTitle(parent.Title,'����Ӧ����Ϣ');
	SetSearch('SALES_SourceList.asp?find=');
	SetLoc(parent.View,'SALES_SourceList.asp?');
	SetUrlEx('');
}

function EnterModifyUser()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('User');
	SetTitle(parent.Title,'�޸��û���Ϣ');
	SetSearch('');
	SetLoc(parent.View,'SALES_User.asp?');
	bsFocus();
}

function EnterModifyUserRight()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('UserRight');
	SetTitle(parent.Title,'�޸��û�Ȩ��');
	SetSearch('');
	SetLoc(parent.View,'SALES_UserRight.asp?');
	bsFocus();
}

function EnterModifyStore()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('StoreMan');
	SetTitle(parent.Title,'�޸Ļ�λ��Ϣ');
	SetSearch('');
	SetLoc(parent.View,'SALES_StoreSelect.asp?');
	bsFocus();
}

function EnterStoreVerify()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('StoreVerify');
	SetTitle(parent.Title,'����̵�');
	SetSearch('');
	SetLoc(parent.View,'SALES_StoreVerify.asp?');
	bsFocus();
}

function EnterLogView()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('LogView');
	SetTitle(parent.Title,'��־����');
	SetSearch('');
	SetLoc(parent.View,'SALES_LogSelect.asp?');
}

function EnterActionTrack()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('ActionTrack');
	SetTitle(parent.Title,'��־����');
	SetSearch('');
	SetLoc(parent.View,'SALES_ActionTrack.asp?');
}

function EnterPersonalize()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('Personalize');
	SetTitle(parent.Title,'��������');
	SetSearch('');
	SetLoc(parent.View,'SALES_Personalize.asp?');
}

function EnterUserList()
{
	parent.FormAll.rows='32,*,0';
	SetHelp('Online');
	SetTitle(parent.Title,'�����û�');
	SetSearch('');
	SetLoc(parent.View,'SALES_UserList.asp?');
}

function EnterVersion()
{
	parent.FormAll.rows='0,*,22';
	SetTitle(parent.Title,' ');
	SetHelp('Tips');
	SetSearch('');
	SetLoc(parent.View,'SALES_Version.asp?');
}

function EnterAbout()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('');
	SetSearch('');
	SetHtmlLoc(parent.View,'SALES_About.htm');
}

function EnterReport()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('report');
	SetSearch('');
	SetHtmlLoc(parent.View,'SALES_Report.htm');
}

function EnterGetting()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('');
	SetSearch('');
	SetHtmlLoc(parent.View,'SALES_Getting.htm');
}

function EnterGuide()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('');
	SetSearch('');
	SetHtmlLoc(parent.View,'SALES_eBMenu.htm');
}

function EnterUserUrl()
{
	SetTitle(parent.Title,'�û�����ҳ��');
	SetSearch('');
	SetLoc(parent.View, 'SALES_UserDefineMenu.asp?');SetHelp('SALES_UserDefineMenu');
}

function EnterCorp()
{
	SetTitle(parent.Title,'������Ϣ');
	SetSearch('');
	SetLoc(parent.View,'SALES_CorpInfo.asp?');SetHelp('SMS_CorpInfo');
}

function EnterSMS(val)
{
	parent.FormAll.rows='32,*,0';
	SetTitle(parent.Title,'�ֻ�����');
	SetSearch('');
	if(val==1){SetLoc(parent.View,'SALES_SendSMS.asp?');SetHelp('SMS_Customers');}
	else{SetLoc(parent.View,'SALES_SendSMS.asp?');SetHelp('SMS_Users');}
}

function EnterMessage(val)
{
	parent.FormAll.rows='32,*,0';
	SetTitle(parent.Title,'���Է���');
	SetSearch('');
	if(val==1){SetLoc(parent.View,'SALES_ViewMessage.asp?');SetHelp('Message1');}
	else{SetLoc(parent.View,'SALES_SendMessage.asp?');SetHelp('Message2');}
}

function EnterBBS()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('BBS');
	SetSearch('');
	SetLoc(parent.View,'BBS/BBS_Entry.asp?');
}

function EnterInfoCenter()
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('INFOCENTER');
	SetSearch('');
	SetLoc(parent.View,'InfoCenter/IC_Entry.asp?');
}

function EnterConf(n)
{
	parent.FormAll.rows='0,*,0';
	SetTitle(parent.Title,' ');
	SetHelp('');
	SetSearch('');
	switch(n)
	{
		case 1:
			SetHtmlLoc(parent.View,'Chat/Main.htm?CONF1');
			break;
		case 2:
			SetHtmlLoc(parent.View,'Chat/Main.htm?CONF2');
			break;
		case 3:
			SetHtmlLoc(parent.View,'Chat/Main.htm?CONF3');
			break;
		default:
			SetHtmlLoc(parent.View,'SALES_Conf.htm');
			break;
	}
}

function EnterEventMonitor()
{
	window.open('SALES_EventMonitor.asp','�¼�����','fullscreen=0,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=0,height=0');
}

function InitLeftMenu()
{
	var eBMenuStyle=parseInt(parent.eBMenuStyle);
	if(isNaN(eBMenuStyle))eBMenuStyle=0;
	switch(eBMenuStyle)
	{
		case 1:	
			return InitLeftMenu1();
		default:
			return InitLeftMenu0();
	}
}

var iMenuCount=0;
function menuitem(item,strfun)
{
	if(strfun.length==0){iMenuCount++;
		return '<tr onclick="doit('+iMenuCount+')"><td bgcolor="'+parent.eB_MenuSepColor+'" style="cursor:hand;border:1px solid '+parent.eB_MenuSepColor+';filter:Alpha(opacity=70)"><font color="'+parent.eB_MenuTextColor1+'" id="t'+iMenuCount+'">��'+item+'</font></td></tr><tr><td bgcolor="'+parent.eB_BgColor1+'"></td></tr>';}
	else return '<tr id="m'+iMenuCount+'" style="display: none"><td bgcolor="'+parent.eB_MenuBgColor+'" OnClick="parent.Run.'+strfun+'" style="border:1px solid '+parent.eB_MenuBgColor+';filter:Alpha(opacity=70)" '+sme+'><font color="'+parent.eB_MenuTextColor+'">��'+item+'</font></td></tr><tr id="m'+iMenuCount+'" style="display: none"><td bgcolor="'+parent.eB_BgColor1+'"></td></tr></span>\n';
}

function InitLeftMenu1()
{
	iMenuCount=0;
	var s='<body BACKGROUND="image/lmbg.jpg" BGPROPERTIES="fixed" bgcolor="'+parent.eB_BgColor1+'" onmouseover="msmove()" onmouseout="msout()"><div align="center"><center>\n';
	s+='<table border="0" cellspacing="0" width="100%"><tr><td height="7"></td><td height="7"></td></tr><tr><td width="3"></td><td>';
	s+='<table border="0" cellspacing="0" cellpadding="1" width="100%">\n';
	
	s+=menuitem('��Ϣ����','')+menuitem('������','EnterBBS()')+menuitem('�ĵ�����','EnterInfoCenter()');
	
	if (rtTestUser('ProductMan',2,0))s+=menuitem('��Ʒ','')+menuitem('�޸�Ŀ¼��Ϣ','EnterModifyProduct()');
	
	s+=menuitem('����','');
	if (rtTestUser('Sale',0,0))s+=menuitem('���ۿ���','EnterSales()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('�����տ�','EnterViewEx(\'122\',\'Ӧ���ʿ�\')');
	if (rtTestUser('SaleView',2,0))s+=menuitem('���۷���','EnterDataProcess()');
	if (rtTestUser('SaleView',1,0))s+=menuitem('�ͻ�����','EnterCustomMan()');
	
	s+=menuitem('�ɹ�','');
	if (rtTestUser('InStore',0,0))s+=menuitem('��⿪��','EnterInStore()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('�ɹ�����','EnterViewEx(\'204\',\'Ӧ���ʿ�\')');
	if (rtTestUser('IOView',4,0))s+=menuitem('�ɹ�����','EnterInStoreProcess()');
	if (rtTestUser('SaleView',64,0))s+=menuitem('��Ӧ�̵���','EnterSourceMan()');
	
	s+=menuitem('�ִ�','');
	if (rtTestUser('StoreToStore',0,0))s+=menuitem('��������','EnterStoreToStore()');
	if (rtTestUser('StoreView',2,0))s+=menuitem('������','EnterStoreProcess(0,1)');
	if (rtTestUser('IOView',2,0))s+=menuitem('��������','EnterSTSProcess()');
	if (rtTestUser('IOView',2,0))s+=menuitem('��������','EnterIOProcess()');
	if (rtTestUser('StoreView',50,0))s+=menuitem('��������ܱ�','EnterIORProcess()');
	if ((rtTestUser('StoreView',33,0)&&rtTestUser('UserDefine',1,0))||(rtTestUser('StoreView',36,0)&&rtTestUser('InStore',8,0)))s+=menuitem('����̵�','EnterStoreVerify()');
	if (rtTestUser('StoreMan',0,0))s+=menuitem('�޸Ļ�λ��Ϣ','EnterModifyStore()');
	
	if (rtTestUser('PayMoney',0,0)||rtTestUser('MoneyView',2,0)||rtTestUser('MoneyView',16,0))s+=menuitem('�������','');
	if (rtTestUser('PayMoney',0,0))s+=menuitem('��дƾ֤','EnterCheckIn()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('�鿴��ҳ','EnterAccount()');
	if (rtTestUser('MoneyView',16,0))s+=menuitem('����','EnterAccCheck()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('���񱨱�','EnterTblSel()');
	
	if (rtTestUser('UserMan',0,0))s+=menuitem('Ա������','');
	if (rtTestUser('UserMan',1,0)||rtTestUser('UserMan',2,0)||rtTestUser('UserMan',4,0))s+=menuitem('�޸��û���Ϣ','EnterModifyUser()');
	if (rtTestUser('UserMan',8,0))s+=menuitem('�޸��û�Ȩ��','EnterModifyUserRight()');
	
	s+=menuitem('��������','');
	if (rtTestUser('UserDefine',0,0))s+=menuitem('�Զ��嵥','EnterUserDefine()');
	s+=menuitem('������ʾ','EnterVersion()');
	s+=menuitem('��������','EnterReport()');
	s+=menuitem('��������','EnterPersonalize()');
	s+=menuitem('�����û�','EnterUserList()');
	if (rtTestUser('UserMan',16,0))s+=menuitem('������־','EnterLogView()');
	s+=menuitem('������Ϣ','EnterMessage(0)');
	s+=menuitem('�ն���Ϣ','EnterMessage(1)');
	if (rtTestUser('DataProc',8,0)) s+=menuitem('�ֻ�����','EnterSMS(0)');
	if (rtTestUser('OtherMan',1,0))s+=menuitem('������Ϣ','EnterCorp()');
	if (rtTestUser('OtherMan',2,0))s+=menuitem('�û��˵�','EnterUserUrl()');

	s+=menuitem('������','')+menuitem('�����ң�','EnterConf(1)')+menuitem('�����ң�','EnterConf(2)')+menuitem('�����ң�','EnterConf(3)')+menuitem('��ȫ������','EnterConf(0)');
	s+=menuitem('���ӹ���','');
	if (rtTestUser('UserMan',16,0))s+=menuitem('�¼�������','EnterEventMonitor()');
	
	//s+=menuitem('�汾˵��','EnterAbout()');
	
	s+='</table></td><td width="0"></td></tr></table></body>';
	return s;
}

function InitLeftMenu0()
{
	iMenuCount=0;
	var s='<body BACKGROUND="image/lmbg.jpg" BGPROPERTIES="fixed" bgcolor="'+parent.eB_BgColor1+'" onmouseover="msmove()" onmouseout="msout()"><div align="center"><center>\n';
	s+='<table border="0" cellspacing="0" width="100%"><tr><td height="7"></td><td height="7"></td></tr><tr><td width="3"></td><td>';
	s+='<table border="0" cellspacing="0" cellpadding="1" width="100%">\n';
	s+=menuitem('��Ϣ����','')+menuitem('������','EnterBBS()')+menuitem('�ĵ�����','EnterInfoCenter()');
	if (rtTestUser('Sale',0,0)||rtTestUser('InStore',0,0)||rtTestUser('StoreToStore', 0, 0))s+=menuitem('ҵ����','');
	if (rtTestUser('Sale',0,0))s+=menuitem('�����۵�','EnterSales()');
	if (rtTestUser('InStore',0,0))s+=menuitem('����ⵥ','EnterInStore()');
	if (rtTestUser('StoreToStore',0,0))s+=menuitem('�µ�����','EnterStoreToStore()');
	if (rtTestUser('UserDefine',0,0))s+=menuitem('�Զ��嵥','EnterUserDefine()');
	if (rtTestUser('PayMoney',0,0)||rtTestUser('MoneyView',2,0)||rtTestUser('MoneyView',16,0))s+=menuitem('�������','');
	if (rtTestUser('PayMoney',0,0))s+=menuitem('��дƾ֤','EnterCheckIn()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('�鿴��ҳ','EnterAccount()');
	if (rtTestUser('MoneyView',16,0))s+=menuitem('����','EnterAccCheck()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('���񱨱�','EnterTblSel()');
	if (rtTestUser('MoneyView',2,0))s+=menuitem('Ӧ���ʿ�','EnterViewEx(\'122\',\'Ӧ���ʿ�\')')+menuitem('Ӧ���ʿ�','EnterViewEx(\'204\',\'Ӧ���ʿ�\')');
	if(rtTestUser('ProductMan',2,0))s+=menuitem('��ƷĿ¼','')+menuitem('�޸�Ŀ¼��Ϣ','EnterModifyProduct()');
	s+=menuitem('���ݷ���','');
	s+=menuitem('��������','EnterReport()');
	if (rtTestUser('StoreView',2,0))s+=menuitem('������','EnterStoreProcess(0,1)');
	if (rtTestUser('SaleView',2,0))s+=menuitem('���۷���','EnterDataProcess()');
	if (rtTestUser('IOView',4,0))s+=menuitem('�ɹ�����','EnterInStoreProcess()');
	if (rtTestUser('IOView',2,0))s+=menuitem('��������','EnterSTSProcess()');
	if (rtTestUser('IOView',2,0))s+=menuitem('��������','EnterIOProcess()');
	if (rtTestUser('StoreView',50,0))s+=menuitem('��������ܱ�','EnterIORProcess()');
	if (rtTestUser('SaleView',1,0)||rtTestUser('SaleView',4,0)||rtTestUser('SaleView',64,0)||rtTestUser('SaleView',128,0))s+=menuitem('���̹���','');
	if (rtTestUser('SaleView',1,0))s+=menuitem('�ͻ���Ϣ','EnterCustomMan()');
	if (rtTestUser('SaleView',64,0))s+=menuitem('��Ӧ����Ϣ','EnterSourceMan()');
	if (rtTestUser('UserMan',0,0))s+=menuitem('�û�����','');
	if (rtTestUser('UserMan',1,0)||rtTestUser('UserMan',2,0)||rtTestUser('UserMan',4,0))s+=menuitem('�޸��û���Ϣ','EnterModifyUser()');
	if (rtTestUser('UserMan',8,0))s+=menuitem('�޸��û�Ȩ��','EnterModifyUserRight()');
	if (rtTestUser('StoreMan',0,0))s+=menuitem('��λ����','')+menuitem('�޸Ļ�λ��Ϣ','EnterModifyStore()');
	if ((rtTestUser('StoreView',33,0)&&rtTestUser('UserDefine',1,0))||(rtTestUser('StoreView',36,0)&&rtTestUser('InStore',8,0)))s+=menuitem('����̵�','')+menuitem('����̵�','EnterStoreVerify()');
	if (rtTestUser('UserMan',16,0))s+=menuitem('��־����','')+menuitem('������־����','EnterLogView()');
	s+=menuitem('ϵͳѡ��','')+menuitem('��������','EnterPersonalize()')+menuitem('�����û�','EnterUserList()')+menuitem('������ʾ','EnterVersion()');
	if (rtTestUser('OtherMan',1,0))s+=menuitem('������Ϣ','EnterCorp()');
	if (rtTestUser('OtherMan',2,0))s+=menuitem('�û��˵�','EnterUserUrl()');
	s+=menuitem('���Թ���','')+menuitem('��������','EnterMessage(0)')+menuitem('�鿴����','EnterMessage(1)');
	if (rtTestUser('DataProc',8,0))s+=menuitem('�ֻ�����','EnterSMS(0)');
	if (rtTestUser('OtherMan',1,0))s+=menuitem('������Ϣ','EnterCorp()');
	s+=menuitem('������','')+menuitem('�����ң�','EnterConf(1)')+menuitem('�����ң�','EnterConf(2)')+menuitem('�����ң�','EnterConf(3)')+menuitem('��ȫ������','EnterConf(0)');
	s+=menuitem('���ӹ���','');
	if (rtTestUser('UserMan',16,0))s+=menuitem('�¼�������','EnterEventMonitor()');
	//s+=menuitem('�汾˵��','EnterAbout()');
	s+='</table></td><td width="0"></td></tr></table></body>';
	return s;
}

function LoadSale(test)
{
	if (parent.produce_ready==0){
		alert('����������');
		return;
		}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������棡')) return;}
	parent.produce_ready=0;
	buy_enable=0
	SetTitle(parent.Title,'�����۵�');
	parent.FormAll.rows='32,*,0'
	SetLoc(parent.View,'SALES_ListIndex.asp?ID=Sales'+(isNaN(parseInt(test))?'':'&find=*'));
}

///////////////////////
function SendSale(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (buy_enable==0)return(alert('����û���������۵���'));
	if (igoods<1)return(alert('����û��ѡ���Ʒ��'));
	var scheck =checkgoods();
	if (scheck.length >0) return(alert(scheck));
	
	parent.produce_ready=0;
	tarobj = parent.Send;
	buy_enable=0;
	tarobj.document.close();
	tarobj.document.open();
	tarobj.document.writeln('<html><head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"></head>');
	tarobj.document.writeln('<body><form method="POST" action="SALES_PutSales.asp?mt='+(parent.Title.document.Title.moneyType.checked?1:0)+'&custom='+escape(parent.Title.document.Title.Custom.value)+'&checktype='+escape(parent.Title.document.Title.CheckType.options[parent.Title.document.Title.CheckType.selectedIndex].text)+'" name="check">');
	//�����û�����λ
	tarobj.document.writeln('<input type="hidden" name="user1" value="'+escape(parent.Title.document.Title.maker.options[parent.Title.document.Title.maker.selectedIndex].text)+'">');
	tarobj.document.writeln('<input type="hidden" name="accdate" value="'+parent.Title.document.Title.pz_year.value+'-'+parent.Title.document.Title.pz_month.value+'-'+parent.Title.document.Title.pz_day.value+'">');
	tarobj.document.writeln('<input type="hidden" name="saleid" value="'+parent.Title.document.Title.SalesID.value+'">');
	tarobj.document.writeln('<input type="hidden" name="memo" value="'+escape(parent.Title.document.Title.memo.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="store" value="'+parent.Title.document.Title.Store.value+'">');
	//������Ʒ�б�
	WriteProductList(tarobj);
	tarobj.document.writeln('</form></body></html>');
	tarobj.document.close();
	tarobj.document.check.submit();
}

function Sale(){
	if (parent.produce_ready==0){alert('����������');return;}
	if (parent.Title.document.Title.SalesID.value=='NULL'||parent.Title.document.Title.SalesID.length==0){alert('����û�б������۵���');return;}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������沢��ˣ�����ȡ���������أ�')) return;}
	parent.produce_ready=0;SetLoc(parent.Send,'SALES_SaleOutStore.asp?SerialNo='+parent.Title.document.Title.SalesID.value);
}

function SaleUndo(){
	if (parent.produce_ready==0){alert('����������');return;}
	if (parent.Title.document.Title.SalesID.value=='NULL'||parent.Title.document.Title.SalesID.length==0)alert('��ѡ�񱣴�������۵���');
	else{parent.produce_ready=0;SetLoc(parent.Send,'SALES_SaleOutStore.asp?Undo=1&SerialNo='+parent.Title.document.Title.SalesID.value);}
}

function LoadInStore(test){
	if (parent.produce_ready==0) return(alert('����������'));
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������棡')) return;}
	parent.produce_ready=0;
	buy_enable=0
	SetTitle(parent.Title,'����ⵥ');
	parent.FormAll.rows='32,*,0'
	SetLoc(parent.View,'SALES_ListIndex.asp?ID=InStore'+(isNaN(parseInt(test))?'':'&find=*'));
}

function SendInStore(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (buy_enable==0)return(alert('����û��������ⵥ��'));
	if (igoods<1)return(alert('����û��ѡ���Ʒ��'));
	var scheck =checkgoods();
	if (scheck.length >0) return(alert(scheck));
	
	parent.produce_ready=0;
	tarobj = parent.Send;
	buy_enable=0;
	tarobj.document.close();
	tarobj.document.open();
	tarobj.document.writeln('<html><head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"></head>');
	tarobj.document.writeln('<body><form method="POST" action="SALES_PutInStore.asp?source='+escape(parent.Title.document.Title.Source.value)+'&checktype='+escape(parent.Title.document.Title.CheckType.options[parent.Title.document.Title.CheckType.selectedIndex].text)+'" name="check">');
	//�����û�����λ
	tarobj.document.writeln('<input type="hidden" name="user1" value="'+escape(parent.Title.document.Title.maker.options[parent.Title.document.Title.maker.selectedIndex].text)+'">');
	tarobj.document.writeln('<input type="hidden" name="accdate" value="'+parent.Title.document.Title.pz_year.value+'-'+parent.Title.document.Title.pz_month.value+'-'+parent.Title.document.Title.pz_day.value+'">');
	tarobj.document.writeln('<input type="hidden" name="instoreid" value="'+parent.Title.document.Title.InStoreID.value+'">');
	tarobj.document.writeln('<input type="hidden" name="memo" value="'+escape(parent.Title.document.Title.memo.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="store" value="'+parent.Title.document.Title.Store.value+'">');
	//������Ʒ�б�
	WriteProductList(tarobj);
	tarobj.document.writeln('</form></body></html>');
	tarobj.document.close();
	tarobj.document.check.submit();
}

function InStore(){
	if (parent.produce_ready==0){alert('����������');return;}
	if (parent.Title.document.Title.InStoreID.value=='NULL'||parent.Title.document.Title.InStoreID.length==0){alert('����û�б�����ⵥ��'); return;}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������沢��ˣ�����ȡ���������أ�')) return;}
	parent.produce_ready=0;
	SetLoc(parent.Send,'SALES_InStore.asp?SerialNo='+parent.Title.document.Title.InStoreID.value);
}

function InStoreUndo(){
	if (parent.produce_ready==0){
		alert('����������');return;
		}
	if (parent.Title.document.Title.InStoreID.value=='NULL'||parent.Title.document.Title.InStoreID.length==0)alert('��ѡ�񱣴������ⵥ��');
	else{parent.produce_ready=0;SetLoc(parent.Send,'SALES_InStore.asp?Undo=1&SerialNo='+parent.Title.document.Title.InStoreID.value);}
}

function LoadStoreToStore(test){
	if (parent.produce_ready==0){
		alert('����������');return;}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������棡')) return;}
	parent.produce_ready=0;
	buy_enable=0
	SetTitle(parent.Title,'�򿪵�����');
	parent.FormAll.rows='32,*,0'
	SetLoc(parent.View,'SALES_ListIndex.asp?ID=StoreToStore'+(isNaN(parseInt(test))?'':'&find=*'));
}

function SendStoreToStore(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (buy_enable==0)return(alert('����û�������������'));
	if (igoods<1)return(alert('����û��ѡ���Ʒ��'))
	
	parent.produce_ready=0;
	tarobj = parent.Send;
	buy_enable=0;
	tarobj.document.close();
	tarobj.document.open();
	tarobj.document.writeln('<html><head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"></head>');
	tarobj.document.writeln('<body><form method="POST" action="SALES_PutStoreToStore.asp?memo='+escape(parent.Title.document.Title.memo.value)+'" name="check">');
	//�����û�����λ
	tarobj.document.writeln('<input type="hidden" name="accdate" value="'+parent.Title.document.Title.pz_year.value+'-'+parent.Title.document.Title.pz_month.value+'-'+parent.Title.document.Title.pz_day.value+'">');
	tarobj.document.writeln('<input type="hidden" name="storetostoreid" value="'+parent.Title.document.Title.StoreToStoreID.value+'">');
	tarobj.document.writeln('<input type="hidden" name="storesource" value="'+parent.Title.document.Title.StoreSource.value+'">');
	tarobj.document.writeln('<input type="hidden" name="storetarget" value="'+parent.Title.document.Title.StoreTarget.value+'">');
	//������Ʒ�б�
	WriteProductList(tarobj);
	tarobj.document.writeln('</form></body></html>');
	tarobj.document.close();
	tarobj.document.check.submit();
}

function StoreToStore(){
	if (parent.produce_ready==0){alert('����������');return;}
	if (parent.Title.document.Title.StoreToStoreID.value=='NULL'||parent.Title.document.Title.StoreToStoreID.length==0){alert('����û�б����������'); return;}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������沢��ˣ�����ȡ���������أ�')) return;}
	parent.produce_ready=0;SetLoc(parent.Send,'SALES_StoreToStore.asp?SerialNo='+parent.Title.document.Title.StoreToStoreID.value);
}

function StoreToStoreUndo(){
	if (parent.produce_ready==0){
		alert('����������');return;}
	if (parent.Title.document.Title.StoreToStoreID.value=='NULL'||parent.Title.document.Title.StoreToStoreID.length==0)alert('��ѡ�񱣴���ĵ�������');
	else{parent.produce_ready=0;SetLoc(parent.Send,'SALES_StoreToStore.asp?Undo=1&SerialNo='+parent.Title.document.Title.StoreToStoreID.value);}
}

function LoadUserDefine(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������棡')) return;}
	parent.produce_ready=0;
	buy_enable=0
	SetTitle(parent.Title,'���Զ��嵥');
	parent.FormAll.rows='32,*,0'
	SetLoc(parent.View,'SALES_ListIndex.asp?ID=UserDefine');
}

function SendUserDefine()
{
	if (parent.produce_ready==0)return(alert('����������'));
	if (buy_enable==0)return(alert('����û�����룡'));
	if (igoods<1)return(alert('����û��ѡ��'));
	
	parent.produce_ready=0;
	tarobj = parent.Send;
	buy_enable=0;
	tarobj.document.close();
	tarobj.document.open();
	tarobj.document.writeln('<html><head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"></head>');
	tarobj.document.writeln('<body><form method="POST" action="SALES_PutUserDefine.asp" name="check">');
	
	tarobj.document.writeln('<input type="hidden" name="udID" value="'+parent.Title.document.Title.udID.value+'">');
	tarobj.document.writeln('<input type="hidden" name="accdate" value="'+parent.Title.document.Title.pz_year.value+'-'+parent.Title.document.Title.pz_month.value+'-'+parent.Title.document.Title.pz_day.value+'">');
	tarobj.document.writeln('<input type="hidden" name="udTitle" value="'+escape(parent.Title.document.Title.udTitle.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udName1" value="'+escape(parent.Title.document.Title.udName1.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udForm1" value="'+escape(parent.Title.document.Title.udForm1.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udName2" value="'+escape(parent.Title.document.Title.udName2.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udForm2" value="'+escape(parent.Title.document.Title.udForm2.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udName3" value="'+escape(parent.Title.document.Title.udName3.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udForm3" value="'+escape(parent.Title.document.Title.udForm3.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udName4" value="'+escape(parent.Title.document.Title.udName4.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="udForm4" value="'+escape(parent.Title.document.Title.udForm4.value)+'">');
	
	WriteProductList(tarobj);
	tarobj.document.writeln('</form></body></html>');
	tarobj.document.close();
	tarobj.document.check.submit();
}

function LoadPayMoney(test){
	if (parent.produce_ready==0)return(alert('����������'));
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������棡')) return;}
	parent.produce_ready=0;
	buy_enable=0
	SetTitle(parent.Title,'��ƾ֤');
	parent.FormAll.rows='32,*,0'
	SetLoc(parent.View,'SALES_ListIndex.asp?ID=CheckIn'+(isNaN(parseInt(test))?'':'&find=*'));
}

function SendPayMoney(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (buy_enable==0)return(alert('����û�����뵥�ݣ�'));
	if (imoney<1)return(alert('����û��ѡ��Ʊ�ݣ�'));
	if (parent.Title.document.Title.memo.value.length<1)return(alert('��������дժҪ��'));
	if (!CheckMoneyOK())return(alert('����ƾ֤�Ľ跽�ʹ�������������'));
	
	parent.produce_ready=0;
	tarobj = parent.Send;
	buy_enable=0;
	tarobj.document.close();
	tarobj.document.open();
	tarobj.document.writeln('<html><head><meta http-equiv="Content-Type" content="text/html; charset=gb2312"></head>');
	tarobj.document.writeln('<body><form method="POST" action="SALES_PutMoney.asp?checktype='+escape(parent.Title.document.Title.CheckType.options[parent.Title.document.Title.CheckType.selectedIndex].text)+'" name="check">');
	
	tarobj.document.writeln('<input type="hidden" name="accdate" value="'+parent.Title.document.Title.pz_year.value+'-'+parent.Title.document.Title.pz_month.value+'-'+parent.Title.document.Title.pz_day.value+'">');
	tarobj.document.writeln('<input type="hidden" name="memo" value="'+escape(parent.Title.document.Title.memo.value)+'">');
	tarobj.document.writeln('<input type="hidden" name="accid" value="'+parent.Title.document.Title.AccID.value+'">');
	
	WriteMoneyList(tarobj);
	tarobj.document.writeln('</form></body></html>');
	tarobj.document.close();
	tarobj.document.check.submit();
}

function PayMoney(){
	if (parent.produce_ready==0)return(alert('����������'));
	if (parent.Title.document.Title.AccID.value=='NULL'||parent.Title.document.Title.AccID.length==0){alert('��ѡ�񱣴���ĵ��ݣ�'); return;}
	if (unsave>0){if (!confirm('�������޸ģ�����ȷ�ϡ����������沢��ˣ�����ȡ���������أ�')) return;}
		parent.produce_ready=0;SetLoc(parent.Send,'SALES_CheckMoney.asp?ID=CheckIn&SerialNo='+parent.Title.document.Title.AccID.value);
	}
	function PayMoneyUndo(){
	if (parent.produce_ready==0){
		alert('����������');return;}
	if (parent.Title.document.Title.AccID.value=='NULL'||parent.Title.document.Title.AccID.length==0)alert('��ѡ�񱣴���ĵ��ݣ�');
	else{parent.produce_ready=0;SetLoc(parent.Send,'SALES_CheckMoney.asp?Undo=1&ID=CheckIn&SerialNo='+parent.Title.document.Title.AccID.value);}
}

function pmenuitemnew(item,strfun){
	if (strfun=="Sale") alert("4. sendsale="+"'+(arguments.length>2?'':'parent.Run.')+strfun+'");
	if (item.length==0)return '<td align="center" bgcolor="'+parent.eB_MenuBgColor+'" style="font-size: 9pt;border:1px solid '+parent.eB_MenuBgColor+'"><font color="'+parent.eB_MenuTextColor+'">����</font></td>\n';
else return '<td align="center" bgcolor="'+parent.eB_MenuBgColor+'" style="font-size: 9pt;border:1px solid '+parent.eB_MenuBgColor+'" '+sme+' OnClick="'+(arguments.length>2?'':'parent.Run.')+strfun+'"><font color="'+parent.eB_MenuTextColor+'">'+item+'</font></td>\n';
}

function SetProduceNew(id) //Sale,InStore,StoreToStore,PayMoney,UserDefine
{
	var s='';
	s+='<table border="0" cellspacing="1" width="162" bgcolor="'+parent.eB_BgColor1+'"><tr>';
	if (id=='UserDefine'){
		if (rtTestUser(id,2,0))s+=pmenuitemnew('��','Load'+id+'()');else s+=pmenuitemnew('','');
		if (rtTestUser(id,1,0)||rtTestUser(id,4,0))s+=pmenuitemnew('����','Send'+id+'()');else s+=pmenuitemnew('','');
		if (rtTestUser(id,2,0))s+=pmenuitemnew('��ӡ','MyPrint()',0);else s+=pmenuitemnew('','');
		s+=pmenuitemnew('','');s+=pmenuitemnew('','');}
	else{
		if (rtTestUser(id,2,0))s+=pmenuitemnew('��','Load'+id+'()');else s+=pmenuitemnew('','');
		if (rtTestUser(id,1,0)||rtTestUser(id,4,0))s+=pmenuitemnew('����','Send'+id+'()');else s+=pmenuitemnew('','');
		if (rtTestUser(id,2,0))s+=pmenuitemnew('��ӡ','MyPrint()',0);else s+=pmenuitemnew('','');
		if (rtTestUser(id,8,0))s+=pmenuitemnew('���',id+'()');else s+=pmenuitemnew('','');
		if (rtTestUser(id,16,0))s+=pmenuitemnew('����',id+'Undo()');else s+=pmenuitemnew('','');}
	s+='</tr></table></center></body>';
	return s;
}

function SetStoreNew(){
	var s='';
	s+='<table border="0" cellspacing="1" width="150" bgcolor="'+parent.eB_BgColor1+'"><tr>';
	if (rtTestUser('StoreView',2,0)){
		s+=pmenuitemnew('��ҳʽ','EnterStoreProcess(0,0)');
		s+=pmenuitemnew('����ʽ','EnterStoreProcess(1,0)');
		s+=pmenuitemnew('����ʽ','EnterStoreProcess(2,0)');}
	s+='</tr></table>';
	return s;
}

var maxgoods=2048,goodslib=new Array(),igoods=0,iswitch=0,curpos=0,prepage=iViewCols,snno='',buy_enable=0,unsave=0,dog1=0,interleave=10000,al_timer=0,maxmoney=2048,moneylib=new Array(),imoney=0,
_funlist=new Array(),cVersion=0;
var valueUndefined,htmlVersion=parent.htmlVersion,sme=' onmouseover="eB_onMouseOver(this)" onmousedown="eB_onMouseDown(this)" onmouseup="eB_onMouseUp(this)" onmouseout="eB_onMouseOut(this)"';

//********************************************************************************************
function addfunlist(szName, szFun){_funlist[_funlist.length]=szName;_funlist[_funlist.length]=szFun;}

function InitFunList(){
	//addfunlist('��ӭ','EnterGetting()');
	addfunlist('����','EnterGuide()');
	addfunlist('������','EnterBBS()');
	addfunlist('�ĵ�����','EnterInfoCenter()');
	addfunlist('������ʾ','EnterVersion()');
	addfunlist('��������','EnterReport()');
	if (rtTestUser('ProductMan',0,0))addfunlist('�޸�Ŀ¼��Ϣ','EnterModifyProduct()');
	if (rtTestUser('Sale',0,0))addfunlist('���ۿ���','EnterSales()');
	if (rtTestUser('MoneyView',2,0))addfunlist('�����տ�','EnterViewEx(\'122\',\'Ӧ���ʿ�\')');
	if (rtTestUser('SaleView',2,0))addfunlist('���۷���','EnterDataProcess()');
	if (rtTestUser('SaleView',1,0))addfunlist('�ͻ�����','EnterCustomMan()');
	if (rtTestUser('InStore',0,0))addfunlist('��⿪��','EnterInStore()');
	if (rtTestUser('MoneyView',2,0))addfunlist('�ɹ�����','EnterViewEx(\'204\',\'Ӧ���ʿ�\')');
	if (rtTestUser('IOView',4,0))addfunlist('�ɹ�����','EnterInStoreProcess()');
	if (rtTestUser('SaleView',64,0))addfunlist('��Ӧ�̵���','EnterCustomMan()');
	if (rtTestUser('StoreToStore',0,0))addfunlist('��������','EnterStoreToStore()');
	if (rtTestUser('StoreView',2,0))addfunlist('������','EnterStoreProcess(0,1)');
	if (rtTestUser('IOView',2,0))addfunlist('��������','EnterSTSProcess()');
	if (rtTestUser('IOView',2,0))addfunlist('��������','EnterIOProcess()');
	if (rtTestUser('StoreView',50,0))addfunlist('��������ܱ�','EnterIORProcess()');
	if ((rtTestUser('StoreView',33,0)&&rtTestUser('UserDefine',1,0))||(rtTestUser('StoreView',36,0)&&rtTestUser('InStore',8,0)))addfunlist('����̵�','EnterStoreVerify()');
	if (rtTestUser('StoreMan',0,0))addfunlist('�޸Ļ�λ��Ϣ','EnterModifyStore()');
	if (rtTestUser('PayMoney',0,0))addfunlist('��дƾ֤','EnterCheckIn()');
	if (rtTestUser('MoneyView',2,0))addfunlist('�鿴��ҳ','EnterAccount()');
	if (rtTestUser('MoneyView',16,0))addfunlist('����','EnterAccCheck()');
	if (rtTestUser('UserMan',1,0)||rtTestUser('UserMan',2,0)||rtTestUser('UserMan',4,0))addfunlist('�޸��û���Ϣ','EnterModifyUser()');
	if (rtTestUser('UserMan',8,0))addfunlist('�޸��û�Ȩ��','EnterModifyUserRight()');
	if (rtTestUser('UserDefine',0,0))addfunlist('�Զ��嵥','EnterUserDefine()');
	addfunlist('��������','EnterPersonalize()');
	addfunlist('�����û�','EnterUserList()');
	if (rtTestUser('UserMan',16,0))addfunlist('������־','EnterLogView()');
	addfunlist('������Ϣ','EnterMessage(0)');
	addfunlist('�ն���Ϣ','EnterMessage(1)');
	if (rtTestUser('DataProc',8,0))addfunlist('�ֻ�����','EnterSMS(0)');
	if (rtTestUser('OtherMan',1,0))addfunlist('������Ϣ','EnterCorp()');
	if (rtTestUser('OtherMan',2,0))addfunlist('�û��˵�','EnterUserUrl()');
}

function EnterHomePage(){
	for(var i=0;i<_funlist.length;i+=2)if(_funlist[i]==iHomePage){eval('parent.Run.'+_funlist[i+1]);return;}
	iHomePage=addfunlist[0];
	eval('parent.Run.'+_funlist[1]);
}

function InitClient(){
	if (!parent.BottomLoadOK) return setTimeout('InitClient()',500);
	SetLoc(parent.AutoRecv,'SALES_AutoRecv.asp?');
	SetHtmlLoc(parent.Left,'SALES_LeftMenu.htm');
	autotimer();
	InitFunList();
	EnterHomePage();
}

function GetCanDisplayString(str){
	var outstr='',ico=0,i=0;
	if(str.length<7)return str;
	while(1){
		if(str.charCodeAt(i)>255)ico+=2;else ico++;
		if(ico>13)return outstr+'...';
		outstr+=str.charAt(i);
		i++;
		}
	return str;
}

function UpdateView(){SetHtmlLoc(parent.View,'SALES_UpdateView.htm');}
function GetUpdateView(){
	var ix=0;
	var colorstr=parent.eB_ListColor1;
	var colorfont=parent.eB_ListTextColor1;
	s='<body bgcolor="'+parent.eB_PageBgColor+'"><div align="center"><center>';
	s+='<table border="0" width="100%" cellpadding="1" cellspacing="1"><tr bgcolor="'+parent.eB_ListColor+'">';
	if (igoods<=prepage) curpos = 0;
	if (curpos+prepage>igoods) curpos = parseInt(igoods/prepage)*prepage;
	if (curpos==igoods) curpos = igoods-prepage;
	if (curpos<0) curpos = 0;
	if (curpos>0) s+='<td width="10"><a href="JavaScript:parent.Run.donewpage(0)">��</a></td>';
	else s+='<td width="10"><font color="'+parent.eB_ListColor+'">..</td>';

	s+='<td width="20"><font color="'+parent.eB_ListTextColor+'">��</td>';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">���</td>';
	s+='<td width="32%" align="center"><font color="'+parent.eB_ListTextColor+'">��Ʒ</td>';
	s+='<td width="10%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
	s+='<td width="13%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td>';
	s+='<td width="13%" align="center"><font color="'+parent.eB_ListTextColor+'">���</td>';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">��ע</td></tr>';
	sum=0;
	sumNumber=0;
	for (i=0;i<igoods;i++){
		sum+=IFNUM(fnumber4(goodslib[i].number*goodslib[i].goodprice/10000));
		sumNumber+=goodslib[i].number;
		if (i<curpos) continue;
		if (i>=curpos+prepage) continue;
		if(ix%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
		else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
		ix++;
		s+='<tr nowrap bgcolor="'+colorstr+'" '+sme+'>';
		s+='<td align="center" OnClick="parent.Run.delitem('+i+')"><font color="#0000FF">��</font></td>';
		s+='<SPAN OnClick="parent.Run.modifyitem('+i+')">';
		s+='<td align="right"><font color="#FF0000">'+(i+1)+'</font></td>';
		s+='<td nowrap><font color="'+colorfont+'">'+goodslib[i].no+'</td>';
		s+='<td nowrap><font color="'+colorfont+'">'+goodslib[i].name+'</td>';
		s+='<td nowrap align="right"><font color="'+colorfont+'">'+fnumber4(goodslib[i].number)+'</td>';
		s+='<td nowrap align="right"><font color="'+colorfont+'">'+'��'+fnumber4(goodslib[i].goodprice)+'</td>';
		s+='<td nowrap align="right"><font color="'+colorfont+'">'+'��'+fnumber42(goodslib[i].number*goodslib[i].goodprice/10000)+'</td>';
		s+='<td nowrap align="center"><font color="'+colorfont+'">'+GetCanDisplayString(goodslib[i].memo)+'</td></SPAN></tr>';
		}
	if(ix%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
	else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
	s+='<tr><td colspan="8" bgcolor="#FF0000"></td></tr>';
	if (i>curpos+prepage) s+='<tr bgcolor="'+colorstr+'"><td><font color="#800040"><a href="JavaScript:parent.Run.donewpage(1)">��</a></font></td>';
	else s+='<tr bgcolor="'+colorstr+'"><td><font color="#800040">��</font></td>';
	s+='<td align="center">��</td>';
	s+='<td><font color="#FF0000">�ϼ�</font></td>';
	s+='<td>��</td>';
	s+='<td align="right">'+fnumber4(sumNumber)+'</td><td>��</td>';
	s+='<td align="right">'+'��'+fnumber(sum)+'</td>';
	s+='<td>��</td></tr><form OnSubmit="return parent.Run.gopage(pageno.value)">';
	s+='<tr><td>��</td><td colspan="6"><a href="javascript:parent.Run.delallx()">���</a>&nbsp;&nbsp;';
	if (curpos>0)	s+='<a href="JavaScript:parent.Run.donewpage(0)">��ҳ</a>��';
	else	s+='��ҳ��';
	if (i>curpos+prepage)	s+='<a href="JavaScript:parent.Run.donewpage(1)">��ҳ</a>��';
	else	s+='��ҳ��';
	s+='��'+parseInt((igoods+prepage-1)/prepage)+'ҳ����<input type="text" size="3" name="pageno" value="'+parseInt(curpos/prepage+1)+'" OnFocus="select()">ҳ��<a href="JavaScript:parent.Run.copyView()">���Ƶ�������</a>��<a href="JavaScript:parent.Run.pasteView()">ճ��</a></td></tr></form></table></body></html>';
	return s;
}

function pasteView(){
	var a, i, s, x, n;
	
	s = window.clipboardData.getData("Text");
	a = s.split("\r\n");
	n = 0;
	
	for(i=1;i<a.length;i++){
		x = a[i].split("\t");
		if (x.length==6){
			_additem(csvdec(x[0]),csvdec(x[1]),x[3],x[3],x[2],csvdec(x[5]));
			n++;
		}
	}
	
	alert('ճ��'+n+'�����ݳɹ���');

	unsave=1;
	delay();
}

function copyView(){
	var a = new Array(), i;
	
	a[0] = "���\t��Ʒ\t����\t����\t���\t��ע";
	
	for (i=0;i<igoods;i++)
		a[a.length] = csvenc(goodslib[i].no)+"\t"+csvenc(goodslib[i].name)+"\t"+fnumber4(goodslib[i].number)+"\t"+fnumber4(goodslib[i].goodprice)+"\t"+fnumber42(goodslib[i].number*goodslib[i].goodprice/10000)+"\t"+csvenc(goodslib[i].memo);
	
	if (window.clipboardData.setData("Text", a.join("\r\n")))
		alert('����'+i+'�����ݳɹ���');
	else
		alert('��������ʧ�ܣ�');
}


//MoneyView
function Moneydelay(){UpdateMoneyView();bsFocus();}
function Moneymodifyitempn(itemno,memo){
	if (itemno>=imoney||itemno<0) return;
	if(memo==undefined) moneylib[itemno].memo='';
	else moneylib[itemno].memo=memo;
	unsave=1;
	setTimeout('Moneydelay();', 100);
	return (false);
}

function Moneymodifyitem(i){
	if (i>=imoney||i<0)	return;
	iModifyView=i;
	parent.View.location.replace('MoneyModifyItem.htm');
}

function GetMoneyModifyItem(){
	var s='<body bgcolor="'+parent.eB_PageBgColor+'"><div align="center"><center>';
	s+='<table border="0" width="100%" cellpadding="1" cellspacing="1" style="font-size: 10.5pt">';
	s+='<form name="modify" OnSubmit="return parent.Run.Moneymodifyitempn('+iModifyView+',document.modify.memo.value)">';
	s+='<tr><td bgcolor="'+parent.eB_ListColor1+'">ժҪ��<input type="text" size="79" name="memo" value="'+moneylib[iModifyView].memo+'" OnFocus="select()"></td>';
	s+='<td bgcolor="'+parent.eB_ListColor1+'" align="center"><input type="submit" tabindex=-1 value="ȷ��">��<input name="cancel" type="button" value="ȡ��" OnClick="parent.Run.UpdateMoneyView();parent.Run.bsFocus();"></td></tr>';
	s+='</form></table></body>';
	return s;
}

function UpdateMoneyView(){SetHtmlLoc(parent.View,'SALES_UpdateMoneyView.htm');}
function GetUpdateMoneyView(){
	sum_debit=0;
	sum_credit=0;
	var ix=0,colorstr=parent.eB_ListColor1,colorfont=parent.eB_ListTextColor1,s='<body bgcolor="'+parent.eB_PageBgColor+'"><div align="center"><center>';
	s+='<table border="0" width="100%" cellpadding="1" cellspacing="1" style="font-size: 9pt"><tr bgcolor="'+parent.eB_ListColor+'">';
	s+='<td width="10"><font color="'+parent.eB_ListColor+'">..</td>';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">ժҪ</td>';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">���ʿ�Ŀ</td>';
	s+='<td width="28%" align="center"><font color="'+parent.eB_ListTextColor+'">������Ŀ</td>';
	s+='<td width="16%" align="center"><font color="'+parent.eB_ListTextColor+'">������Ŀ</td>';
	s+='<td width="12%" align="center"><font color="'+parent.eB_ListTextColor+'">�跽</td>';
	s+='<td width="12%" align="center"><font color="'+parent.eB_ListTextColor+'">����</td></tr>';
	for (i=0;i<imoney;i++){
		if(ix%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
		else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
		ix++;
		s+='<tr nowrap bgcolor="'+colorstr+'" '+sme+'>';
		s+='<td align="center" OnClick="parent.Run.Moneydelitem('+i+')"><font color="#0000FF">��</font></td>';
		s+='<SPAN OnClick="parent.Run.Moneymodifyitem('+i+')">';
		s+='<td nowrap align="center"><font color="'+colorfont+'">'+GetCanDisplayString(moneylib[i].memo)+'</td>';
		s+='<td nowrap align="center"><font color="'+colorfont+'">'+moneylib[i].class1+'</td>';
		s+='<td nowrap align="center"><font color="'+colorfont+'">'+moneylib[i].class2+'</td>';
		s+='<td nowrap align="center"><font color="'+colorfont+'">'+moneylib[i].class3+'</td>';
		if (moneylib[i].mark == 0){
			sum_debit+=moneylib[i].amount;
			//if (moneylib[i].amount>=0)	
			s+='<td nowrap align="right"><font color="'+colorfont+'">'+'��'+fnumber(moneylib[i].amount)+'</td>';
			//else	s+='<td align="right"><font color="#FF0000">'+'��'+fnumber(-moneylib[i].amount)+'</td>';
			s+='<td></td>';
			}
		else{
			sum_credit+=moneylib[i].amount;
			s+='<td></td>';
			//if (moneylib[i].amount>=0)	
			s+='<td nowrap align="right"><font color="'+colorfont+'">'+'��'+fnumber(moneylib[i].amount)+'</td>';
			//else	s+='<td align="right"><font color="#FF0000">'+'��'+fnumber(-moneylib[i].amount)+'</td>';
			}
		s+='</SPAN>';
		}
	if(ix%2==0){colorstr=parent.eB_ListColor1;colorfont=parent.eB_ListTextColor1;}
	else{colorstr=parent.eB_ListColor2;colorfont=parent.eB_ListTextColor2;}
	s+='<tr><td colspan="7" bgcolor="#FF0000"></td></tr>';
	s+='<tr bgcolor="'+colorstr+'"><td><font color="#800040">��</font></td>';
	s+='<td><font color="#FF0000">�ϼ�</font></td>';
	s+='<td>��</td><td>��</td><td>��</td>';
	//if (sum_debit>=0) 
	s+='<td align="right">'+'��'+fnumber(sum_debit)+'</td>';
	//else	s+='<td align="right"><font color="#FF0000">'+'��'+fnumber(-sum_debit)+'</td>';
	//if (sum_credit>=0)	
	s+='<td align="right">'+'��'+fnumber(sum_credit)+'</td>';
	//else	s+='<td align="right"><font color="#FF0000">'+'��'+fnumber(-sum_credit)+'</td>';
	s+='<tr><td><font color="#800040">��</font></td><td colspan="5"><a href="javascript:parent.Run.Moneydelallx()">���</a></td></tr></table>';
	iswitch=1;
	return s;
}