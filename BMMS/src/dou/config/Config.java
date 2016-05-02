package dou.config;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class Config {

	public static String projectRootPath;
	public static String logPropertiesPath;
	public static String sqlPropertiesPath;
	
	public static Logger getLogger(Class<?> class1){
		PropertyConfigurator.configure(Config.logPropertiesPath);
		/* 每次执行返回结果不同，输入参数为对应的类 */
		return Logger.getLogger(class1);
	}
	
	public static Properties getSqlProperties(){
		Properties sqlProperties = null;
		FileInputStream fileStream = null;
		Logger logger = Config.getLogger(Object.class);
		
		try {
			fileStream = new FileInputStream(new File(sqlPropertiesPath));
			sqlProperties = new Properties();
			sqlProperties.load(fileStream);
			
			logger.info("[Config.java:getSqlProperties] Load Sql Properties success!!!!");
			logger.info("Driver    -->   " + sqlProperties.getProperty("driver"));
			logger.info("Url       -->   " + sqlProperties.getProperty("url"));
			logger.info("User      -->   " + sqlProperties.getProperty("user"));
			logger.info("Password  -->   " + sqlProperties.getProperty("password"));
		} catch (Exception e) {
			logger.error("[Config.java:getSqlProperties] Load Sql Properties Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		} finally {
			if (null != fileStream){
				try {
					fileStream.close();
				} catch (Exception e2) {
					logger.error("[Config.java:getSqlProperties] Close File Stream Failed!!!");
					logger.error("Error Message :" + e2.getMessage());
					e2.printStackTrace();
				}
				
				fileStream = null;
			}
		}
		
		return sqlProperties;
	}
}
