package dou.webServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.Customer;
import dou.sqlHelper.SqlUtilsInterface;

public class AddCustomerServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Logger logger = Config.getLogger(this.getClass());
		req.setCharacterEncoding("utf-8");
		
		String cName = req.getParameter("input_add_name");
		String cTel = req.getParameter("input_add_tel");
		String cFax = req.getParameter("input_add_fix");
		String cEmail = null;
		String cAddress = null;
		String cContact1 = req.getParameter("input_add_phone1");
		String cContact2 = req.getParameter("input_add_phone2");
		String cRemark = null;
		
		logger.info("[AddCustomerServlet.java:doPost] Customer: " + cName + " |  Tel: " + cTel + " |  Fax: " + cFax);
		
		Customer customer = new Customer(cName, cTel, cFax, cEmail, cAddress, cContact1, cContact2, cRemark);
		customer.addCustomerToDB();
	}
}