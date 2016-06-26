package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.ProjectQunatityBatch;

public class DelProjectQunatityBatchServlet extends HttpServlet{
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
			logger.info("[DelProjectQunatityBatchServlet.java:doPost] ProjectQunatityBatchID: " + id);
			ProjectQunatityBatch.delQunatityBatchFromDB(id);
		} else {
			logger.info("[DelProjectQunatityBatchServlet] Project QunatityBatch ID is null or \"\" !!! ProjectQunatityBatchID : " + id);
		}
	}
}
