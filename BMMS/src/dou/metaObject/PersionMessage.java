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
	private String username;
	private String createTime;
	private String relationName;
	private Integer operation;					/* 0:入库  1:出库 */ 
	private String approval;
	private String remark;
	private String orderRemark;

	public PersionMessage(String orderid, String mname, String carNum, String mpspec, Float number, String stockLoca,
			Float price, Float totalPrice, String username, String createTime, String relationName, Integer operation, 
			String approval, String remark, String orderRemark) {
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
		this.orderRemark = orderRemark;
		
		logger.info("[MaterialInStock.java:MaterialInStock] Create a new Persion Message object ： " + orderid);
	}
	
	public static ArrayList<PersionMessage> getAllpersionMessageListInfo(){
		ArrayList<PersionMessage> persionMessageList = null;
		
		/* 从数据库获取全部数据 */
		String sql = "SELECT * FROM tb_personmessage ORDER BY id DESC;";
		String params[] = null;
		persionMessageList = SqlUtilsInterface.getPersionMessageInfo(sql, params);
		
		return persionMessageList;
	}


	public static boolean procApprovalOrder(String approvalOrderID) {
		/* 获取相关的数据列信息 */
		 ArrayList<PersionMessage> approvalOrderProductArray = null;
		 String sql = "select * from tb_personmessage where orderid=?";
		 String params[] = {approvalOrderID};
		 approvalOrderProductArray = SqlUtilsInterface.getPersionMessageInfo(sql, params);
		 if (null == approvalOrderProductArray){
			 return false;
		 }
		 
		Integer orderType = 0;
		String sqls[] = new String[approvalOrderProductArray.size() * 2 + 1];
		String insertSql = null;
		String updateSql = null;
		
		/* 先从表单的第一行数据，获取出入库类型, 0:入库，1:出库 */
		PersionMessage persionMessageObject = approvalOrderProductArray.get(0);
		orderType = persionMessageObject.getOperation();
		if (1 == orderType){
			/* 设置前半段sql语句为出库处理的sql语句 */
			insertSql = "INSERT INTO `tb_materiaout` (`orderid`, `mpspec`, `mname`, `number`, `carNum`,"
					+ " `stockloca`, `price`, `totalPrice`, `outTime`, `username`, `cname`, `remark`, `orderRemark`) ";
			updateSql = "UPDATE tb_materialstock SET number=number-(SELECT number FROM tb_materiaout ";
			sqls[approvalOrderProductArray.size() * 2] = "UPDATE tb_personmessage SET approval = '1' WHERE orderid = '" + approvalOrderID + "';";
		}else{
			/* 设置前半段sql语句为入库处理的sql语句 */
			insertSql = "INSERT INTO `tb_materiain` (`orderid`, `mpspec`, `mname`, `number`, `carNum`,"
					+ " `stockloca`, `price`, `totalPrice`, `inTime`, `username`, `sname`, `remark`, `orderRemark`) ";
			updateSql = "UPDATE tb_materialstock SET number=number+(SELECT number FROM tb_materiain ";
			sqls[approvalOrderProductArray.size() * 2] = "UPDATE tb_personmessage SET approval = '1' WHERE orderid = '" + approvalOrderID + "';";
		}
		
		for (int i = 0; i < approvalOrderProductArray.size(); i++ ){
			/* 处理每一行数据 */
			persionMessageObject = approvalOrderProductArray.get(i);
			
			/* 补齐后半段sql语句，主要是填数据，出入库相同 */
			sqls[i] = insertSql;
			sqls[i] += ("VALUES ('" + approvalOrderID + "', '" + persionMessageObject.getMpspec() + "', '" + persionMessageObject.getMname() + "',"
						+ " '" + persionMessageObject.getNumber() + "', '" + persionMessageObject.getCarNum() + "', '" + persionMessageObject.getStockLoca() + "',"
						+ " '" + persionMessageObject.getPrice() + "', '" + persionMessageObject.getTotalPrice() + "', '" + persionMessageObject.getCreateTime() + "', "
						+ "'"+ persionMessageObject.getUsername() +"', '" + persionMessageObject.getRelationName() + "', '" + persionMessageObject.getRemark() + "', '" + persionMessageObject.getOrderRemark() + "');");
				
			sqls[i + approvalOrderProductArray.size()] = updateSql;
			sqls[i + approvalOrderProductArray.size()] += ("WHERE orderid='" + approvalOrderID + "' AND mname='" + persionMessageObject.getMname() + "') WHERE mname='" + persionMessageObject.getMname() + "';");
		}
		
		/* 执行全部sql语句 */
		SqlUtilsInterface.updateManyInfos(sqls, null);
		
		return true;
	}
	

	public static boolean procRejectOrder(String orderID) {
		// TODO Auto-generated method stub
		 String sqls = "DELETE FROM tb_personmessage WHERE orderid = ?";
		 String params[] = {orderID};
		 
		 SqlUtilsInterface.delInfoFromDB(sqls, params);
		 return true;
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
	
	public String getUsername() {
		return username;
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

	public String getOrderRemark() {
		return orderRemark;
	}

	
}
