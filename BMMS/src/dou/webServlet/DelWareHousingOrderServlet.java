package dou.webServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Supplier;
import dou.metaObject.WareHousingOrder;

public class DelWareHousingOrderServlet extends HttpServlet{
	
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
		
		String sWareHousingId = req.getParameter("del_warehousing_id");
		
		if (("" != sWareHousingId) && (null != sWareHousingId)){
			logger.info("[DelWareHousingOrderServlet.java:doPost] WareHousing: " + sWareHousingId);
			WareHousingOrder.delWareHousingOrderFromDB(sWareHousingId);
		} else {
			logger.info("[DelWareHousingOrderServlet.java:doPost] WareHousing name is null or \"\" !!! Name : " + sWareHousingId);
		}
	}
}
