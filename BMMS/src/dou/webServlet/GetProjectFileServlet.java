package dou.webServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import dou.config.Config;
import dou.metaObject.ProjectFile;
import dou.metaObject.ProjectPaid;
import dou.metaObject.ProjectQunatity;
import dou.metaObject.ProjectQunatityBatch;

public class GetProjectFileServlet extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		PrintWriter pw = resp.getWriter();
		ArrayList<ProjectFile> fileList = null;
		
		String username = (String) req.getSession().getAttribute("username");
		if (null == username) {
			return;
		}

		String projectID = req.getParameter("projectID");

		if (("" != projectID) && (null != projectID)) {
			logger.info("[GetProjectFileServlet.java:doPost] projectID: " + projectID);
			fileList = ProjectFile.getAllFileInfoFromDB(projectID);
			
			if (null == fileList){
				pw.print("null");
			}
			
			try {
				JSONArray allPaidInfoJson = new JSONArray();

				for (int i = 0; i < fileList.size(); i++){
					ProjectFile fileInfo = fileList.get(i);
					
					if (null == fileInfo){
						logger.error("[GetProjectFileServlet.java:doPost] fileInfo is null!!!  index : " + i);
						break;
					}
					
					JSONObject oneFileInfoJson = new JSONObject();
					oneFileInfoJson.put("fildId", fileInfo.getId());
					oneFileInfoJson.put("projectID", fileInfo.getProjectID());
					oneFileInfoJson.put("fileName", fileInfo.getFileName());
					oneFileInfoJson.put("remark", fileInfo.getRemark());
					
					allPaidInfoJson.put(oneFileInfoJson);
				}  

				pw.print(allPaidInfoJson.toString());
				logger.info("[GetProjectPaidInfoServlet.java:doPost] resp GetProjectPaidInfoServlet json :"
						+ allPaidInfoJson.toString());
			} catch (Exception e) {
				logger.error("[GetProjectPaidInfoServlet.java:doPost] resp GetProjectPaidInfoServlet Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.info("[GetProjectPaidInfoServlet.java:doPost] projectID is null or \"\" !!! projectID : "
					+ projectID);
		}
	}
}
