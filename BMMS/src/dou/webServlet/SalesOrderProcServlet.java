package dou.webServlet;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import dou.config.Config;
import dou.metaObject.SalesOrder;

public class SalesOrderProcServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
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
				logger.info("[SalesOrderProcServlet.java:doPost] Create jsonObject success!!!");
				
				/* 提取订单数据 */
				String orderID = jsonObject.getString("orderID");
				String carNum = jsonObject.getString("carNum");
				String stockLoca = jsonObject.getString("stockLoca");
				String customerName = jsonObject.getString("name");
				String orderRemark = jsonObject.getString("remark");
				JSONArray productJsonArray = jsonObject.getJSONArray("Product");
				
				SalesOrder salesOrder = new SalesOrder(orderID, carNum, stockLoca, username, customerName, orderRemark);
				for (int i = 0; i < productJsonArray.length(); i++){
					JSONObject productJson = (JSONObject)productJsonArray.get(i);
					String pSpec = productJson.getString("SN");
					String pName = productJson.getString("Name");
					Long pCount = productJson.getLong("Count");
					Long pPrice = productJson.getLong("Price");
					Long pTotalPrice = productJson.getLong("TotalPrice");
					String pRemark = productJson.getString("Others");
					salesOrder.AddSalesProduct(pSpec, pName, pCount.floatValue(), pPrice.floatValue(), pTotalPrice.floatValue(), pRemark);
				}
				salesOrder.ProcSalesOrder();
			} catch (JSONException e) {
				logger.error("[SalesOrderProcServlet.java:doPost] Create jsonObject Failed!!! reqParams = " + reqParams);
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
			logger.info("[SalesOrderProcServlet.java:getPostParameter] Get Post Parameter Success!!!  params: " + sContent);
		} catch (Exception e) {
			logger.error("[SalesOrderProcServlet.java:getPostParameter] Get Post Parameter Failed!!!");
			logger.error("Error Message : " + e.getMessage());
		} finally {
			try {
				buf.close();
			} catch (IOException e) {
				logger.error("[SalesOrderProcServlet.java:getPostParameter] close buffer Failed!!!");
				logger.error("Error Message : " + e.getMessage());
			}
		}
		
		return sContent;
	}
}
