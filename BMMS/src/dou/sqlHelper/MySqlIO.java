package dou.sqlHelper;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import dou.BeanObject.WebPageObejct;
import dou.config.Config;

/*
 * 建库    CREATE DATABASE `WebSite` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
 */

public class MySqlIO {
	// 创建静态全局变量
	private SqlHelper sqlHelper = new SqlHelper();

	// 创建日志对象
	private Logger logger = Config.getLogger(this.getClass());

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

	public List<WebPageObejct> getWebPageObejct_List(String table_name) {

		// 将查询的对象以List的形式返回
		List<WebPageObejct> webPageObject_List = null;
		WebPageObejct webPageObject = null;

		String sql = "select * from " + table_name + ";";
		logger.info("getWebPageObejct  " + sql);

		// 执行查询
		ResultSet rs = null;
		try {
			rs = sqlHelper.executeQuery(sql, null);
			while (rs.next()) {

				// 将表的内容提取出来
				String url = rs.getString("webpage_url");
				String abstract_info = rs.getString("webpage_abstract_info");
				String primary_path = rs.getString("webpage_primary_path");
				String mainbody_path = rs.getString("webpage_mainbody_path");

				// 创建列表、对象，执行添加操作
				if (webPageObject_List == null) {
					webPageObject_List = new ArrayList<WebPageObejct>();
				}

				webPageObject = new WebPageObejct(url, abstract_info, primary_path, mainbody_path);
				webPageObject_List.add(webPageObject);

				logger.info("提取信息######################################################");
				logger.info("webpage_url:" + url);
				logger.info("webpage_abstract_info:" + abstract_info);
				logger.info("webpage_primary_path:" + primary_path);
				logger.info("webpage_mainbody_path:" + mainbody_path);

			}

		} catch (SQLException e) {
			logger.error(e.getMessage());
		} finally {
			// 关闭资源
			sqlHelper.closeDB(rs, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}

		return webPageObject_List;

	}

	

	/*
	 * 判断某个表中的某条记录是否存在  通过他的url
	 */
	public boolean findBywebpage_url(String table_name, String webpage_url) {
		
		boolean result = false;
		if(webpage_url==null){
			return result;
		}

		String sql = "select * from " + table_name + " where webpage_url = ?;";
		String[] parameters = { webpage_url };
		ResultSet rs = null;

		logger.info("  findBywebpage_url  :  select * from " + table_name
				+ " where webpage_url = '" + webpage_url + "';");

		rs = sqlHelper.executeQuery(sql, parameters);

		try {
			while (rs.next()) {
				logger.info("url: " + webpage_url + "  has already exist in " + table_name);
				result = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return result;
	}

	public boolean dropTable(String table_name) {

		logger.info("drop table " + table_name);
		String sql = "drop table " + table_name + "";

		logger.info("sql: " + sql);

		return exectueUpdate(sql, null);

	}

	public boolean createTable(String table_name) {

		logger.info("create table " + table_name);

		String sql = "CREATE TABLE " + table_name + " ("
				+ " webpage_url varchar(100) NOT NULL primary key,    "
				+ " webpage_abstract_info varchar(300) NOT NULL ,"
				+ " webpage_primary_path varchar(300) NOT NULL ,"
				+ " webpage_mainbody_path varchar(300) NOT NULL  " + " );";

		logger.info("sql: " + sql);

		return exectueUpdate(sql, null);

	}

//	public boolean updateById(String table_name, WebPageObejct webPageObject) {
//
//		String sql = "update " + table_name + " set webpage_abstract_info = ?,"
//				+ "webpage_primary_path = ?," + "webpage_mainbody_path = ?"
//				+ " where webpage_url = ?;";
//
//		String[] parameters = { webPageObject.getWebpage_abstract_info(),
//				webPageObject.getWebpage_primary_path(), webPageObject.getWebpage_mainbody_path(),
//				webPageObject.getwebpage_url() };
//
//		logger.info("sql: " + sql);
//
//		return exectueUpdate(sql, parameters);
//	}
//
//	public boolean deleteBywebpage_url(String table_name, String webpage_url) {
//
//		String sql = "delete from " + table_name + " where webpage_url = ?;";
//		String[] parameters = { webpage_url };
//
//		logger.info("sql: " + sql);
//		return exectueUpdate(sql, parameters);
//	}

	public boolean insert(String table_name, WebPageObejct webPageObject) {

		String sql = "insert into " + table_name + " values(?,?,?,?);";

		String[] parameters = { webPageObject.getwebpage_url(),
				webPageObject.getWebpage_abstract_info(), webPageObject.getWebpage_primary_path(),
				webPageObject.getWebpage_mainbody_path() };

		logger.info("sql: " + sql);
		return exectueUpdate(sql, parameters);
	}

	// 执行dml语句的方法
	public boolean exectueUpdate(String sql, String[] parameters) {
		boolean result = false;

		try {
			sqlHelper.executeUpdate(sql, parameters);
			result = true;
			logger.info("executeUpdate " + sql + "   result :" + result);
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			sqlHelper.closeDB(null, sqlHelper.getPreparedStatement(), sqlHelper.getConnection());
		}

		return result;
	}

	
}