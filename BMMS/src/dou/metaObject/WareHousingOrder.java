package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class WareHousingOrder {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String orderID;
	private String carNum;
	private String stockLoca;
	private String userName;
	private String supplierName;
	private String orderRemark;
	private String inTime; 		/* 只从数据库中取 */
	public ArrayList<WareHousingProduct> wareHousingProductList = new ArrayList<>();
	
	public class WareHousingProduct {
		private String pSpec;
		private String pName;
		private Float pCount;
		private Float pPrice;
		private Float pTotalPrice;
		private String pRemark;
		
		public WareHousingProduct(String pSpec, String pName, Float pCount, Float pPrice, Float pTotalPrice, 
				 String pRemark) {
			super();
			this.pSpec = pSpec;
			this.pName = pName;
			this.pCount = pCount;
			this.pPrice = pPrice;
			this.pTotalPrice = pTotalPrice;
			this.pRemark = pRemark;
			logger.info("[WareHousingOrder.java:WareHousingProduct] Create a new WareHousingProduct object ： "
					+ pSpec);
		}

		public String getpSpec() {
			return pSpec;
		}

		public String getpName() {
			return pName;
		}

		public Float getpCount() {
			return pCount;
		}

		public Float getpPrice() {
			return pPrice;
		}

		public Float getpTotalPrice() {
			return pTotalPrice;
		}

		public String getpRemark() {
			return pRemark;
		}
	}

	public WareHousingOrder(String orderID, String carNum, String stockLoca, String userName, String supplierName, String orderRemark) {
		super();
		this.orderID = orderID;
		this.carNum = carNum;
		this.stockLoca = stockLoca;
		this.userName = userName;
		this.supplierName = supplierName;
		this.orderRemark = orderRemark;
		logger.info("[WareHousingOrder.java:WareHousingOrder] Create a new WareHousingOrder object ： "
				+ orderID);
	}
	
	/* 处理订单信息，可以返回是否处理成功，后期实现 */
	public void ProcWareHousingOrder() {	
		logger.info("[WareHousingOrder.java:ProcWareHousingOrder] Processing a new WareHousing Order ： "
				+ orderID);
		
		String sqls[] = new String[wareHousingProductList.size()];
		String params[][] = new String[wareHousingProductList.size()][10];
		for (int i = 0; i < wareHousingProductList.size(); i++){
			WareHousingProduct wareHousingProduct  = this.wareHousingProductList.get(i);
			sqls[i] = "INSERT INTO tb_personmessage (`orderid`, `mname`, `carNum`, `mpspec`, `stockLoca`,  "
					+ "`username`, `relationName`, `approval`, `remark`, `orderRemark`, `number`, `price`, "
					+ "`totalPrice`, `createTime`,  `operation`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
					+ wareHousingProduct.getpCount() + ", " + wareHousingProduct.getpPrice() + ", " + wareHousingProduct.getpTotalPrice() + ",now(), 0);" ;

			params[i][0] = this.getOrderID();
			params[i][1] = wareHousingProduct.getpName();
			params[i][2] = this.getCarNum();
			params[i][3] = wareHousingProduct.getpSpec();
			params[i][4] = this.getStockLoca();
			params[i][5] = this.getUserName();
			params[i][6] = this.getSupplierName();
			params[i][7] = "0"; 		/* approval为0  表示当前订单未处理 */
			params[i][8] = wareHousingProduct.getpRemark();
			params[i][9] = this.getOrderRemark();
		}
		
		SqlUtilsInterface.updateManyInfos(sqls, params);
		logger.info("[WareHousingOrder.java:ProcWareHousingOrder] Processing a new wareHousing Order  -->  add a persion message ： "
				+ sqls[0] + " params:  " + params.toString());
	}
	
	/* 添加一个当前订单中包含的产品 */
	public void AddWareHousingProduct(String pSpec, String pName, Float pCount, Float pPrice, Float pTotalPrice, String pRemark){
		WareHousingProduct wareHousingProduct = new WareHousingProduct(pSpec, pName, pCount, pPrice, pTotalPrice, pRemark);
		this.wareHousingProductList.add(wareHousingProduct);
	}

	/*  */
	public static ArrayList<WareHousingOrder> getAllWareHousingOrderInfo(){
		ArrayList<WareHousingOrder> wareHousingOrderList = new ArrayList<>();
		
		wareHousingOrderList = SqlUtilsInterface.getAllWareHousingOrderInfo();
		
		return wareHousingOrderList;
	}
	
	public String getOrderID() {
		return orderID;
	}

	public String getCarNum() {
		return carNum;
	}

	public String getStockLoca() {
		return stockLoca;
	}

	public String getUserName() {
		return userName;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public String getOrderRemark() {
		return orderRemark;
	}

	public ArrayList<WareHousingProduct> getWareHousingProductList() {
		return wareHousingProductList;
	}

	public String getInTime() {
		return inTime;
	}

	public void setInTime(String inTime) {
		this.inTime = inTime;
	}
}
