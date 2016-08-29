package dou.webServlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.Product;
import dou.metaObject.ProjectFile;

public class UploadFileServlet extends HttpServlet{

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
		PrintWriter pw = resp.getWriter();
		
		/* 获取projectId */
		String projectId = req.getParameter("projectID");
		if (("" != projectId) && (null != projectId)){
			logger.info("[UploadFileServlet.java:doPost] UploadFile for project whick Id = " + projectId);
		} else {
			logger.info("[UploadFileServlet.java:doPost] UploadFile for project failed !!!  ID is null or \"\" !!! id = " + projectId);
			return;
		}
		
		/* 得到上传文件的保存目录，将上传文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全 */
		String savePath = Config.fileSavedFolderPath + "/" + projectId;
		logger.info("[UploadFileServlet.java:doPost] File Be Saved Path: " + savePath);
		
		/* 判断上传文件的保存目录是否存在 */
		File folder = new File(savePath);
		if (!(folder.exists() && folder.isDirectory())) {
			logger.info("[UploadFileServlet.java:doPost] Path: " + savePath + " is not exist ! Need Create! ");
			folder.mkdir();
		}

		/* 使用Apache文件上传组件处理文件上传步骤 */
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		upload.setHeaderEncoding("utf-8");
		if (!ServletFileUpload.isMultipartContent(req)) {
			logger.error("[UploadFileServlet.java:doPost] Upload file failed !!!  Fail Code : 1");
			pw.print("文件上传失败！");
			
			return;
		}
		
		logger.info("[UploadFileServlet.java:doPost] start upload file!!!!!!!!!!!!!!!!");
		try {
			List<FileItem> list = upload.parseRequest(req);
			
			for(FileItem item : list){
				String fileName = item.getName();
				if(fileName == null || fileName.trim().equals("")){
					continue;
				}
				
				/* 获取文件名 */   
				fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
				logger.info("[UploadFileServlet.java:doPost] get filename ： " + fileName);
				
				/* 创建文件输出流，注意linux系统和windows系统的路径表示的差异，Linux：／   windows：\\ */
				InputStream fileInSteam = item.getInputStream();
				FileOutputStream fileOutStream = new FileOutputStream(savePath + "/" + fileName);
				
				/* 保存文件 */
				byte buffer[] = new byte[1024];
				int len = 0;
				while((len = fileInSteam.read(buffer)) > 0){
					fileOutStream.write(buffer, 0, len);
				}
				
				/* 添加数据到数据库 */
				ProjectFile fileObject = new ProjectFile(projectId, fileName, (savePath + "/" + fileName), null);
				fileObject.addFileToDB();
				logger.info("[UploadFileServlet.java:doPost] Upload file info to DB !!! filename ： " + fileName);
				
				/* 释放资源 */
				fileInSteam.close();
				fileOutStream.close();
				item.delete();
			}
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			logger.error("[UploadFileServlet.java:doPost] Upload file failed !!!  Fail Code : 2");
			logger.error("Error Message : " + e.getMessage());
			pw.print("文件上传失败！");
		}
		
		logger.info("文件上传成功");
		//req.setAttribute("message", message);
		//req.getRequestDispatcher("/ListFile").forward(req, resp);
	}
}
