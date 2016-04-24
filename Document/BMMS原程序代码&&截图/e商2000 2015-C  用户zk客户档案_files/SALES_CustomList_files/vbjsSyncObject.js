function vbjsSyncObject(name, width)
{
	this.name=name;

	this.data=new Array();
	this.width=width;
	
	this.height=function ()	{
		return this.data.length;
	}

	this.appendstr=function (apdstr)	{
		this.data[this.height()]=apdstr;
		return (true);
	}

	this.appendobj=function (apdobj)	{
		var i;
		for (i=0;i<apdobj.length;i++)
			this.data[this.height()]=apdobj[i];
		return (true);
	}

	this.getdata=function ()	{
		var i, str;
		var senddata=new Array(this.height()+8)
		
		senddata[0]=escape(this.name);
		senddata[1]=escape(this.height());
		senddata[2]=escape(this.width);
		senddata[3]='';
		senddata[4]='';
		senddata[5]='';
		senddata[6]='';
		senddata[7]='';
		
		for (i=0;i<this.data.length;i++)
			senddata[i+8]=escape(this.data[i]);
		str = senddata.join(',');
		delete senddata;
		return str;
		}

	this.putdata=function (str)	{
		var i, height;
		var senddata=str.split(',');
		
		if (senddata.length < 8)
			return (false);
		
		this.name=unescape(senddata[0]);
		height=parseInt(unescape(senddata[1]));
		this.width=parseInt(unescape(senddata[2]));
		
		this.data.length=0;
		for (i=0;i<height;i++)
			this.data[i]=unescape(senddata[i+8]);
		delete senddata;
		return (true);
		}

	this.finddata=function (findstr)	{
		var i;
		for (i=0;i<this.height();i+=2)
			if (this.data[i]==findstr)
				return this.data[i+1];
		return null;
	}
}