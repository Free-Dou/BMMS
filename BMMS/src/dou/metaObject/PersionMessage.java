package dou.metaObject;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class PersionMessage {
	Logger logger = Config.getLogger(this.getClass());
	private String orderid;		
	private String mname;		
	private String carNum;		
	private String mpspec;		
	private Float  number;	
	private String stockLoca;
	private Float  price;
	private Float  totalPrice;
	public String getUsername() {
		return username;
	}

	private String username;
	private String createTime;
	private String relationName;
	private Integer operation;					/* 0:入库  1:出库 */ 
	private String approval;
	private String remark;

	public PersionMessage(String orderid, String mname, String carNum, String mpspec, Float number, String stockLoca,
			Float price, Float totalPrice, String username, String createTime, String relationName, Integer operation, 
			String approval, String remark) {
		super();
		this.orderid = orderid;
		this.mname = mname;
		this.carNum = carNum;
		this.mpspec = mpspec;
		this.number = number;
		this.stockLoca = stockLoca;
		this.price = price;
		this.totalPrice = totalPrice;
		this.username = username;
		this.createTime = createTime;
		this.relationName = relationName;
		this.operation = operation;
		this.approval = approval;
		this.remark = remark;
		
		logger.info("[MaterialInStock.java:MaterialInStock] Create a new Persion Message object ： " + orderid);
	}
	
	public static ArrayList<PersionMessage> getAllpersionMessageListInfo(){
		ArrayList<PersionMessage> persionMessageList = null;
		
		/* 从数据库获取全部数据 */
		persionMessageList = SqlUtilsInterface.getAllpersionMessageListInfo();
		
		return persionMessageList;
	}

	public String getOrderid() {
		return orderid;
	}

	public String getMname() {
		return mname;
	}

	public String getCarNum() {
		return carNum;
	}

	public String getMpspec() {
		return mpspec;
	}

	public Float getNumber() {
		return number;
	}

	public String getStockLoca() {
		return stockLoca;
	}

	public Float getPrice() {
		return price;
	}

	public Float getTotalPrice() {
		return totalPrice;
	}

	public String getCreateTime() {
		return createTime;
	}

	public String getRelationName() {
		return relationName;
	}

	public Integer getOperation() {
		return operation;
	}

	public String getApproval() {
		return approval;
	}

	public String getRemark() {
		return remark;
	}	
}
