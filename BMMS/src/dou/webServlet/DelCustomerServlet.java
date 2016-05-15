package dou.webServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.Customer;

public class DelCustomerServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String cKeyName = req.getParameter("del_customer_name");
		
		if (("" != cKeyName) && (null != cKeyName)){
			logger.info("[DelCustomerServlet.java:doPost] Customer: " + cKeyName);
			Customer.delCustomerFromDB(cKeyName);
		} else {
			logger.info("[DelCustomerServlet.java:doPost] Customer name is null or \"\" !!! Name : " + cKeyName);
		}
	}
}
