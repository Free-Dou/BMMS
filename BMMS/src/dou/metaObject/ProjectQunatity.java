package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectQunatity {

	private Logger logger = Config.getLogger(this.getClass());
	private String projectName = null;
	private Float budget = null; /* 两位小数 */
	private Float paid = null; /* 两位小数 */
	private String contractContent = null;
	private String contractNumber = null;
	private String partyA = null;
	private String constructLoca = null;
	private String constructDate = null;
	private String water = null;
	private Float waterSelfProduct = null; /* 3位小数 */
	private Float waterBuy = null; /* 3位小数 */
	private Float waterPrice = null; /* 2位小数 */
	private String blackMaterial = null;
	private Float blackMaterialSelfProduct = null; /* 3位小数 */
	private Float blackMaterialBuy = null; /* 3位小数 */
	private Float blackMaterialPrice = null; /* 2位小数 */
	private Float blackMaterialSell = null; /* 2位小数 */
	private String remark = null;
	private String projectID = null;

	public ProjectQunatity(String projectName, Float budget, Float paid, String contractContent, String contractNumber,
			String partyA, String constructLoca, String constructDate, String water, Float waterSelfProduct,
			Float waterBuy, Float waterPrice, String blackMaterial, Float blackMaterialSelfProduct,
			Float blackMaterialBuy, Float blackMaterialPrice, Float blackMaterialSell, String remark) {
		super();
		this.projectName = projectName;
		this.budget = budget;
		this.paid = paid;
		this.contractContent = contractContent;
		this.contractNumber = contractNumber;
		this.partyA = partyA;
		this.constructLoca = constructLoca;
		this.constructDate = constructDate;
		this.water = water;
		this.waterSelfProduct = waterSelfProduct;
		this.waterBuy = waterBuy;
		this.waterPrice = waterPrice;
		this.blackMaterial = blackMaterial;
		this.blackMaterialSelfProduct = blackMaterialSelfProduct;
		this.blackMaterialBuy = blackMaterialBuy;
		this.blackMaterialPrice = blackMaterialPrice;
		this.blackMaterialSell = blackMaterialSell;
		this.remark = remark;

		logger.info("[ProjectQunatity.java:ProjectQunatity] Create a new ProjectQunatity object ： " + projectName);
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

	public String getContractContent() {
		return contractContent;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public String getPartyA() {
		return partyA;
	}

	public String getConstructLoca() {
		return constructLoca;
	}

	public String getConstructDate() {
		return constructDate;
	}

	public String getWater() {
		return water;
	}

	public Float getWaterSelfProduct() {
		return waterSelfProduct;
	}

	public Float getWaterBuy() {
		return waterBuy;
	}

	public Float getWaterPrice() {
		return waterPrice;
	}

	public String getBlackMaterial() {
		return blackMaterial;
	}

	public Float getBlackMaterialSelfProduct() {
		return blackMaterialSelfProduct;
	}

	public Float getBlackMaterialBuy() {
		return blackMaterialBuy;
	}

	public Float getBlackMaterialPrice() {
		return blackMaterialPrice;
	}

	public Float getBlackMaterialSell() {
		return blackMaterialSell;
	}

	public String getRemark() {
		return remark;
	}

	public static ArrayList<ProjectQunatity> getAllCustomerInfo() {
		ArrayList<ProjectQunatity> projectQunatityList = null;

		/* 从数据库获取全部数据 */
		projectQunatityList = SqlUtilsInterface.getAllProjectQunatityInfo();

		return projectQunatityList;
	}

	public static ProjectQunatity getOneProjectQunatityInfoById(String projectId) {

		ProjectQunatity projectQunatity = null;

		projectQunatity = SqlUtilsInterface.getOneProjectQunatityInfoById(projectId);

		return projectQunatity;
	}

	public void addProjectQunatityToDB() {
		String params[] = {  String.format("%.2f", this.budget), String.format("%.2f", this.paid),
				this.contractContent, this.contractNumber, this.partyA, this.constructLoca, this.constructDate,
				this.water, String.format("%.3f", this.waterSelfProduct), String.format("%.3f", this.waterBuy),
				String.format("%.2f", this.waterPrice), this.blackMaterial,
				String.format("%.3f", this.blackMaterialSelfProduct), String.format("%.3f", this.blackMaterialBuy),
				String.format("%.3f", this.blackMaterialPrice), String.format("%.3f", this.blackMaterialSell),
				this.remark };

		String sql = "INSERT INTO tb_qunatity(projectName,budget,paid,contractContent,contractNumber,partyA,constructLoca,"
				+ "constructDate,water,waterSelfProduct,waterBuy,waterPrice,blackMaterial,blackMaterialSelfProduct,"
				+ "blackMaterialBuy,blackMaterialPrice,blackMaterialSell,remark)"
				+ "VALUES("+this.projectName+",？,？,？,？,？,？,？,？,？,？,？,？,？,？,？,？,？);";
		

		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}

	public void updateProjectQunatityToDB(String projectID) {
		String params[] = { this.projectName, String.format("%.2f", this.budget), String.format("%.2f", this.paid),
				this.contractContent, this.contractNumber, this.partyA, this.constructLoca, this.constructDate,
				this.water, String.format("%.3f", this.waterSelfProduct), String.format("%.3f", this.waterBuy),
				String.format("%.2f", this.waterPrice), this.blackMaterial,
				String.format("%.3f", this.blackMaterialSelfProduct), String.format("%.3f", this.blackMaterialBuy),
				String.format("%.3f", this.blackMaterialPrice), String.format("%.3f", this.blackMaterialSell),
				projectID };

		String sql = "UPDATE tb_qunatity SET projectName=?,budget=?,paid=?,contractContent=?,contractNumber=?,partyA=?,constructLoca=?,constructDate=?,water=?,waterSelfProduct=?,waterBuy=?,waterPrice=?,blackMaterial=?,blackMaterialSelfProduct=?,blackMaterialBuy=?,blackMaterialPrice=?,blackMaterialSell=?,remark='' WHERE id=?;";

		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}

	public static void delProjectQunatityFromDB(String projectID) {
		String sql = "delete from tb_qunatity where id=?;";
		String params[] = { projectID };

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
