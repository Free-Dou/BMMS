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
		String fileName = req.getParameter("filename");
		String fileSaveRootPath = Config.fileSavedFolderPath;
		String path = fileSaveRootPath + "/" + fileName;
		
		File file = new File(path);
		
		if(!file.exists()){
			/* 是否要输出结果信息？？？ */
			PrintWriter pw = resp.getWriter();
			logger.error("Download file error!!! file is not exist!!! file : " + path);
			return;
		}
		
		/* 设置响应头，控制浏览器下载该文件 */
		resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
		
		/* 读取要下载的文件，保存到文件输入流 */
		FileInputStream in = new FileInputStream(path);
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
