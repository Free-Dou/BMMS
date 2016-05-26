package dou.webServlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import dou.config.Config;
import dou.metaObject.ProjectQunatity;
import dou.metaObject.WareHousingOrder;
import dou.metaObject.WareHousingOrder.WareHousingProduct;

public class GetOneProjectQunatityInfoServlet extends HttpServlet {

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		PrintWriter pw = resp.getWriter();
		
		String username = (String) req.getSession().getAttribute("username");
		if (null == username) {
			return;
		}

		String projectID = req.getParameter("projectID");

		if (("" != projectID) && (null != projectID)) {
			logger.info("[GetOneProjectQunatityInfoServlet.java:doPost] projectID: " + projectID);
			ProjectQunatity projectQunatity = ProjectQunatity.getOneProjectQunatityInfoById(projectID);
			
			if (null == projectQunatity){
				pw.print("null");
			}
			
			try {
				JSONObject oneprojectQunatityJson = new JSONObject();

				oneprojectQunatityJson.put("projectName", projectQunatity.getProjectName());
				oneprojectQunatityJson.put("budget", String.format("%.2f", projectQunatity.getBudget()));
				oneprojectQunatityJson.put("paid", String.format("%.2f", projectQunatity.getPaid()));
				oneprojectQunatityJson.put("contractContent", projectQunatity.getContractContent());
				oneprojectQunatityJson.put("contractNumber", projectQunatity.getContractNumber());
				oneprojectQunatityJson.put("partyA", projectQunatity.getPartyA());
				oneprojectQunatityJson.put("constructLoca", projectQunatity.getConstructLoca());
				oneprojectQunatityJson.put("constructDate", projectQunatity.getConstructDate());
				oneprojectQunatityJson.put("water", projectQunatity.getWater());
				oneprojectQunatityJson.put("waterSelfProduct",
						String.format("%.3f", projectQunatity.getWaterSelfProduct()));
				oneprojectQunatityJson.put("waterBuy", String.format("%.3f", projectQunatity.getWaterBuy()));
				oneprojectQunatityJson.put("waterPrice", String.format("%.2f", projectQunatity.getWaterPrice()));
				oneprojectQunatityJson.put("blackMaterial", projectQunatity.getBlackMaterial());
				oneprojectQunatityJson.put("blackMaterialSelfProduct",
						String.format("%.3f", projectQunatity.getBlackMaterialSelfProduct()));
				oneprojectQunatityJson.put("blackMaterialBuy",
						String.format("%.3f", projectQunatity.getBlackMaterialBuy()));
				oneprojectQunatityJson.put("blackMaterialPrice",
						String.format("%.3f", projectQunatity.getBlackMaterialPrice()));
				oneprojectQunatityJson.put("blackMaterialSell",
						String.format("%.3f", projectQunatity.getBlackMaterialSell()));

				pw.print(oneprojectQunatityJson.toString());
				logger.info("[GetOneProjectQunatityInfoServlet.java:doPost] resp OneProjectQunatityInfo json :"
						+ oneprojectQunatityJson.toString());
			} catch (Exception e) {
				logger.error("[GetOneProjectQunatityInfoServlet.java:doPost] resp OneProjectQunatityInfo Failed!!!");
				logger.error("Error Message : " + e.getMessage());
				e.printStackTrace();
			}
		} else {
			logger.info("[GetOneProjectQunatityInfoServlet.java:doPost] Customer name is null or \"\" !!! projectID : "
					+ projectID);
		}
	}

}
