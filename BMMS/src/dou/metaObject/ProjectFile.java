package dou.metaObject;

import java.io.File;
import java.util.ArrayList;

import org.apache.log4j.Logger;

import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class ProjectFile {
	private Logger logger = Config.getLogger(this.getClass());
	private String fileID;
	private String projectID;
	private String fileName;
	private String savedPath;
	private String remark;

	public ProjectFile(String projectID, String fileName, String savedPath, String remark) {
		super();
		this.projectID = projectID;
		this.fileName = fileName;
		this.savedPath = savedPath;

		logger.info(
				"[ProjectFile.java:ProjectFile] Create a new ProjectFile object ： " + projectID + " filename:" + fileName);
	}

	public static ArrayList<Customer> getAllCustomerInfo() {
		ArrayList<Customer> customerList = null;

		/* 从数据库获取全部数据 */
		customerList = SqlUtilsInterface.getAllCustomerInfo();

		return customerList;
	}

	/* 添加文件信息到数据库 */
	public void addFileToDB() {
		String params[] = { this.projectID, this.fileName, this.savedPath, this.remark};

		String sql = "INSERT INTO tb_file(projectID,fileName,savedPath,remark)VALUES(?, ?, ?, ?);";
		/* 添加当前对象的信息到数据库 */
		SqlUtilsInterface.addInfoToDB(sql, params);
	}
	
	public void delFile() {
		// TODO Auto-generated method stub
		File file = new File(this.savedPath);
		if ((!file.exists()) || (!file.isFile())){
			logger.error(
					"[ProjectFile.java:delFile] delete a File failed !! file not exit or not a file !! Project ： " + projectID + " filename:" + fileName);
			return;
		} else {
			file.delete();
			
			/* 从数据库中删除 */
			String params[] = { this.projectID, this.fileName, this.savedPath};
			String sql = "delete from tb_file where projectID = ? and fileName = ? and savedPath = ? ";
			SqlUtilsInterface.delInfoFromDB(sql, params);
		}
		
		/* 判断上层文件夹是否需要删除 */
		String dirPath = this.savedPath.substring(0, this.savedPath.lastIndexOf("\\") + 1);
		File dir = new File(dirPath);
		if ((dir.exists()) && (dir.isDirectory())){
			File[] files = dir.listFiles();
			if (0 == files.length){
				/* 没有文件了，将父文件夹删除 */
				dir.delete();
				logger.info(
						"[ProjectFile.java:delFile] delete a father dir !! No file exist in this dir !! Dir  ： " + dirPath);
			}
		}
		
		return;
	}
	
	public static String searchSavedPathFromDB(String projectID, String fileName){
		String savedPath = null;
		
		savedPath = SqlUtilsInterface.searchSavedPathFromDB(projectID, fileName);
		
		return savedPath;
	}
	
	public static ArrayList<ProjectFile> getAllFileInfoFromDB(String projectID){
		ArrayList<ProjectFile> fileList = null;
		
		fileList = SqlUtilsInterface.getAllFileInfoFromDB(projectID);
		
		return fileList;
	}

	public String getId() {
		return fileID;
	}

	public void setId(String fileID) {
		this.fileID = fileID;
	}

	public String getProjectID() {
		return projectID;
	}

	public String getFileName() {
		return fileName;
	}

	public String getSavedPath() {
		return savedPath;
	}

	public String getRemark() {
		return remark;
	}
}
