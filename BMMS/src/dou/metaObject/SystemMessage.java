package dou.metaObject;

import java.util.ArrayList;
import org.apache.log4j.Logger;
import dou.config.Config;
import dou.sqlHelper.SqlUtilsInterface;

public class SystemMessage {
	
	Logger logger = Config.getLogger(this.getClass());
	private String sMessageName;
	private String sMessage;
	private String time;
	private String userName;
	
	public SystemMessage(String sMessageName, String sMessage, String time, String userName) {
		super();
		this.sMessageName = sMessageName;
		this.sMessage = sMessage;
		this.time = time;
		this.userName = userName;
		
		logger.info("[SystemMessage.java:SystemMessage] Create a new SystemMessage object ： "
				+ sMessageName);
	}
	
	public static ArrayList<SystemMessage> getAllSystemMessageInfo(){
		ArrayList<SystemMessage> systemMessageList = null;
		
		/* 从数据库获取全部数据 */
		systemMessageList = SqlUtilsInterface.getAllSystemMessageInfo();
		
		return systemMessageList;
	}

	public String getsMessageName() {
		return sMessageName;
	}

	public String getsMessage() {
		return sMessage;
	}

	public String getTime() {
		return time;
	}

	public String getUserName() {
		return userName;
	}
}
