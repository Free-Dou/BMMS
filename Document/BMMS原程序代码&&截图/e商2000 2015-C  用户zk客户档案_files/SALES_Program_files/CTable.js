function TableProp(){
this.border = '';
this.cellspacing = '';
this.cellpadding = '';

this.width = '';
this.height = '';

this.align = '';

this.background = '';

this.bgcolor = '';
this.bordercolor = '';
this.bordercolorlight = '';
this.bordercolordark = '';

this.style = '';

this.prop = function (){
	var s = '';
	if (this.border.length>0)	s+='border="'+this.border+'" ';
	if (this.cellspacing.length>0)	s+='cellspacing="'+this.cellspacing+'" ';
	if (this.cellpadding.length>0)	s+='cellpadding="'+this.cellpadding+'" ';
	if (this.width.length>0)	s+='width="'+this.width+'" ';
	if (this.height.length>0)	s+='height="'+this.height+'" ';
	if (this.align.length>0)	s+='align="'+this.align+'" ';
	if (this.background.length>0)	s+='background="'+this.background+'" ';
	if (this.bgcolor.length>0)	s+='bgcolor="'+this.bgcolor+'" ';
	if (this.bordercolor.length>0)	s+='bordercolor="'+this.bordercolor+'" ';
	if (this.bordercolorlight.length>0)	s+='bordercolorlight="'+this.bordercolorlight+'" ' ;
	if (this.bordercolordark.length>0)	s+='bordercolordark="'+this.bordercolordark+'" ';
	if (this.style.length>0)	s+='style="'+this.style+'" ';
	return s;
	}

this.gethtml = function	(){
	return '<table '+this.prop()+'>';
	}
}

function TableData(width){
this.width = width;

this.tdProp = new TableProp();
this.tdTitle = new Array(width);
this.tdDataType = new Array(width);
for (i=0;i<width;i++)	this.tdDataType[i] = 0;
this.tdData = new Array();
this.tdDataTotal = new Array(width);
this.tdDataTotalDisplay = new Array(width);
for (i=0;i<width;i++)	this.tdDataTotalDisplay[i] = 1;
this.itemspage = 25;

var tdSortPos = 0, tdSortFlag = 0;
	
this.height = function (){
	return this.tdData.length;
	}
	
this.gettitle = function (){
	return this.tdTitle;
	}

this.append = function (data){
	this.tdData[this.tdData.length] = data;
	return (true);
	}

this.getdata = function (pos){
	if (pos>=this.height())		return (false);
	else	return this.tdData[pos];
	}

function compareNumbers(a, b){
	if (tdSortFlag)	return b[tdSortPos] - a[tdSortPos];
	else	return a[tdSortPos] - b[tdSortPos];
	}

function compareStrings(a, b){
	if (tdSortFlag){
		if (a[tdSortPos] > b[tdSortPos])	return -1;
		if (a[tdSortPos] < b[tdSortPos])	return 1;
		return 0;
		}
	else{
		if (a[tdSortPos] > b[tdSortPos])	return 1;
		if (a[tdSortPos] < b[tdSortPos])	return -1;
		return 0;
		}
}

this.sortdata = function (pos, flag){
	if (pos>=this.width)	return (false);
	tdSortPos = pos;
	tdSortFlag = flag;
	if (this.tdDataType[pos] == 0)	this.tdData.sort(compareStrings);
	else	this.tdData.sort(compareNumbers);
	return (true);
	}

this.sortdatatitle = function (title, flag){
	var i;
	for(i=0;i<this.width;i++)if(this.tdTitle[i]==title){this.sortdata(i,flag);return(true);}
	return (false);
	}

this.gettotal = function (pos){
	var i, total;
	if (this.tdDataType[pos] == 0)	return (false);
	total = 0;
	for (i=0;i<this.height();i++)	total += IFNUM4(this.tdData[i][pos]);
	return total/10000;
	}

function defdraw(drawData, drawDataType, drawWidth, drawPos){
	var i, s;
	s ='<TR>\n';
	for (i=0;i<drawWidth;i++)
		s+='<TD nowrap '+(drawDataType[i]?' align="right"':'')+'>'+drawData[i]+'</TD>\n';
	s+='</TR>\n';
	return s;
}
	
this.getrowhtml = function (pos, drawing){
	if (pos>=this.height())	return (false);
	if (drawing==null)	return defdraw(this.tdData[pos], this.tdDataType, this.width, pos);
	else	return drawing(this.tdData[pos], this.tdDataType, this.width, pos);
	}

this.gettitlehtml = function (drawing){
	if (drawing==null)	return defdraw(this.tdTitle, this.tdDataType, this.width, -1);
	else	return drawing(this.tdTitle, this.tdDataType, this.width, -1);
}

this.gettotalhtml = function (drawing){
	var i, j, tf=0, rvl;
	for (i=0;i<this.width;i++)	if (!isNaN(this.tdDataTotal[i]))	tf++;
	if (!tf){
		for (i=0;i<this.width;i++)
			if (this.tdDataType[i] != 0)	this.tdDataTotal[i] = 0;
			else	this.tdDataTotal[i] = '　';
		for (i=0;i<this.width;i++)
			if (this.tdDataType[i] != 0)	for (j=0;j<this.height();j++)	this.tdDataTotal[i] += IFNUM4(this.tdData[j][i]);
		for (i=0;i<this.width;i++)	if (this.tdDataType[i] != 0)	this.tdDataTotal[i] /= 10000;
		}
	//modify temp 7.6
	for (i=0;i<this.width;i++)	if (this.tdDataTotalDisplay[i]==0 && this.tdDataType[i]==1){this.tdDataTotal[i] = '　';this.tdDataType[i]=0;}
	//end
	if (drawing==null)	rvl = defdraw(this.tdDataTotal, this.tdDataType, this.width, -2);
	else	rvl = drawing(this.tdDataTotal, this.tdDataType, this.width, -2);
	//modify temp 7.6
	for (i=0;i<this.width;i++)	if (this.tdDataTotalDisplay[i]==0 && this.tdDataType[i]==0)this.tdDataType[i]=1;
	//end
	return rvl;
	}

this.drawpagectrl = function (drawPos, objstr){
	var maxpage=parseInt(this.height()/this.itemspage)+(this.height()%this.itemspage>0?1:0);
	if (drawPos>maxpage-1)	drawPos=maxpage-1;
	else	if (drawPos<0)	drawPos=0;
	s ='<form name="pages" OnSubmit="return '+objstr+'.FromDoNewPage(parseInt(document.pages.pageno.value)-1)"><TR><TD colspan="'+this.width+'">';
	if (drawPos<=0)	s+='上页';
	else	s+='<a href="JavaScript:'+objstr+'.DoNewPage('+(drawPos-1)+')">上页</a>';
		
	if (drawPos>=maxpage-1)	s+='　下页';
	else	s+='　<a href="JavaScript:'+objstr+'.DoNewPage('+(drawPos+1)+')">下页</a>';
	s+='　第'+(drawPos+1)+'页　共'+maxpage+'页　转去第<input name="pageno" type="text" size="2" value="'+(drawPos+2)+'">页';
	s+='</TD></TR></form><'+'script>document.pages.pageno.focus()</'+'script>\n';
	return s;
	}
	
this.getpagectrlhtml = function (objstr, pn, drawing){
	if (drawing==null)	return this.drawpagectrl(pn, objstr);
	else	return drawing(pn, objstr);
	}
}

function TableList(Name, width){
this.Name = Name;
this.Data = new TableData(width);
}

function DrawPageTab(tbList, obj, n, nfcolor, ncolor, bfcolor, bcolor, objstr){
var i, s, d1;
var p = new TableProp();
p.border = '0';
p.cellpadding = '0';
p.cellspacing = '0';
p.style = 'font-size: 9pt';
s=p.gethtml();
delete p;
s+='<tr>';
d1=tbList.length%5;
s+='</tr>';
for (i=0;i<tbList.length;i++){
	if (i==d1)	s+='</tr><tr>';
	if (((i-d1)%5)==0 && (i-d1)>0)	s+='</tr><tr>';
	if (i == n)	bgc = ncolor;	else	bgc = bcolor;
	s+='<td nowrap bgcolor="'+bgc+'" width="1" align="left"><img src="image/left_corner.gif"></td>';
	if (i==n){
		s+='<td nowrap bgcolor="'+bgc+'" align="center"><font color="'+nfcolor+'">'+tbList[i].Name+'</font></td>'
		s+='<td nowrap bgcolor="'+bgc+'" width="1" align="center"><img src="image/corner_bar.gif"></td>';
		}
	else{
		s+='<td nowrap bgcolor="'+bgc+'" align="center"><font color="'+bfcolor+'"><a href="JavaScript:'+objstr+'.DoNewTable('+i+')">'+tbList[i].Name+'</a></font></td>'
		s+='<td nowrap bgcolor="'+bgc+'" width="1" align="right"><img src="image/right_corner.gif"></td>';
		}
	}
s+='</tr>';
s+='</table>';
obj.document.write(s);
}

function DrawPageTabExTest(tbList, n, nfcolor, ncolor, bfcolor, bcolor, objstr){
var i, s, d1;
var p = new TableProp();
p.border = '0';
p.cellpadding = '0';
p.cellspacing = '0';
p.style = 'font-size: 9pt';
s=p.gethtml();
delete p;
s+='<tr>';
d1=tbList.length%5;
s+='</tr>';
for (i=0;i<tbList.length;i++){
	if (i==d1)	s+='</tr><tr>';
	if (((i-d1)%5)==0 && (i-d1)>0)	s+='</tr><tr>';
	if (i == n)	bgc = ncolor;	else	bgc = bcolor;
	s+='<td nowrap bgcolor="'+bgc+'" width="1" align="left"><img src="image/left_corner.gif"></td>';
	if (i==n){
		s+='<td nowrap bgcolor="'+bgc+'" align="center"><font color="'+nfcolor+'">'+tbList[i].Name+'</font></td>'
		s+='<td nowrap bgcolor="'+bgc+'" width="1" align="center"><img src="image/corner_bar.gif"></td>';
		}
	else{
		s+='<td nowrap bgcolor="'+bgc+'" align="center"><font color="'+bfcolor+'"><a href="JavaScript:'+objstr+'.DoNewTable('+i+')">'+tbList[i].Name+'</a></font></td>'
		s+='<td nowrap bgcolor="'+bgc+'" width="1" align="right"><img src="image/right_corner.gif"></td>';
		}
	}
s+='</tr>';
s+='</table>';
return s;
}

function DrawPageTabEx(tbList, n, nfcolor, ncolor, bfcolor, bcolor, objstr){
var i, s, mo;

mo = new TabMenuObject(ncolor, bcolor);
mo.NowSelect=n;
for (i=0;i<tbList.length;i++)
	mo.Append(tbList[i].Name,'JavaScript:'+objstr+'.DoNewTable('+i+')');
s=mo.GetHtml()
delete mo;
return s;
}
