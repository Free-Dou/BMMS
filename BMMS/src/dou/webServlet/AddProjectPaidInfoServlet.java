package dou.webServlet;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import dou.config.Config;
import dou.metaObject.ProjectPaid;
import dou.metaObject.ProjectQunatityBatch;

public class AddProjectPaidInfoServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String usernameSession = (String)req.getSession().getAttribute("username");
		if (null == usernameSession){
			return;
		}
		
		String username = (String)req.getSession().getAttribute("username");
		if (null == username){
			PrintWriter pw = resp.getWriter();
			pw.print("<script>alert('登录失效，请重新登录'); parent.window.document.location.href = 'index.html'</script>");
		}
		
		String reqParams = getPostParameter(req);
		JSONObject jsonObject = null;
		
		if ((null != reqParams) && (!reqParams.equals(""))){
			try {
				jsonObject = new JSONObject(reqParams);
				
				/* 提取订单数据 */
				String projectID = jsonObject.getString("projectID");
				String payInfo = jsonObject.getString("payInfo");
				String payTime = jsonObject.getString("payTime");
				Long paid = jsonObject.getLong("paid");
				String remark = "NULL";
				
				ProjectPaid projectPaidObject = new ProjectPaid(projectID, payInfo, payTime, paid.floatValue(), remark);
				projectPaidObject.addProjectPaidInfoToDB();
				
				logger.info("[AddProjectPaidInfoServlet.java:doPost] Create projectPaidObject By json success!!!");
			} catch (JSONException e) {
				logger.error("[AddProjectPaidInfoServlet.java:doPost] Create projectPaidObject By json Failed!!! jsonData = " + reqParams);
				logger.error("Error Message : " + e.getMessage());
				/* 可以返回订单提交失败,后期加 */
			}
		}
	}
	
	/* 根据request 获取 post 参数 */
	private String getPostParameter(HttpServletRequest request){
		Logger logger = Config.getLogger(Object.class);
		BufferedInputStream buf = null;
		int iContentLen = request.getContentLength();
		byte sContentTmp[] = new byte[iContentLen];
		String sContent = null;
		
		try {
			buf = new BufferedInputStream(request.getInputStream());
			buf.read(sContentTmp, 0, iContentLen);
			sContent = new String(sContentTmp, 0, iContentLen, "UTF-8");
			logger.info("[AddProjectQunatityBatchServlet.java:getPostParameter] Get WareHousing Post JSON Success!!!  jsonData: " + sContent);
		} catch (Exception e) {
			logger.error("[AddProjectQunatityBatchServlet.java:getPostParameter] Get WareHousing Post JSON Failed!!!");
			logger.error("Error Message : " + e.getMessage());
		} finally {
			try {
				buf.close();
			} catch (IOException e) {
				logger.error("[AddProjectQunatityBatchServlet.java:getPostParameter] close buffer Failed!!!");
				logger.error("Error Message : " + e.getMessage());
			}
		}
		
		return sContent;
	}
}
