package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class Product {
		
	private Logger logger = Config.getLogger(this.getClass());
	private String pSpec;
	private String pName;
	private Integer pPrice;
	
	public Product(String pSpec, String pName, Integer pPrice) {
		super();
		this.pSpec = pSpec;
		this.pName = pName;
		this.pPrice = pPrice;
		
		logger.info("[Product.java:Product] Create a new Product object ： "
				+ pName);
	}
	
	public static ArrayList<Product> getAllProductInfo(){
		ArrayList<Product> productList = null;
		
		/* 从数据库获取全部数据 */
		productList = SqlUtilsInterface.getAllProductInfo();
		
		return productList;
	}
	
	public void addProductToDB(){
		/* 
		 *产品信息添加需要执行两条sql语句，一条是添加在产品信息表中的，一条是添加在仓库表中的：
		  添加在产品信息表：INSERT INTO tb_product(pname,pspec) VALUES('80#liqing','LQ-#80')
		  添加在仓库表：INSERT INTO tb_materialstock(mpspec,mname,number) VALUES ('LQ-#80','80#liqing',0)(number必须为0哈) 
		 */
		String params[][] = {{this.pName, this.pSpec},
							 {this.pSpec, this.pName}};
		String sqls[] = {"INSERT INTO tb_product(pname,pspec) VALUES(?,?);", 
						 "INSERT INTO tb_materialstock(mpspec,mname,number,ctime,stockloca) VALUES (?,?,0,now(),1)"};
		
		SqlUtilsInterface.updateManyInfos(sqls, params);
	}

	public static void delProductFromDB(String pKeyName) {
		String sql = "delete from tb_product where pname=?;";
		String params[] = {pKeyName};
		
		SqlUtilsInterface.delInfoFromDB(sql, params);
	}
	
	public String getpSpec() {
		return pSpec;
	}

	public String getpName() {
		return pName;
	}

	public Integer getpPrice() {
		return pPrice;
	}
	
}
