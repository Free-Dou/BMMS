package dou.webServlet;

import java.io.IOException;
import java.io.PrintWriter;

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
		
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		
		Logger logger = Config.getLogger(this.getClass());
		PrintWriter pw = resp.getWriter();
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		Integer usergrade = 0;
		logger.info("[LoginServlet.java:doPost] Username: " + username + " |  password: " + password);

		if (true == SqlUtilsInterface.verifyPwd(username, password)){
			usergrade = SqlUtilsInterface.getUserGrade(username);
			req.getSession().setMaxInactiveInterval(20 * 60);	/* 设置session失效时间(发呆时间)，单位是秒 */
			//req.getSession().setMaxInactiveInterval(5);
			req.getSession().setAttribute("username", username);
			req.getSession().setAttribute("usergrade", usergrade);			/* 获取用户权限，待实现 */
			//req.getRequestDispatcher("/mainpage.jsp").forward(req, resp);
			
			logger.info("[LoginServlet.java:doPost] login success !!! Dispatcher to MainPage ");
			pw.print("success");
		}
		else{
			//req.getRequestDispatcher("/index.html").forward(req, resp);
			
			logger.info("[LoginServlet.java:doPost] login failed !!! Dispatcher to index Page");
			pw.print("failed");
		}
	}
}
