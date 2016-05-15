package dou.sqlHelper;

import java.util.ArrayList;
import dou.metaObject.Customer;
import dou.metaObject.MaterialInStock;
import dou.metaObject.Product;
import dou.metaObject.Supplier;

public class SqlUtilsInterface {

	public static boolean verifyPwd(String userName, String pwd){
		return new MySqlIO().verifyPwd(userName, pwd);
	}
	
	public static ArrayList<Customer> getAllCustomerInfo(){
		return new MySqlIO().getAllCustomerInfo();
	}
	
	public static ArrayList<Product> getAllProductInfo() {
		return new MySqlIO().getAllProductInfo();
	}
	
	public static ArrayList<Supplier> getAllSupplierInfo() {
		return new MySqlIO().getAllSupplierInfo();
	}

	public static void addInfoToDB(String sql, String[] params) {
		new MySqlIO().addInfoToDB(sql, params);
	}

	public static void delInfoFromDB(String sql, String[] params) {
		new MySqlIO().delInfoFromDB(sql, params);
	}

	public static ArrayList<MaterialInStock> getAllMaterialInStockInfo() {
		return new MySqlIO().getAllMatrialInStockInfo();
	}

	
/*
 * 
	public static Logger logger = Config.getLogger(new SqlUtilsInterface().getClass());
	
	public static boolean dropTable(String table_name){
		return new MySqlIO().dropTable(table_name);
	}
	public static boolean createTable(String table_name){
		return new MySqlIO().createTable(table_name);
	}
	
	// 判断某张表是否已经存在
	public static boolean checkTablesLife(String table_name){
		return new MySqlIO().checkTablesLife(table_name);
	}
	
	//查询某个表的所有记录   返回保存用每条记录的getWebPageObejct_List
	public static List<WebPageObejct> getWebPageObejct_List(String table_name) {
		return new MySqlIO().getWebPageObejct_List(table_name);
	}
	
	//判断某个表中的某条记录是否存在  通过他的url
	public static boolean findBywebpage_url(String table_name, String webpage_url) {
	    return new MySqlIO().findBywebpage_url(table_name, webpage_url);
	}
	
	//向某个向某个表中插入数据webPageObejct
	public static boolean insertWebPageDate(String table_name, WebPageObejct webPageObject){
		return new MySqlIO().insert(table_name, webPageObject);
	}
	
	//向某个表中插入数据webPageObejct   插入前进行检查
	public static boolean insertWebPageDataEX(String table_name,WebPageObejct webPageObejct) {
		// 将信息存入数据库
		boolean result = false;
		MySqlIO mysqlIO = new MySqlIO();
		String webAdress =  webPageObejct.getwebpage_url();
		if (mysqlIO.findBywebpage_url(table_name, webAdress)) {
			result = true;
			logger.info("data of " + webAdress + " already exist! in  "+table_name);
		} else {
			result = mysqlIO.insert(table_name, webPageObejct);
			logger.info("insert "+table_name+"data of " + webAdress);
		}
		return result;
	}
	*/


}
