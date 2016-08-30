package dou.webServlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.ProjectFile;
import dou.sqlHelper.SqlUtilsInterface;

public class DelFileServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Logger logger = Config.getLogger(this.getClass());
		resp.setCharacterEncoding("utf-8");
		req.setCharacterEncoding("utf-8");
		
		/* 获取文件名和projectID */
		String projectID = req.getParameter("projectID");
		if (("" != projectID) && (null != projectID)){
			logger.info("[DelFileServlet.java:doPost] Delete file for project whick Id = " + projectID);
		} else {
			logger.info("[DelFileServlet.java:doPost] Delete file for project failed !!!  ID is null or \"\" !!! id = " + projectID);
			return;
		}
		
		String fileName = req.getParameter("fileName");
		if (("" != fileName) && (null != fileName)){
			logger.info("[DelFileServlet.java:doPost] Delete for fileName whick Id = " + fileName);
		} else {
			logger.error("[DelFileServlet.java:doPost] Delete for fileName failed !!!  fileName is null or \"\" !!! fileName = " + fileName);
			return;
		}
		
		/* 根据工程id和文件名，删除文件 */
		String savedPath = SqlUtilsInterface.searchSavedPathFromDB(projectID, fileName);
		if (null == savedPath){
			logger.error("[DelFileServlet.java:doPost] Delete for project failed!!!  file is not exit!!! id = " + projectID + " fileName = " + fileName);
			return;
		}
		ProjectFile fileInfo = new ProjectFile(projectID, fileName, savedPath, null);
		fileInfo.delFile();
		logger.info("[DelFileServlet.java:doPost] Delete for project success !!!!   fileName： " + fileName);
	}
}
