package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class Supplier {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String sName;
	private String sTel;
	private String sFax;
	private String sEmail;
	private String sAddress;
	private String sContact1;
	private String sContact2;
	private String sRemark;
	
	public Supplier(String sName, String sTel, String sFax, String sEmail, String sAddress, String sContact1,
			String sContact2, String sRemark) {
		super();
		this.sName = sName;
		this.sTel = sTel;
		this.sFax = sFax;
		this.sEmail = sEmail;
		this.sAddress = sAddress;
		this.sContact1 = sContact1;
		this.sContact2 = sContact2;
		this.sRemark = sRemark;
		
		logger.info("[Supplier.java:Supplier] Create a new Supplier object ： "
				+ sName);
	}
	
	public static ArrayList<Supplier> getAllSupplierInfo(){
		ArrayList<Supplier> supplierList = null;
		
		/* 从数据库获取全部数据 */
		supplierList = SqlUtilsInterface.getAllSupplierInfo();
		
		return supplierList;
	}

	public void addSupplierToDB() {
		String params[] = {this.sName, 
				   		   this.sTel, 
				   		   this.sFax, 
				   		   this.sEmail, 
				   		   this.sAddress, 
				   		   this.sContact1, 
				   		   this.sContact2, 
				   		   this.sRemark};
		String sql = "insert into tb_supply values(?,?,?,?,?,?,?,?);";
				
		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
	
	public String getsName() {
		return sName;
	}

	public String getsTel() {
		return sTel;
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

	public String getsRemark() {
		return sRemark;
	}
}
