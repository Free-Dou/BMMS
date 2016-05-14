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
