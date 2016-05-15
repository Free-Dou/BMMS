package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Product;

public class AddProductServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String pName = req.getParameter("input_add_name");
		String pSpec = req.getParameter("input_add_spec");
		Integer pPrice = 0;
		
		logger.info("[AddProductServlet.java:doPost] Product name: " + pName + " |  Product Spec: " + pSpec);
		
		Product productObejct = new Product(pSpec, pName, pPrice);
		productObejct.addProductToDB();
	}
}