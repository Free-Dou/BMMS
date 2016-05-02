package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class LoginServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		
		logger.info("[LoginServlet.java:doPost] Username: " + username + " |  password: " + password);

		if (SqlUtilsInterface.verifyPwd(username, password)){
			req.getRequestDispatcher("/mainpage.jsp").forward(req, resp);
			logger.info("[LoginServlet.java:doPost] login success !!! Dispatcher to MainPage ");
		}
		else{
			req.getRequestDispatcher("/index.html").forward(req, resp);
			logger.info("[LoginServlet.java:doPost] login failed !!! Dispatcher to index Page");
		}
	}
}
