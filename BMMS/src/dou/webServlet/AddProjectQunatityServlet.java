package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.ProjectQunatity;

public class AddProjectQunatityServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String projectName = req.getParameter("projectName");
		Float budget = Float.parseFloat(req.getParameter("budget"));
		Float paid = Float.parseFloat(req.getParameter("paid"));
		String remark = null;
		
		if (("" != projectName) && (null != projectName)){
			logger.info("[AddProjectQunatityServlet.java:doPost] projectName: " + projectName + " |  budget: " + budget + " |  paid: " + paid);
			ProjectQunatity projectQunatity = new ProjectQunatity(projectName, budget, paid, remark);
			projectQunatity.addProjectQunatityToDB();
		} else {
			logger.info("[AddProjectQunatityServlet.java:doPost] projectName is null or \"\" !!! projectName : " + projectName + " |  budget: " + budget + " |  paid: " + paid);
		}
	}
}