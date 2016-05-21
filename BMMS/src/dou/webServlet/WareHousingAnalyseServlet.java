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
import dou.metaObject.WareHousingOrder;
import dou.metaObject.WareHousingOrder.WareHousingProduct;

public class WareHousingAnalyseServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
		resp.setCharacterEncoding("utf-8");
		Logger logger = Config.getLogger(this.getClass());
		
		logger.info("[WareHousingAnalyseServlet.java:doPost]: Get WareHousing AnalyseServlet Request!");
		ArrayList<WareHousingOrder> wareHousingOrderList = WareHousingOrder.getAllWareHousingOrderInfo();
		
		JSONArray allWareHousingOrderJson = new JSONArray();
		JSONObject oneOrderJson = new JSONObject();
		JSONArray oneOrderProduct = new JSONArray();
		
		try {
			for (int i = 0; i < wareHousingOrderList.size(); i++){
				WareHousingOrder wareHousingOrderObject = wareHousingOrderList.get(i);
				
				oneOrderJson = new JSONObject();
				oneOrderJson.put("orderID", wareHousingOrderObject.getOrderID());
				oneOrderJson.put("carNum", wareHousingOrderObject.getCarNum());
				oneOrderJson.put("stockLoca", wareHousingOrderObject.getStockLoca());
				oneOrderJson.put("userName", wareHousingOrderObject.getUserName());
				oneOrderJson.put("supplierName", wareHousingOrderObject.getSupplierName());
				oneOrderJson.put("inTime", wareHousingOrderObject.getInTime());
				oneOrderJson.put("orderRemark", wareHousingOrderObject.getOrderRemark());
				
				oneOrderProduct = new JSONArray();
				for (WareHousingProduct wareHousingProduct : wareHousingOrderObject.wareHousingProductList){
					JSONObject  productJSON  = new JSONObject();
					productJSON.put("pSpec", wareHousingProduct.getpSpec());
					productJSON.put("pName", wareHousingProduct.getpName());
					productJSON.put("pCount", wareHousingProduct.getpCount());
					productJSON.put("pPrice", wareHousingProduct.getpPrice());
					productJSON.put("pTotalPrice", wareHousingProduct.getpTotalPrice());
					productJSON.put("pRemark", wareHousingProduct.getpRemark());
					
					oneOrderProduct.put(productJSON);
				}
				oneOrderJson.put("Product", oneOrderProduct);
				allWareHousingOrderJson.put(oneOrderJson);
			}
			
			PrintWriter pw = resp.getWriter();
			pw.print(allWareHousingOrderJson.toString());
			logger.info("[WareHousingAnalyseServlet.java:doPost] resp WareHousing order json :" + allWareHousingOrderJson.toString());
		} catch (Exception e) {
			logger.error("[WareHousingAnalyseServlet.java:doPost] Get all analyse WareHousing Order Failed!!!");
			logger.error("Error Message : " + e.getMessage());
			e.printStackTrace();
		}
	}	
}
