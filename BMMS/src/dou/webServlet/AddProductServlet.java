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
		resp.sendRedirect("/BMMS/index.html");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String pName = req.getParameter("input_add_name");
		String pSpec = req.getParameter("input_add_spec");
		Integer pPrice = 0;
		
		if (("" != pName) && (null != pName)){
			logger.info("[AddProductServlet.java:doPost] Product name: " + pName + " |  Product Spec: " + pSpec);
			Product productObejct = new Product(pSpec, pName, pPrice);
			productObejct.addProductToDB();
		} else {
			logger.info("[AddProductServlet.java:doPost] Product Name is null or \"\" !!!  name: " + pName + " |  Product Spec: " + pSpec);
		}
	}
}