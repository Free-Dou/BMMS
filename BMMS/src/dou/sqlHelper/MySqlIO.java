package dou.sqlHelper;

import java.sql.Connection;
import java.sql.DatabaseMetaData; 
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Customer;
import dou.metaObject.MaterialInStock;
import dou.metaObject.PersionMessage;
import dou.metaObject.Product;
import dou.metaObject.Supplier;
import dou.metaObject.SystemMessage;

public class MySqlIO {

	private SqlHelper sqlHelper = new SqlHelper();
	private Logger logger = Config.getLogger(this.getClass());
	
	/* 检查用户名和密码的正确性 */
	public boolean verifyPwd(String userName, String pwd) {
		boolean result = false;
		String sql = "select * from tb_user where username = ? and pwd = MD5(?);";
		pwd = "20160518" + pwd;
		String[] parameters = {userName, pwd};
		ResultSet resultSet = null;
		
		if ((null == userName) || (null == pwd)){
			logger.error("[MySqlIO.java:verifyPwd]Verify pwd Error: userName == NULL || pwd == NULL");
			return result;
		}

		logger.info("[MySqlIO.java:verifyPwd] "+ sql + "    params: username = '" + userName + "'  pwd = '" + pwd + "'  salt = '20160518';");
		resultSet = sqlHelper.executeQuery(sql, parameters);

		try {
			if (resultSet.next()) {
				logger.info("[MySqlIO.java:verifyPwd] Query success !!!");
				result = true;
			}
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:verifyPwd] Verify pwd Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(resultSet, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return result;
	}
	
	/* 获取用户权限 */
	public Integer getUserGrade(String userName) {
		Integer userGrade = 0;
		String sql = "select grade from tb_user where username=?";
		ResultSet resultSet = null;
		String parameters[] = {userName};
		
		if (null == userName){
			logger.error("[MySqlIO.java:getUserGrade]Get user grade Error: userName == NULL");
			return 0;
		}
		
		logger.info("[MySqlIO.java:getUserGrade] username = " + userName + ";");
		resultSet = sqlHelper.executeQuery(sql, parameters);
		try {
			if (resultSet.next()) {
				userGrade = resultSet.getInt("grade");
				logger.info("[MySqlIO.java:getUserGrade] getUserGrade success !!! grade = " + userGrade + ";");
			}
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getUserGrade] getUserGrade Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(resultSet, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return userGrade;
	}
	
	/* 获取全部客户信息 */
	public ArrayList<Customer> getAllCustomerInfo(){
		ArrayList<Customer> customerList = null;
		Customer customerObject = null;
		String sql = "select * from tb_custom order by CONVERT(cname using GBK);";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getCustomerInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String cName = rs.getString("cname");
				String cTel = rs.getString("ctel");
				String cFax = rs.getString("cfax");
				String cEmail = rs.getString("cemail");
				String cAddress = rs.getString("cadress");
				String cContact1 = rs.getString("contact1");
				String cContact2 = rs.getString("contact2");
				String cRemark = rs.getString("remark");
				
				if (null == customerList){
					customerList = new ArrayList<Customer>();
				}
								
				customerObject = new Customer(cName, cTel, cFax, cEmail, cAddress, cContact1, cContact2, cRemark);
				customerList.add(customerObject);
			}
			
			logger.info("[MySqlIO.java:getCustomerInfo] Get all Customer Info Success!!!");
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getCustomerInfo] Get Customer Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return customerList; 
	}
	
	/* 获得全部产品信息 */
	public ArrayList<Product> getAllProductInfo() {
		ArrayList<Product> productList = null;
		Product productObject = null;
		String sql = "select * from tb_product order by CONVERT(pname using GBK);";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getCustomerInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String pName = rs.getString("pname");
				String pSpec = rs.getString("pspec");
				Integer pPrice = rs.getInt("pprice");
				
				if (null == productList){
					productList = new ArrayList<Product>();
				}
				
				productObject = new Product(pSpec, pName, pPrice);
				productList.add(productObject);
			}
			
			logger.info("[MySqlIO.java:getProductInfo] Get all Product Info Success!!!");
		} catch (Exception e) {
			logger.error("[MySqlIO.java:getProductInfo] Get Product Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return productList;
	}
	
	/* 获取全部供应商信息 */
	public ArrayList<Supplier> getAllSupplierInfo() {
		ArrayList<Supplier> supplierList = null;
		Supplier supplierObject = null;
		String sql = "select * from tb_supply order by CONVERT(sname using GBK);";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getCustomerInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String sName = rs.getString("sname");
				String sTel = rs.getString("stel");
				String sFax = rs.getString("sfax");
				String sEmail = rs.getString("smail");
				String sAddress = rs.getString("sadress");
				String sContact1 = rs.getString("contact1");
				String sContact2 = rs.getString("contact2");
				String sRemark = rs.getString("remark");
				
				if (null == supplierList){
					supplierList = new ArrayList<Supplier>();
				}
								
				supplierObject = new Supplier(sName, sTel, sFax, sEmail, sAddress, sContact1, sContact2, sRemark);
				supplierList.add(supplierObject);
			}
			
			logger.info("[MySqlIO.java:getSupplierInfo] Get all Supplier Info Success!!!");
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getSupplierInfo] Get Supplier Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return supplierList; 
	}

	/* 提取库存信息 */
	public ArrayList<MaterialInStock> getAllMatrialInStockInfo() {
		ArrayList<MaterialInStock> materialInStockList = null;
		MaterialInStock materialInStockObject = null;
		String sql = "select * from tb_materialstock";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getAllMatrialInStockInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String mPSpec = rs.getString("mpspec");
				String mName = rs.getString("mname");
				Float number = rs.getFloat("number");
				String ctime = rs.getString("ctime");
				String stockloca = rs.getString("stockloca");
				String remark = rs.getString("remark");
				
				if (null == materialInStockList){
					materialInStockList = new ArrayList<MaterialInStock>();
				}
								
				materialInStockObject = new MaterialInStock(mPSpec, mName, number, ctime, stockloca, remark);
				materialInStockList.add(materialInStockObject);
			}
			
			logger.info("[MySqlIO.java:getAllMatrialInStockInfo] Get all MatrialInStock Info Success!!!");
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getAllMatrialInStockInfo] Get MatrialInStock Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return materialInStockList;
	}
	
	/* 获取系统消息 */
	public ArrayList<SystemMessage> getAllSystemMessageInfo() {
		ArrayList<SystemMessage> systemMessageList = null;
		SystemMessage systemMessageObject = null;
		String sql = "SELECT * FROM tb_systemmessage ORDER BY id DESC;";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getAllSystemMessageInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String sMessageName = rs.getString("sMessagename");
				String sMessage = rs.getString("sMessage");
				String userName = rs.getString("userName");
				String time = rs.getString("time");
				
				if (null == systemMessageList){
					systemMessageList = new ArrayList<SystemMessage>();
				}
								
				systemMessageObject = new SystemMessage(sMessageName, sMessage, time, userName);
				systemMessageList.add(systemMessageObject);
			}
			
			logger.info("[MySqlIO.java:getAllSystemMessageInfo] Get all SystemMessage Info Success!!!");
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getAllSystemMessageInfo] Get SystemMessage Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return systemMessageList;
	}
	

	public ArrayList<PersionMessage> getAllpersionMessageListInfo() {
		ArrayList<PersionMessage> persionMessageList = null;
		PersionMessage persionMessageObject = null;
		String sql = "SELECT * FROM tb_personmessage ORDER BY id DESC;";
		ResultSet rs = null;
		
		logger.info("[MySqlIO.java:getAllpersionMessageListInfo] " + sql);
		rs = sqlHelper.executeQuery(sql, null);
		try {
			/* 提取数据 */
			while (rs.next()){
				String orderid = rs.getString("orderid");
				String mname = rs.getString("mname");
				String carNum = rs.getString("carNum");
				String mpspec = rs.getString("mpspec");
				Float  number = rs.getFloat("number");
				String stockLoca = rs.getString("stockLoca");
				Float  price = rs.getFloat("price");
				Float  totalPrice = rs.getFloat("totalPrice");
				String username = rs.getString("username");
				String createTime = rs.getString("createTime");
				String relationName = rs.getString("relationName");
				Integer operation = rs.getInt("operation");
				String approval = rs.getString("approval");
				String remark = rs.getString("remark");
				String orderRemark = rs.getString("orderRemark");
				
				if (null == persionMessageList){
					persionMessageList = new ArrayList<PersionMessage>();
				}
				
				persionMessageObject = new PersionMessage(orderid, mname, carNum, mpspec, 
														number, stockLoca, price, totalPrice,
														username, createTime, relationName, 
														operation, approval, remark, orderRemark);
				persionMessageList.add(persionMessageObject);
			}
			
			logger.info("[MySqlIO.java:getAllpersionMessageListInfo] Get all persion message Info Success!!!");
		} catch (SQLException e) {
			logger.error("[MySqlIO.java:getAllpersionMessageListInfo] Get persion message Info Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			/* 关闭资源 */
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}
		
		return persionMessageList;
	}
	
	/* 添加信息到数据库 */
	public void addInfoToDB(String sql, String[] parameters) {
		
		logger.info("[MySqlIO.java:addInfoToDB] Add info to DB: " + sql);
		for (int i = 0; i <  parameters.length; i++){
			logger.info("[MySqlIO.java:addInfoToDB] info " + i + " : " + parameters[i]);
		}
		
		sqlHelper.executeUpdate(sql, parameters);
	}
	
	/* 执行多条更新操作 */
	public void updateManyInfos(String[] sqls, String[][] parameters){
		
		for (int i = 0; i <  sqls.length; i++){
			logger.info("[MySqlIO.java:addInfoToDB] sql " + i + " : " + sqls[i]);
			for (int j = 0; j <  parameters.length; j++){
				logger.info("[MySqlIO.java:addInfoToDB] info " + j + " : " + parameters[i][j]);
			}
		}
		
		sqlHelper.executeUpdateForSqls(sqls, parameters);
	}
	
	/* 从数据库删除数据 */
	public void delInfoFromDB(String sql, String[] parameters) {
		
		logger.info("[MySqlIO.java:delInfoFromDB] del info from DB: " + sql);
		for (int i = 0; i <  parameters.length; i++){
			logger.info("[MySqlIO.java:delInfoFromDB] info " + i + " : " + parameters[i]);
		}
		
		sqlHelper.executeUpdate(sql, parameters);
	}

	// 判断某张表是否存在
	public boolean checkTablesLife(String table_name) {

		boolean result = false;
		Connection ct = null;
		ResultSet rs = null;
		try {
			ct = sqlHelper.getConnection();
			DatabaseMetaData meta = ct.getMetaData();
			rs = meta.getTables(null, null, table_name, null);
			result = rs.next();

		} catch (SQLException e) {
			logger.error(e.getMessage());
		} finally {
			// 关闭资源
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), ct);
		}
		return result;
	}

//	public List<WebPageObejct> getWebPageObejct_List(String table_name) {
//
//		// 将查询的对象以List的形式返回
//		List<WebPageObejct> webPageObject_List = null;
//		WebPageObejct webPageObject = null;
//
//		String sql = "select * from " + table_name + ";";
//		logger.info("getWebPageObejct  " + sql);
//
//		// 执行查询
//		ResultSet rs = null;
//		try {
//			rs = sqlHelper.executeQuery(sql, null);
//			while (rs.next()) {
//
//				// 将表的内容提取出来
//				String url = rs.getString("webpage_url");
//				String abstract_info = rs.getString("webpage_abstract_info");
//				String primary_path = rs.getString("webpage_primary_path");
//				String mainbody_path = rs.getString("webpage_mainbody_path");
//
//				// 创建列表、对象，执行添加操作
//				if (webPageObject_List == null) {
//					webPageObject_List = new ArrayList<WebPageObejct>();
//				}
//
//				webPageObject = new WebPageObejct(url, abstract_info, primary_path, mainbody_path);
//				webPageObject_List.add(webPageObject);
//
//				logger.info("提取信息######################################################");
//				logger.info("webpage_url:" + url);
//				logger.info("webpage_abstract_info:" + abstract_info);
//				logger.info("webpage_primary_path:" + primary_path);
//				logger.info("webpage_mainbody_path:" + mainbody_path);
//
//			}
//
//		} catch (SQLException e) {
//			logger.error(e.getMessage());
//		} finally {
//			// 关闭资源
//			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
//		}
//
//		return webPageObject_List;
//
//	}
//
//	
//
//	/*
//	 * 判断某个表中的某条记录是否存在  通过他的url
//	 */
//	public boolean findBywebpage_url(String table_name, String webpage_url) {
//		
//		boolean result = false;
//		if(webpage_url==null){
//			return result;
//		}
//
//		String sql = "select * from " + table_name + " where webpage_url = ?;";
//		String[] parameters = { webpage_url };
//		ResultSet rs = null;
//
//		logger.info("  findBywebpage_url  :  select * from " + table_name
//				+ " where webpage_url = '" + webpage_url + "';");
//
//		rs = sqlHelper.executeQuery(sql, parameters);
//
//		try {
//			while (rs.next()) {
//				logger.info("url: " + webpage_url + "  has already exist in " + table_name);
//				result = true;
//			}
//		} catch (SQLException e) {
//			e.printStackTrace();
//			logger.error(e.getMessage());
//		}
//		return result;
//	}
//
//	public boolean dropTable(String table_name) {
//
//		logger.info("drop table " + table_name);
//		String sql = "drop table " + table_name + "";
//
//		logger.info("sql: " + sql);
//
//		return exectueUpdate(sql, null);
//
//	}
//
//	public boolean createTable(String table_name) {
//
//		logger.info("create table " + table_name);
//
//		String sql = "CREATE TABLE " + table_name + " ("
//				+ " webpage_url varchar(100) NOT NULL primary key,    "
//				+ " webpage_abstract_info varchar(300) NOT NULL ,"
//				+ " webpage_primary_path varchar(300) NOT NULL ,"
//				+ " webpage_mainbody_path varchar(300) NOT NULL  " + " );";
//
//		logger.info("sql: " + sql);
//
//		return exectueUpdate(sql, null);
//
//	}
//
////	public boolean updateById(String table_name, WebPageObejct webPageObject) {
////
////		String sql = "update " + table_name + " set webpage_abstract_info = ?,"
////				+ "webpage_primary_path = ?," + "webpage_mainbody_path = ?"
////				+ " where webpage_url = ?;";
////
////		String[] parameters = { webPageObject.getWebpage_abstract_info(),
////				webPageObject.getWebpage_primary_path(), webPageObject.getWebpage_mainbody_path(),
////				webPageObject.getwebpage_url() };
////
////		logger.info("sql: " + sql);
////
////		return exectueUpdate(sql, parameters);
////	}
////
////	public boolean deleteBywebpage_url(String table_name, String webpage_url) {
////
////		String sql = "delete from " + table_name + " where webpage_url = ?;";
////		String[] parameters = { webpage_url };
////
////		logger.info("sql: " + sql);
////		return exectueUpdate(sql, parameters);
////	}
//
//	public boolean insert(String table_name, WebPageObejct webPageObject) {
//
//		String sql = "insert into " + table_name + " values(?,?,?,?);";
//
//		String[] parameters = { webPageObject.getwebpage_url(),
//				webPageObject.getWebpage_abstract_info(), webPageObject.getWebpage_primary_path(),
//				webPageObject.getWebpage_mainbody_path() };
//
//		logger.info("sql: " + sql);
//		return exectueUpdate(sql, parameters);
//	}
//
//	// 执行dml语句的方法
//	public boolean exectueUpdate(String sql, String[] parameters) {
//		boolean result = false;
//
//		try {
//			sqlHelper.executeUpdate(sql, parameters);
//			result = true;
//			logger.info("executeUpdate " + sql + "   result :" + result);
//		} catch (Exception e) {
//			logger.error(e.getMessage());
//		} finally {
//			sqlHelper.closeDB(null, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
//		}
//
//		return result;
//	}

	
}