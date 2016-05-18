package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class SalesOrder {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String orderID;
	private String carNum;
	private String stockLoca;
	private String userName;
	private String customerName;
	private String orderRemark;
	private ArrayList<SalesProduct> salesProductList = new ArrayList<>();
	
	private class SalesProduct {
		private String pSpec;
		private String pName;
		private Integer pCount;
		private Integer pPrice;
		private Integer pTotalPrice;
		private String pRemark;
		
		public SalesProduct(String pSpec, String pName, Integer pCount, Integer pPrice, Integer pTotalPrice, 
				 String pRemark) {
			super();
			this.pSpec = pSpec;
			this.pName = pName;
			this.pCount = pCount;
			this.pPrice = pPrice;
			this.pTotalPrice = pTotalPrice;
			this.pRemark = pRemark;
			logger.info("[SalesOrder.java:SalesProduct] Create a new SalesProduct object ： "
					+ pSpec);
		}

		public String getpSpec() {
			return pSpec;
		}

		public String getpName() {
			return pName;
		}

		public Integer getpCount() {
			return pCount;
		}

		public Integer getpPrice() {
			return pPrice;
		}

		public Integer getpTotalPrice() {
			return pTotalPrice;
		}

		public String getpRemark() {
			return pRemark;
		}
	}

	public SalesOrder(String orderID, String carNum, String stockLoca, String userName, String customerName, String orderRemark) {
		super();
		this.orderID = orderID;
		this.carNum = carNum;
		this.stockLoca = stockLoca;
		this.userName = userName;
		this.customerName = customerName;
		this.orderRemark = orderRemark;
		logger.info("[SalesOrder.java:SalesOrder] Create a new SalesOrder object ： "
				+ orderID);
	}
	
	/* 处理订单信息，可以返回是否处理成功，后期实现 */
	public void ProcSalesOrder() {	
		logger.info("[SalesOrder.java:ProcSalesOrder] Processing a new Sales Order ： "
				+ orderID);
		
		String sqls[] = new String[salesProductList.size()];
		String params[][] = new String[salesProductList.size()][10];
		for (int i = 0; i < salesProductList.size(); i++){
			SalesProduct salesProduct  = this.salesProductList.get(i);
			sqls[i] = "INSERT INTO tb_personmessage (`orderid`, `mname`, `carNum`, `mpspec`, `stockLoca`,  "
					+ "`username`, `relationName`, `approval`, `remark`, `orderRemark`, `number`, `price`, "
					+ "`totalPrice`, `createTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
					+ salesProduct.getpCount() + ", " + salesProduct.getpPrice() + ", " + salesProduct.getpTotalPrice() + ",now());" ;

			params[i][0] = this.getOrderID();
			params[i][1] = salesProduct.getpName();
			params[i][2] = this.getCarNum();
			params[i][3] = salesProduct.getpSpec();
			params[i][4] = this.getStockLoca();
			params[i][5] = this.getUserName();
			params[i][6] = this.getCustomerName();
			params[i][7] = "0"; 		/* approval为0  表示当前订单未处理 */
			params[i][8] = salesProduct.getpRemark();
			params[i][9] = this.getOrderRemark();
		}
		
		SqlUtilsInterface.updateManyInfos(sqls, params);
		logger.info("[SalesOrder.java:ProcSalesOrder] Processing a new Sales Order  -->  add a persion message ： "
				+ sqls[0] + " params:  " + params.toString());
	}
	
	public void AddSalesProduct(String pSpec, String pName, Integer pCount, Integer pPrice, Integer pTotalPrice, String pRemark){
		SalesProduct salesProduct = new SalesProduct(pSpec, pName, pCount, pPrice, pTotalPrice, pRemark);
		this.salesProductList.add(salesProduct);
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

	public String getCustomerName() {
		return customerName;
	}

	public String getOrderRemark() {
		return orderRemark;
	}

	public ArrayList<SalesProduct> getSalesProductList() {
		return salesProductList;
	}

}
