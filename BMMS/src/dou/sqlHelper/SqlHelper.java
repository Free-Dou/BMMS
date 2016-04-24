package dou.sqlHelper;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import dou.config.Config;

public class SqlHelper {

	// 创建记录日志的对象

	// 创建资源对象，数据库访问量小的话，可以做成静态的
	private Connection connect = null;
	// 防止sql注入漏洞，使用PreparedStatement
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;

	public PreparedStatement getPreparedStatement() {
		return preparedStatement;
	}

	// 定义需要的变量,可定义成静态的
	private static String driver = null;
	private static String url = null;
	private static String user = null;
	private static String password = null;

	private static Properties properties = null;

	// 获取配置文件，加载驱动，只需要执行一次
	static {
		try {

			// 获取配置文件
			properties = Config.getSqlProperties();

			driver = properties.getProperty("driver");
			url = properties.getProperty("url");
			user = properties.getProperty("user");
			password = properties.getProperty("password");

			// 加载驱动
			Class.forName(driver);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// 得到连接
	public Connection getConnection() {

		try {
			connect = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return connect;
	}

	/*
	 * 查询方法
	 */
	public ResultSet executeQuery(String sql, String[] parameters) {

		// 1.得到链接
		connect = getConnection();

		// 2.创建一个PreparedStatement
		try {
			
			
			preparedStatement = connect.prepareStatement(sql);

			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++)
					preparedStatement.setString(i+1, parameters[i]);
			}

			resultSet = preparedStatement.executeQuery();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {

		}

		return resultSet;

	}

	/*
	 * 准对一条sql语句的 update/delete/insert sql 格式： update 表名 set 字段名=？ where 字段=？
	 */
	public void executeUpdate(String sql, String[] parameters) {

		// 1.得到连接
		connect = getConnection();
		// 2.创建一个preparedStatement
		try {
			preparedStatement = connect.prepareStatement(sql);

			// 设置参数
			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++) {
					preparedStatement.setString(i + 1, parameters[i]);
				}
			}

			preparedStatement.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 开发期间如果出错，返回一个
			// 给调用该函数的函数提供选择，可以处理，也可以不处理
			throw new RuntimeException(e);
		} finally {
			// 关闭资源
			closeDB(resultSet, preparedStatement, connect);
		}
	}

	/*
	 * 如果有多个update/delete/insert[需要考虑事务]
	 */
	public void executeUpdateForSqls(String[] sql, String[][] parameters) {

		// 1.得到连接
		connect = getConnection();

		// 2.创建一个preparedStatement
		try {

			// 设置事务方法
			connect.setAutoCommit(false);

			for (int i = 0; i < sql.length; i++) {

				preparedStatement = connect.prepareStatement(sql[i]);

				// 设置参数
				if (parameters[i] != null) {
					for (int j = 0; j < parameters[i].length; j++) {
						preparedStatement.setString(j + 1, parameters[i][j]);
					}
				}
				preparedStatement.executeUpdate();

			}

			connect.commit();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			// 如果sql语句中任何一句出错了，则可以整体回滚
			try {
				connect.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}

			// 开发期间如果出错，返回一个
			// 给调用该函数的函数提供选择，可以处理，也可以不处理
			throw new RuntimeException(e);
		} finally {
			// 关闭资源
			closeDB(resultSet, preparedStatement, connect);
		}

	}

	public void closeDB(ResultSet rs, Statement statement, Connection ct) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			rs = null; // 交给垃圾回收机制
		}
		if (statement != null) {
			try {
				statement.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			statement = null;
		}
		if (ct != null) {
			try {
				ct.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				// 开发阶段
				e.printStackTrace();
			}
			ct = null;
		}
	}
}
