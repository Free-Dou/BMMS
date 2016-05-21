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
		super.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setCharacterEncoding("utf-8");
		Logger logger = Config.getLogger(this.getClass());
		
		logger.info("[SalesAnalyseServlet.java:doPost]: Get sales AnalyseServlet Request!");
		ArrayList<SalesOrder> salesOrderList = SalesOrder.getAllSalesOrderInfo();
		
		JSONArray allSalesOrderJson = new JSONArray();
		JSONObject oneOrderJson = new JSONObject();
		JSONArray oneOrderProduct = new JSONArray();
		
		try {
			for (int i = 0; i < salesOrderList.size(); i++){
				SalesOrder salesOrderObject = salesOrderList.get(i);
				
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
			logger.error("[SalesAnalyseServlet.java:doPost] resp sales order json :" + allSalesOrderJson.toString());
		} catch (Exception e) {
			logger.error("[SalesAnalyseServlet.java:doPost] Get all analyse Sales Order Failed!!!");
			logger.error("Error Message : " + e.getMessage());
		}
	}	
}
