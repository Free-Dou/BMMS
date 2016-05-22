package dou.webServlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.metaObject.PersionMessage;

public class PersionMessageProcServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		Logger logger = Config.getLogger(this.getClass());
		
		String orderID = req.getParameter("orderID");				/* 订单号 */
		String processType = req.getParameter("processType");		/* 通过approval／拒绝reject */
		logger.info("[PersionMessageProcServlet.java:doPost]: Get persion message process request  !!!!!!!");
		boolean procResult = false;
		
		if (processType.equals("approval")){
			/* 订单通过的处理 */
			procResult = PersionMessage.procApprovalOrder(orderID);
		}else{
			/* 订单不通过处理 */
		}
		
		PrintWriter pw = resp.getWriter();
		if (true == procResult){
			logger.info("[PersionMessageProcServlet.java:doPost]: Process persion message process request  success !");
			pw.print("success");
		}else{
			logger.error("[PersionMessageProcServlet.java:doPost]: Process persion message process request  failed !!!!!!!");
			pw.print("failed");
		}
		
	}

}
