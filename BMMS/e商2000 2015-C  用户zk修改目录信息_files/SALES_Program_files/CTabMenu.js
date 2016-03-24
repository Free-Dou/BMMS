var hexch = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'),
	imgUrl='Image/SPACE.GIF', fontStyle='font-size: 12px';

function TabMenuObject(c1,c2){
	this.tColor='';
	this.mColor1='';
	this.mColor2='';
	this.mColor3='';
	this.NowSelect=-1;
	this.arrayMenu=new Array();
	
	this.Append = function(szText, szUrl){
		this.arrayMenu[this.arrayMenu.length]=szText;
		this.arrayMenu[this.arrayMenu.length]=szUrl;
	}

	this.ToHex = function(n){
		var h, l;

		n = Math.round(n);
		if(n > 255)n = 255;
		l = n % 16;
		h = Math.floor((n / 16)) % 16;
		return (hexch[h] + hexch[l]);
	}

	this.DoMenuColor = function(c, tc){
		var r, g, b;

		this.mColor1 = c;
		this.tColor = tc;

		r = '0x' + c.substr(1, 2);
		g = '0x' + c.substr(3, 2);
		b = '0x' + c.substr(5, 2);

		this.mColor2 = '#' + this.ToHex(256 - (256 - r) / 3) + this.ToHex(256 - (256 - g) / 3) + this.ToHex(256 - (256 - b) / 3);
		this.mColor3 = '#' + this.ToHex(r * 2 / 3) + this.ToHex(g * 2 / 3) + this.ToHex(b * 2 / 3);
	}

	this.GetMenuColor = function(n){
		var c = '';

		switch(n)
		{
		case 1:c = this.mColor1;break;
		case 2:c = this.mColor2;break;
		case 3:c = this.mColor3;break;
		case 4:c = '#424242';break;
		}
		if(c == '')
			return '';
		else
			return 'bgcolor="' + c + '"';
	}

	this.mc = function(){
		var i,s='';
		for(i = 0; i < arguments.length; i ++)
			s+='<td ' + this.GetMenuColor(arguments[i]) + '><img border="0" src="'+imgUrl+'" width="1" height="1"></td>';
		return s;
	}

	this.DrawMenuLine = function(m, n, t, a){
		var s='';

		s+='<tr>';
		if(m != 1)
			switch(n)
			{
			case 0:s+=this.mc(2, 1);break;
			case 1:s+=this.mc(0, 0);break;
			case 2:s+=this.mc(0, 2);break;
			case 3:s+=this.mc(2, 1);break;
			case 4:s+=this.mc(2, 2);break;
			case 5:s+=this.mc(1, 1);break;
			}

		switch(n)
		{
		case 0:
			s+='<td ' + this.GetMenuColor(1) + '><img border="0" src="'+imgUrl+'" align="absmiddle" width="8" height="18">';
			if(a)s+='<a href="' + a + '">';
			s+='<font style="'+fontStyle+'" color="' + this.tColor + '">' + t + '</font><img border="0" src="'+imgUrl+'" width="8" height="1">';
			if(a)s+='</a>';
			s+='</td>';
			break;
		case 1:s+=this.mc(2);break;
		case 2:s+=this.mc(1);break;
		case 3:s+=this.mc(1);break;
		case 4:s+=this.mc(2);break;
		case 5:s+=this.mc(1);break;
		}

		if(m != 2)
			switch(n)
			{
			case 0:s+=this.mc(3, 4);break;
			case 1:s+=this.mc(0, 0);break;
			case 2:s+=this.mc(4, 0);break;
			case 3:s+=this.mc(3, 4);break;
			case 4:s+=this.mc(2, 2);break;
			case 5:s+=this.mc(1, 1);break;
			}
		s+='</tr>';
		return s;
	}

	this.GetHtml = function(){
		var i, m, p, l, f, n, s='';

		s+='<table border="0" cellspacing="0" cellpadding="0"><tr>';
		for(i = 0; i < this.arrayMenu.length; i += 2){
			m = 0;
			if(i == this.NowSelect*2 - 2)m = 2;
			else if(i == this.NowSelect*2 + 2)m = 1;
			s+='<td valign="bottom"><table border="0" cellspacing="0" cellpadding="0">';
			s+=this.DrawMenuLine(m, 1);
			s+=this.DrawMenuLine(m, 2);
			if(i != this.NowSelect*2)
			{
				s+=this.DrawMenuLine(m, 0, this.arrayMenu[i], this.arrayMenu[i + 1]);
				s+=this.DrawMenuLine(m, 4);
			}else
			{
				s+=this.DrawMenuLine(m, 3);
				s+=this.DrawMenuLine(m, 3);
				s+=this.DrawMenuLine(m, 0, this.arrayMenu[i]);
				s+=this.DrawMenuLine(m, 5);
			}
			s+='</table></td>';
		}

		s+='</tr>'
		s+='<tr bgcolor="'+parent.eB_ListColor+'" height="2"><td colspan="'+this.arrayMenu.length/2+'"></td></tr>';
		s+='</table>';
		return s;
	}
	this.DoMenuColor(c1, c2);
}
