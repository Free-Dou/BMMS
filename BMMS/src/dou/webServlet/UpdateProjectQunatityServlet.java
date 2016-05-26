package dou.webServlet;

import java.io.BufferedInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import dou.config.Config;
import dou.metaObject.ProjectQunatity;

public class UpdateProjectQunatityServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String usernameSession = (String)req.getSession().getAttribute("username");
		if (null == usernameSession){
			return;
		}
			
		String reqParams = getPostParameter(req);
		JSONObject jsonObject = null;

		if ((null != reqParams) && (!reqParams.equals(""))) {
			try {
				jsonObject = new JSONObject(reqParams);

				/* 提取订单数据 */
				String projectID = jsonObject.getString("projectID");
				String projectName = jsonObject.getString("projectName");
				Float budget = Float.parseFloat(jsonObject.getString("budget")); /* 两位小数 */
				Float paid = Float.parseFloat(jsonObject.getString("paid")); /* 两位小数 */
				String contractContent = jsonObject.getString("contractContent");
				String contractNumber = jsonObject.getString("contractNumber");
				String partyA = jsonObject.getString("partyA");
				String constructLoca = jsonObject.getString("constructLoca");
				String constructDate = jsonObject.getString("constructDate");
				String water = jsonObject.getString("water");
				Float waterSelfProduct = Float.parseFloat(jsonObject.getString("waterSelfProduct")); /* 3位小数 */
				Float waterBuy = Float.parseFloat(jsonObject.getString("waterBuy")); /* 3位小数 */
				Float waterPrice = Float.parseFloat(jsonObject.getString("waterPrice")); /* 2位小数 */
				String blackMaterial = jsonObject.getString("blackMaterial");
				Float blackMaterialSelfProduct = Float
						.parseFloat(jsonObject.getString("blackMaterialSelfProduct")); /* 3位小数 */
				Float blackMaterialBuy = Float.parseFloat(jsonObject.getString("blackMaterialBuy")); /* 3位小数 */
				Float blackMaterialPrice = Float.parseFloat(jsonObject.getString("blackMaterialPrice")); /* 2位小数 */
				Float blackMaterialSell = Float.parseFloat(jsonObject.getString("blackMaterialSell")); /* 2位小数 */
				String remark = null;

				ProjectQunatity projectQunatity = new ProjectQunatity(projectName, budget, paid, contractContent,
						contractNumber, partyA, constructLoca, constructDate, water, waterSelfProduct, waterBuy,
						waterPrice, blackMaterial, blackMaterialSelfProduct, blackMaterialBuy, blackMaterialPrice,
						blackMaterialSell, remark);
				projectQunatity.updateProjectQunatityToDB(projectID);;

				logger.info("[AddProjectQunatityServlet.java:doPost] projectID: " + projectID);
			} catch (JSONException e) {
				logger.error(
						"[AddProjectQunatityServlet.java:doPost] Create ProjectQunatity Object By json Failed!!! jsonData = "
								+ reqParams);
				logger.error("Error Message : " + e.getMessage());
				/* 可以返回提交失败,后期加 */
			}
		}
	}
	
	/* 根据request 获取 post 参数 */
	private String getPostParameter(HttpServletRequest request) {
		Logger logger = Config.getLogger(Object.class);
		BufferedInputStream buf = null;
		int iContentLen = request.getContentLength();
		byte sContentTmp[] = new byte[iContentLen];
		String sContent = null;

		try {
			buf = new BufferedInputStream(request.getInputStream());
			buf.read(sContentTmp, 0, iContentLen);
			sContent = new String(sContentTmp, 0, iContentLen, "UTF-8");
			logger.info(
					"[UpdateProjectQunatityServlet.java:getPostParameter] Get ProjectQunatity Post JSON Success!!!  jsonData: "
							+ sContent);
		} catch (Exception e) {
			logger.error("[UpdateProjectQunatityServlet.java:getPostParameter] Get ProjectQunatity Post JSON Failed!!!");
			logger.error("Error Message : " + e.getMessage());
		} finally {
			try {
				buf.close();
			} catch (IOException e) {
				logger.error("[UpdateProjectQunatityServlet.java:getPostParameter] close buffer Failed!!!");
				logger.error("Error Message : " + e.getMessage());
			}
		}

		return sContent;
	}
}