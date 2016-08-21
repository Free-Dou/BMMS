package dou.webServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.SalesOrder;

public class DelSalesOrderServlet extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String username = (String)req.getSession().getAttribute("username");
		if (null == username){
			return;
		}
		
		String sSalesOrderID = req.getParameter("del_salesorder_id");
		
		if (("" != sSalesOrderID) && (null != sSalesOrderID)){
			logger.info("[DelSalesOrderServlet.java:doPost] salesorder_id: " + sSalesOrderID);
			SalesOrder.delSalesOrderFromDB(sSalesOrderID);
		} else {
			logger.info("[DelSalesOrderServlet.java:doPost] salesorder_id is null or \"\" !!! Name : " + sSalesOrderID);
		}
	}
}
