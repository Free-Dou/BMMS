
function confirm_click(orderid)
{
	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/ProcPersonMessage?time=" + new Date();
		var data = "orderID=" + orderid + "&processType=approval";
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}
}

function cancle_click(orderid)
{
	parent.myxmlhttp = getXmlHttpObject();
	
	if (parent.myxmlhttp)
	{
		var aim_url = "/BMMS/ProcPersonMessage?time=" + new Date();
		var data = "orderID=" + orderid + "&processType=reject";
		
		parent.myxmlhttp.open("post", aim_url, true);
		parent.myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		parent.myxmlhttp.onreadystatechange = parent.refresh_now_page;
		parent.myxmlhttp.send(data);
	}

}
