package dou.metaObject;

import org.apache.log4j.Logger;
import dou.config.Config;

public class Customer {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String sName;
	private String sFax;
	private String sEmail;
	private String sAddress;
	private String sContact1;
	private String sContact2;
	private String sContact3;
	private String sRemark;
	
	public Customer(String sName, String sFax, String sEmail, String sAddress, String sContact1, String sContact2,
			String sContact3, String sRemark) {
		super();
		this.sName = sName;
		this.sFax = sFax;
		this.sEmail = sEmail;
		this.sAddress = sAddress;
		this.sContact1 = sContact1;
		this.sContact2 = sContact2;
		this.sContact3 = sContact3;
		this.sRemark = sRemark;
		
		logger.info("[Customer.java:Customer] Create a new customer object ： "
				+ sName + sFax + sEmail + sAddress + sContact1 + sContact2 + sContact3 + sRemark);
	}

	public Logger getLogger() {
		return logger;
	}

	public String getsName() {
		return sName;
	}

	public String getsFax() {
		return sFax;
	}

	public String getsEmail() {
		return sEmail;
	}

	public String getsAddress() {
		return sAddress;
	}

	public String getsContact1() {
		return sContact1;
	}

	public String getsContact2() {
		return sContact2;
	}

	public String getsContact3() {
		return sContact3;
	}

	public String getsRemark() {
		return sRemark;
	}
}
