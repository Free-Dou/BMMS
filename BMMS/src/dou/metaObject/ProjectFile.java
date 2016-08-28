package dou.metaObject;

import java.util.ArrayList;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectFile {
	private Logger logger = Config.getLogger(this.getClass());
	private String id;
	private String projectID;
	private String fileName;
	private String savedPath;

	public ProjectFile(String projectID, String fileName, String savedPath) {
		super();
		this.projectID = projectID;
		this.fileName = fileName;
		this.savedPath = savedPath;

		logger.info(
				"[Customer.java:Customer] Create a new ProjectFile object ： " + projectID + " filename:" + fileName);
	}

	public static ArrayList<Customer> getAllCustomerInfo() {
		ArrayList<Customer> customerList = null;

		/* 从数据库获取全部数据 */
		customerList = SqlUtilsInterface.getAllCustomerInfo();

		return customerList;
	}

	/* 添加文件信息到数据库 */
	public void addFileToDB() {
		String params[] = { this.projectID, this.fileName, this.savedPath, "null"};

		String sql = "INSERT INTO tb_file(projectID,fileName,savedPath,remark)VALUES(?, ?, ?, ?);";

		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
}
