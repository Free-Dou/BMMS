package dou.webServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Supplier;

public class DelSupplierServlet extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String sKeyName = req.getParameter("del_supplier_name");
		
		if (("" != sKeyName) && (null != sKeyName)){
			logger.info("[DelSupplierServlet.java:doPost] Supplier: " + sKeyName);
			Supplier.delSupplierFromDB(sKeyName);
		} else {
			logger.info("[DelSupplierServlet.java:doPost] Supplier name is null or \"\" !!! Name : " + sKeyName);
		}
	}
}
