package dou.metaObject;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectQunatityBatch {
	Logger logger = Config.getLogger(this.getClass());
	private String batchID;
	private String projectID;
	private String eachBatch;
	private Float price;	/* 2 位小数 */
	private String picLoca;
	private String remark;
	
	public ProjectQunatityBatch(String projectID, String eachBatch, Float price, String picLoca, String remark) {
		this.projectID = projectID;
		this.eachBatch = eachBatch;
		this.price = price;
		this.picLoca = picLoca;
		this.remark = remark;
		
		logger.info("[ProjectQunatityBatch.java:ProjectQunatityBatch] Create a new ProjectQunatityBatch object ID： " + projectID);
	}

	public String getProjectID() {
		return projectID;
	}

	public String getEachBatch() {
		return eachBatch;
	}

	public Float getPrice() {
		return price;
	}

	public String getPicLoca() {
		return picLoca;
	}

	public String getRemark() {
		return remark;
	}
	
	public String getBatchID() {
		return batchID;
	}

	public void setBatchID(String batchID) {
		this.batchID = batchID;
	}
	
	private String turnFloatToStr(Float f, Integer place) {

		if (null != f) {
			return String.format("%." + place + "f", f);
		}

		return "0";
	}
	
	public void addQunatityBatchToDB() {
		String params[] = {this.projectID, this.eachBatch, turnFloatToStr(this.price, 2), this.picLoca, this.remark };

		String sql = "INSERT INTO tb_qunatitybatch(projectID,eachBatch,price,picLoca,remark)VALUES(?, ?, ?, ?, ?);";

		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
	
	public static void delQunatityBatchFromDB(String batchID){
		String params[] = {batchID};
		
		String sql = "delete from tb_qunatitybatch where id = ?";
		
		SqlUtilsInterface.delInfoFromDB(sql, params);
	}
}
