package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectQunatity {
	
	private Logger logger = Config.getLogger(this.getClass());
	private String projectName = null;
	private Float budget = null;
	private Float paid = null;
	private String remark = null;
	private String projectID = null;
	
	public ProjectQunatity(String projectName, Float budget, Float paid, String remark) {
		super();
		this.projectName = projectName;
		this.budget = budget;
		this.paid = paid;
		this.remark = remark;
		
		logger.info("[ProjectQunatity.java:ProjectQunatity] Create a new ProjectQunatity object ： "
				+ projectName);
	}

	public String getProjectName() {
		return projectName;
	}

	public Float getBudget() {
		return budget;
	}

	public Float getPaid() {
		return paid;
	}

	public String getRemark() {
		return remark;
	}

	public static ArrayList<ProjectQunatity> getAllCustomerInfo(){
		ArrayList<ProjectQunatity> projectQunatityList = null;
		
		/* 从数据库获取全部数据 */
		projectQunatityList = SqlUtilsInterface.getAllProjectQunatityInfo();
		
		return projectQunatityList;
	}
	
	public void addProjectQunatityToDB(){
		String params[] = {this.projectName, String.format("%.2f", this.budget), String.format("%.2f", this.paid), this.remark};
		
		String sql = "insert into `tb_qunatity`(`projectName`,`budget`,`paid`,`remark`) values(?,?,?,?);";
		
		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
	
	public static void updateProjectQunatityToDB(Float budget, Float paid, String projectID){
		String params[] = {String.format("%.2f", budget), String.format("%.2f", paid), projectID};
		
		String sql = "UPDATE `tb_qunatity` SET budget = ?, paid=? WHERE `id`= ?;";
		
		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
	
	public static void delProjectQunatityFromDB(String projectID) {
		String sql = "delete from tb_qunatity where id=?;";
		String params[] = {projectID};
		
		/* 删除数据 */
		SqlUtilsInterface.delInfoFromDB(sql, params);
	}

	public String getProjectID() {
		return projectID;
	}

	public void setProjectID(String projectID) {
		this.projectID = projectID;
	}
}
