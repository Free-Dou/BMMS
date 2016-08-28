package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.ProjectPaid;
import dou.metaObject.ProjectQunatityBatch;

public class DelProjectPaidInfoServlet extends HttpServlet{
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
		
		String id = req.getParameter("id");
		
		if (("" != id) && (null != id)){
			logger.info("[DelProjectPaidServlet.java:doPost] Del ProjectPaidInfo whick Id = " + id);
			ProjectPaid.delProjectPaidInfoToDB(id);
		} else {
			logger.info("[DelProjectPaidServlet.java:doPost] Del ProjectPaidInfo failed !!!  ID is null or \"\" !!! id = " + id);
		}
	}
}
