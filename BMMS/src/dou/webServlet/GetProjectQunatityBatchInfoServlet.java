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
import dou.metaObject.ProjectQunatity;
import dou.metaObject.ProjectQunatityBatch;

public class GetProjectQunatityBatchInfoServlet extends HttpServlet{
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
		ArrayList<ProjectQunatityBatch> projectQunatityBatchList = null;
		
		String username = (String) req.getSession().getAttribute("username");
		if (null == username) {
			return;
		}

		String projectID = req.getParameter("projectID");

		if (("" != projectID) && (null != projectID)) {
			logger.info("[GetProjectQunatityBatchInfoServlet.java:doPost] projectID: " + projectID);
			projectQunatityBatchList = ProjectQunatity.getAllQunatityBatchInfo(projectID);
			
			if (null == projectQunatityBatchList){
				pw.print("null");
			}
			
			try {
				JSONArray allQunatityBatchJson = new JSONArray();

				for (int i = 0; i < projectQunatityBatchList.size(); i++){
					ProjectQunatityBatch qunatityBatch = projectQunatityBatchList.get(i);
					
					if (null == qunatityBatch){
						logger.error("[GetProjectQunatityBatchInfoServlet.java:doPost] qunatityBatch is null!!!  index : " + i);
						break;
					}
					
					JSONObject oneQunatityBatchJson = new JSONObject();
					oneQunatityBatchJson.put("id", qunatityBatch.getBatchID());
					oneQunatityBatchJson.put("project", qunatityBatch.getProjectID());
					oneQunatityBatchJson.put("eachBatch", qunatityBatch.getEachBatch());
					oneQunatityBatchJson.put("price", String.format("%.2f", qunatityBatch.getPrice()));
					oneQunatityBatchJson.put("picLoca", qunatityBatch.getPicLoca());
					oneQunatityBatchJson.put("remark", qunatityBatch.getRemark());
					
					allQunatityBatchJson.put(oneQunatityBatchJson);
				}

				pw.print(allQunatityBatchJson.toString());
				logger.info("[GetProjectQunatityBatchInfoServlet.java:doPost] resp ProjectQunatityBatchInfoServlet json :"
						+ allQunatityBatchJson.toString());
			} catch (Exception e) {
				logger.error("[GetProjectQunatityBatchInfoServlet.java:doPost] resp ProjectQunatityBatchInfoServlet Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.info("[GetProjectQunatityBatchInfoServlet.java:doPost] projectID is null or \"\" !!! projectID : "
					+ projectID);
		}
	}
}
