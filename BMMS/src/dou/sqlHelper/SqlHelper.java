package dou.sqlHelper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import org.apache.log4j.Logger;

import dou.config.Config;

public class SqlHelper {
	
	/* 定义需要的变量,可定义成静态的 */
	private static String driver = null;
	private static String url = null;
	private static String user = null;
	private static String password = null;
	private static Properties properties = null;

	/* 获取配置文件，加载驱动，只需要执行一次 */
	static {
		try {
			properties = Config.getSqlProperties();
			driver = properties.getProperty("driver");
			url = properties.getProperty("url");
			user = properties.getProperty("user");
			password = properties.getProperty("password");
		    /* 加载驱动 */
			Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	Logger logger = Config.getLogger(this.getClass());
	private Connection connect = null;					   	 /* 创建资源对象，数据库访问量小的话，可以做成静态的 */
	private PreparedStatement preparedStatement = null;      /* 防止sql注入漏洞，使用PreparedStatement */
	private ResultSet resultSet = null;

	public PreparedStatement getPreparedStatement() {
		return preparedStatement;
	}

	/* 得到连接 */
	public Connection getConnection() {
		try {
			connect = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			logger.error("[SqlHelper.java:getConnection] Get Connection failed!!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		}
		
		return connect;
	}

	/* 查询方法 */
	public ResultSet executeQuery(String sql, String[] parameters) {
		/* 1.得到链接
		 * 2.创建一个PreparedStatement
		 * 3.填上参数，然后执行查询
		 * 4.返回resultSet
		 */
		connect = getConnection();
		try {
			preparedStatement = connect.prepareStatement(sql);

			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++){
					preparedStatement.setString(i + 1, parameters[i]);
				}
			}

			resultSet = preparedStatement.executeQuery();
		} catch (SQLException e) {
			logger.error("[SqlHelper.java:executeQuery] Sql Query Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
			/* 开发期间如果出错，返回一个。给调用该函数的函数提供选择，可以处理，也可以不处理 */
			throw new RuntimeException(e);
		} finally {
			/* 查询到的数据还在resultSet中，所以此处不能释放资源，需要上层函数取出数据后，再对资源进行释放 */
		}

		return resultSet;
	}

	/* 准对一条sql语句的 update/delete/insert sql 格式： update 表名 set 字段名=？ where 字段=？ */
	public void executeUpdate(String sql, String[] parameters) {
		/* 1.得到链接
		 * 2.创建一个PreparedStatement
		 * 3.填上参数，然后执行查询
		 * 4.返回resultSet
		 */
		connect = getConnection();
		try {
			preparedStatement = connect.prepareStatement(sql);

			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++) {
					preparedStatement.setString(i + 1, parameters[i]);
				}
			}

			preparedStatement.executeUpdate();
			logger.info("[SqlHelper.java:executeUpdate] Sql Update success!!!  sql:" + sql);
		} catch (SQLException e) {
			logger.error("[SqlHelper.java:executeUpdate] Sql Update Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			//e.printStackTrace();
			/* 开发期间如果出错，返回一个。给调用该函数的函数提供选择，可以处理，也可以不处理 */
			//throw new RuntimeException(e);
		} finally {
			/* 关闭资源 */
			closeDB(resultSet, preparedStatement, connect);
		}
	}
	
	/* 关闭数据库访问资源 */
	public void closeDB(ResultSet rs, Statement statement, Connection ct) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				logger.error("[SqlHelper.java:closeDB] ResultSet Close Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
			rs = null; 	/* 交给垃圾处理机制 */
		}
		if (statement != null) {
			try {
				statement.close();
			} catch (SQLException e) {
				logger.error("[SqlHelper.java:closeDB] Statement Close Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
			statement = null;
		}
		if (ct != null) {
			try {
				ct.close();
			} catch (SQLException e) {
				logger.error("[SqlHelper.java:closeDB] Connection Close Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
			ct = null;
		}
	}
}
