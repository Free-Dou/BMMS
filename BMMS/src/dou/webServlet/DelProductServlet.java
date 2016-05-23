package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Product;

public class DelProductServlet extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String pKeyName = req.getParameter("del_product_name");
		
		if (("" != pKeyName) && (null != pKeyName)){
			logger.info("[DelProductServlet.java:doPost] Product: " + pKeyName);
			Product.delProductFromDB(pKeyName);
		} else {
			logger.info("[DelProductServlet.java:doPost] Product name is null or \"\" !!! Name : " + pKeyName);
		}
	}
}
