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
	private String outTime; 		/* 只从数据库中取 */
	public ArrayList<SalesProduct> salesProductList = new ArrayList<>();
	
	public class SalesProduct {
		private String pSpec;
		private String pName;
		private Float pCount;
		private Float pPrice;
		private Float pTotalPrice;
		private String pRemark;
		
		public SalesProduct(String pSpec, String pName, Float pCount, Float pPrice, Float pTotalPrice, 
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
					+ "`totalPrice`, `createTime`, `operation`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
					+ salesProduct.getpCount() + ", " + salesProduct.getpPrice() + ", " + salesProduct.getpTotalPrice() + ",now(), 1);" ;

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
	
	public void AddSalesProduct(String pSpec, String pName, Float pCount, Float pPrice, Float pTotalPrice, String pRemark){
		SalesProduct salesProduct = new SalesProduct(pSpec, pName, pCount, pPrice, pTotalPrice, pRemark);
		this.salesProductList.add(salesProduct);
	}

	public static ArrayList<SalesOrder> querySalesOrderInfo(String startDate, String endDate, String customer, String item, String remark){
		ArrayList<SalesOrder> salesOrderList = new ArrayList<>();

		/* （模糊查询，%号之间填界面上的字符串，三个参数分别是：订单备注，供应商名称和产品名称） */
		String sql = "SELECT * FROM (SELECT * FROM tb_materiaout WHERE orderRemark LIKE ? AND cname LIKE ? "
					+ "AND outTime BETWEEN ? AND ?) AS a,"
					+ "(SELECT DISTINCT orderid FROM tb_materiaout WHERE mname LIKE ?) AS b "
					+ "WHERE a.orderid=b.orderid";
		
		//SELECT * FROM (SELECT * FROM tb_materiaout WHERE orderRemark LIKE '%发%'AND cname LIKE '%飞%' AND outTime BETWEEN '2016-05-05' AND '2016-05-30') AS a,(SELECT DISTINCT orderid FROM tb_materiaout WHERE mname LIKE '%沥青%') AS b WHERE a.orderid=b.orderid
		String params[] = { "%" + remark + "%",
							"%" + customer + "%",
							startDate, 
							endDate + " 23:59:59",
							"%" + item + "%"};
		salesOrderList = SqlUtilsInterface.querySalesOrderInfo(sql, params);
		
		return salesOrderList;
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

	public String getOutTime() {
		return outTime;
	}

	public void setOutTime(String outTime) {
		this.outTime = outTime;
	}
}
