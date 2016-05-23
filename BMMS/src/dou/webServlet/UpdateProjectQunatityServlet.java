package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.ProjectQunatity;

public class UpdateProjectQunatityServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String usernameSession = (String)req.getSession().getAttribute("username");
		if (null == usernameSession){
			return;
		}
		
		String projectID = req.getParameter("projectID");
		Float budget = Float.parseFloat(req.getParameter("budget"));
		Float paid = Float.parseFloat(req.getParameter("paid"));
		String remark = null;
		
		if (("" != projectID) && (null != projectID)){
			logger.info("[AddProjectQunatityServlet.java:doPost] projectID: " + projectID + " |  budget: " + budget + " |  paid: " + paid);
			ProjectQunatity.updateProjectQunatityToDB(budget, paid, projectID);
		} else {
			logger.info("[AddProjectQunatityServlet.java:doPost] projectID is null or \"\" !!! projectID : " + projectID + " |  budget: " + budget + " |  paid: " + paid);
		}
	}
}