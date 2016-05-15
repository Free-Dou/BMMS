package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.metaObject.Supplier;

public class AddSupplierServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String sName = req.getParameter("input_add_name");
		String sTel = req.getParameter("input_add_tel");
		String sFax = req.getParameter("input_add_fix");
		String sEmail = null;
		String sAddress = null;
		String sContact1 = req.getParameter("input_add_phone1");
		String sContact2 = req.getParameter("input_add_phone2");
		String sRemark = null;
		
		logger.info("[AddSupplierServlet.java:doPost] Supplier: " + sName + " |  Tel: " + sTel + " |  Fax: " + sFax);
		
		Supplier supplierObject = new Supplier(sName, sTel, sFax, sEmail, sAddress, sContact1, sContact2, sRemark);
		supplierObject.addSupplierToDB();
	}
}
