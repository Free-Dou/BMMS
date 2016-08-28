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

public class DownloadFileServlet extends HttpServlet {

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
		String projectID = req.getParameter("projectID ");
		if (("" != projectID) && (null != projectID)){
			logger.info("[UploadFileServlet.java:doPost] download file for project whick Id = " + projectID);
		} else {
			logger.info("[UploadFileServlet.java:doPost] download file for project failed !!!  ID is null or \"\" !!! id = " + projectID);
			return;
		}
		
		String fileName = req.getParameter("filename");
		if (("" != fileName) && (null != fileName)){
			logger.info("[UploadFileServlet.java:doPost] UploadFile for project whick Id = " + fileName);
		} else {
			logger.info("[UploadFileServlet.java:doPost] UploadFile for project failed !!!  ID is null or \"\" !!! id = " + fileName);
			return;
		}
		
		/* 根据工程id和文件名，查找文件的保存路径 */
		String savedPath = ProjectFile.searchSavedPathFromDB(projectID, fileName);
		File file = new File(savedPath);
		
		if(!file.exists()){
			/* 是否要输出结果信息？？？ */
			PrintWriter pw = resp.getWriter();
			logger.error("Download file error!!! file is not exist!!! file : " + savedPath);
			return;
		}
		
		/* 设置响应头，控制浏览器下载该文件 */
		resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
		
		/* 读取要下载的文件，保存到文件输入流 */
		FileInputStream in = new FileInputStream(savedPath);
		OutputStream out = resp.getOutputStream();
		
		byte buffer[] = new byte[1024];
		int len = 0;
		while((len = in.read(buffer)) > 0){
			out.write(buffer, 0, len);			
		}
		
		/* 释放资源 */
		in.close();
		out.close();
		logger.info("Download file success!!!");
	}
}
