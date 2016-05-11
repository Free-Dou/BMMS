package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class Customer {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String cName;
	private String cTel;
	private String cFax;
	private String cEmail;
	private String cAddress;
	private String cContact1;
	private String cContact2;
	private String cContact3;
	private String cRemark;
	
	public Customer(String cName, String cTel, String cFax, String cEmail, String cAddress, String cContact1,
			String cContact2, String cRemark) {
		super();
		this.cName = cName;
		this.cTel = cTel;
		this.cFax = cFax;
		this.cEmail = cEmail;
		this.cAddress = cAddress;
		this.cContact1 = cContact1;
		this.cContact2 = cContact2;
		this.cRemark = cRemark;
		
		logger.info("[Customer.java:Customer] Create a new customer object ： "
				+ cName);
	}
	
	public static ArrayList<Customer> getAllCustomerInfo(){
		ArrayList<Customer> customerList = null;
		
		/* 从数据库获取全部数据 */
		customerList = SqlUtilsInterface.getAllCustomerInfo();
		
		return customerList;
	}
	
	public void deleteCustomerBy(){
		
	}

	public String getcName() {
		return cName;
	}

	public String getcTel() {
		return cTel;
	}

	public String getcFax() {
		return cFax;
	}

	public String getcEmail() {
		return cEmail;
	}

	public String getcAddress() {
		return cAddress;
	}

	public String getcContact1() {
		return cContact1;
	}

	public String getcContact2() {
		return cContact2;
	}

	public String getcContact3() {
		return cContact3;
	}

	public String getcRemark() {
		return cRemark;
	}
}
