package dou.metaObject;

import java.util.ArrayList;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectPaid {
	Logger logger = Config.getLogger(this.getClass());
	private String paidID;
	private String projectID;
	private String payInfo;
	private String payTime;
	private Float paid; /* 2 位小数 */
	private String remark;

	public ProjectPaid(String projectID, String payInfo, String payTime, Float paid, String remark) {
		super();
		this.projectID = projectID;
		this.payInfo = payInfo;
		this.payTime = payTime;
		this.paid = paid;
		this.remark = remark;

		logger.info("[ProjectPaid.java:ProjectPaid] Create a new ProjectPaid object ID： " + projectID);
	}

	private String turnFloatToStr(Float f, Integer place) {

		if (null != f) {
			return String.format("%." + place + "f", f);
		}

		return "0";
	}

	/* 获取某一个项目的全部付款信息 */
	public static ArrayList<ProjectPaid> getAllProjectPaidInfo(String projectId) {
		ArrayList<ProjectPaid> productPaidList = null;

		/* 从数据库获取全部数据 */
		productPaidList = SqlUtilsInterface.getAllProductPaidInfoById(projectId);

		return productPaidList;
	}

	/* 向数据库中添加一条付款信息 */
	public void addProjectPaidInfoToDB() {
		String params[] = { this.projectID, this.payInfo, this.payTime, turnFloatToStr(this.paid, 2), this.remark };

		String sql = "INSERT INTO tb_projectpaid(projectID,payInfo,payTime,paid,remark)VALUES(?, ?, ?, ?, ?);";

		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}

	/* 从数据库中删除一条付款信息 */
	public static void delProjectPaidInfoToDB(String paidID) {
		String params[] = { paidID };

		String sql = "delete from tb_projectpaid where id = ?";

		SqlUtilsInterface.delInfoFromDB(sql, params);
	}

	public void setPaidID(String paidID) {
		this.paidID = paidID;
	}

	public String getPaidID() {
		return paidID;
	}

	public String getProjectID() {
		return projectID;
	}

	public String getPayInfo() {
		return payInfo;
	}

	public String getPayTime() {
		return payTime;
	}

	public Float getPaid() {
		return paid;
	}

	public String getRemark() {
		return remark;
	}
}
