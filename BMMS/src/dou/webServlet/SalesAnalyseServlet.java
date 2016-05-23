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
import dou.metaObject.SalesOrder;
import dou.metaObject.SalesOrder.SalesProduct;

public class SalesAnalyseServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		resp.setCharacterEncoding("utf-8");
		req.setCharacterEncoding("utf-8");
		
		String username = (String)req.getSession().getAttribute("username");
		if (null == username){
			return;
		}
		
		/* 
		 * 获取用户参数
		 * var data = "start_date=" + start_date.value 
		 * 			+ "&end_date=" + end_date.value 
		 * 			+ "&customer=" + input_customer.value
		 * 		    + "&item=" + input_item.value
		 * 		    + "&remark=" + input_remark.value; 
		 */
		String startDate = req.getParameter("start_date");
		String endDate = req.getParameter("end_date");
		String customer = req.getParameter("customer");
		String item = req.getParameter("item");
		String remark = req.getParameter("remark");
		logger.info("[SalesAnalyseServlet.java:doPost]: Get sales AnalyseServlet Request  !!!!!!!");
		logger.info("[SalesAnalyseServlet.java:doPost]: start_data:" + startDate + "  end_date:" + endDate
					+ "  customer:" + customer + "  item:" + item + "  remark:" + remark);
		
		ArrayList<SalesOrder> salesOrderList = SalesOrder.querySalesOrderInfo(startDate, endDate, customer, item, remark);
		if (null == salesOrderList){
			logger.error("[SalesAnalyseServlet.java:doPost] query sales order result is null!!!");
			PrintWriter pw = resp.getWriter();
			pw.print("null");
			return;
		}
		
		JSONArray allSalesOrderJson = new JSONArray();
		JSONObject oneOrderJson = new JSONObject();
		JSONArray oneOrderProduct = new JSONArray();
		
		try {
			for (int i = 0; i < salesOrderList.size(); i++){
				SalesOrder salesOrderObject = salesOrderList.get(i);
				
				if (null == salesOrderObject){
					logger.error("[SalesAnalyseServlet.java:doPost] sales order is null!!!  index : " + i);
					break;
				}
				
				oneOrderJson = new JSONObject();
				oneOrderJson.put("orderID", salesOrderObject.getOrderID());
				oneOrderJson.put("carNum", salesOrderObject.getCarNum());
				oneOrderJson.put("stockLoca", salesOrderObject.getStockLoca());
				oneOrderJson.put("userName", salesOrderObject.getUserName());
				oneOrderJson.put("customerName", salesOrderObject.getCustomerName());
				oneOrderJson.put("outTime", salesOrderObject.getOutTime());
				oneOrderJson.put("orderRemark", salesOrderObject.getOrderRemark());
				
				oneOrderProduct = new JSONArray();
				for (SalesProduct salesProduct : salesOrderObject.salesProductList){
					JSONObject  productJSON  = new JSONObject();
					productJSON.put("pSpec", salesProduct.getpSpec());
					productJSON.put("pName", salesProduct.getpName());
					productJSON.put("pCount", salesProduct.getpCount());
					productJSON.put("pPrice", salesProduct.getpPrice());
					productJSON.put("pTotalPrice", salesProduct.getpTotalPrice());
					productJSON.put("pRemark", salesProduct.getpRemark());
					
					oneOrderProduct.put(productJSON);
				}
				oneOrderJson.put("Product", oneOrderProduct);
				allSalesOrderJson.put(oneOrderJson);
			}
			
			PrintWriter pw = resp.getWriter();
			pw.print(allSalesOrderJson.toString());
			logger.info("[SalesAnalyseServlet.java:doPost] resp sales order json :" + allSalesOrderJson.toString());
		} catch (Exception e) {
			logger.error("[SalesAnalyseServlet.java:doPost] Get all analyse Sales Order Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		}
	}	
}
