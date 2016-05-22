package dou.metaObject;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class MaterialInStock {

	Logger logger = Config.getLogger(this.getClass());
	private String mPSpec;		/* 货物编码 */
	private String mName;		/* 货物名字 */
	private Float number;		/* 货物数量 */
	private String ctime;		/* 最后一次修改时间 */
	private String stockloca;	/* 货位 */
	private String remark;
	
	public MaterialInStock(String mPSpec, String mName, Float number, String ctime, String stockloca, String remark) {
		super();
		this.mPSpec = mPSpec;
		this.mName = mName;
		this.number = number;
		this.ctime = ctime;
		this.stockloca = stockloca;
		this.remark = remark;
		
		logger.info("[MaterialInStock.java:MaterialInStock] Create a new MaterialInStock object ： "
				+ mName + ctime);
	}
	
	public static ArrayList<MaterialInStock> getAllMaterialInStockInfo(){
		ArrayList<MaterialInStock> materialInStockList = null;
		
		/* 获取全部库存信息 */
		materialInStockList = SqlUtilsInterface.getAllMaterialInStockInfo();
		
		return materialInStockList;
	}

	public String getmPSpec() {
		return mPSpec;
	}

	public String getmName() {
		return mName;
	}

	public Float getNumber() {
		return number;
	}

	public String getCtime() {
		return ctime;
	}

	public String getStockloca() {
		return stockloca;
	}

	public String getRemark() {
		return remark;
	}
	
}
