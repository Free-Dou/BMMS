package dou.config;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;

public class SetConfigServlet extends HttpServlet{

	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		
		/* 加载配置文件的路径 */
		Config.projectRootPath = this.getServletContext().getRealPath("");
		Config.logPropertiesPath = Config.projectRootPath + "/WEB-INF/etc/log4j.properties";
	    Config.sqlPropertiesPath = Config.projectRootPath + "/WEB-INF/etc/dbInfo.properties";
	    System.setProperty("webapp.root", Config.projectRootPath);
	    
		Logger logger = Config.getLogger(this.getClass());
		logger.info("[SetConfigServlet.java:SetConfigServlet] Set Config success!!!!");
		logger.info("projectRootPath		-->    " + Config.projectRootPath);
		logger.info("logPropertiesPath		-->    " + Config.logPropertiesPath);
	}
}
