package vakantieplanner.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ServiceDao_web {

	private static final String DB_DRIV = "com.mysql.jdbc.Driver";
	private static final String DB_URL = "mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/city";
	private static final String DB_USER = "admingrVtcUx";
	private static final String DB_PASS = "9W2dK_d1mDbF";
	private static Connection conn;
	ResultSet rs;
	String comm = "default";

	public ServiceDao_web() throws SQLException {
		String url = "mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/";
		String dbName = "city";
		String driver = "com.mysql.jdbc.Driver";
		String userName = "admingrVtcUx"; 
		String password = "9W2dK_d1mDbF"; 
		try {
			Class.forName(driver).newInstance(); 
			Connection conn = DriverManager.getConnection(url+dbName,userName,password);
			
			Statement stmt = conn.createStatement();
			String queryText = "SELECT * FROM CITY";
			rs = stmt.executeQuery(queryText);
			while (rs.next()) {
				comm += "\n"+rs.getString("NAME");
			}
			rs.close();
			stmt.close();
			conn.close(); 
		} catch (Exception e) { 
			e.printStackTrace();
		}
	}

	
	public String printData(){
		String url = "mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/";
		String dbName = "city";
		String driver = "com.mysql.jdbc.Driver";
		String userName = "admingrVtcUx"; 
		String password = "9W2dK_d1mDbF"; 
		try {
			Class.forName(driver).newInstance(); 
			Connection conn = DriverManager.getConnection(url+dbName,userName,password);
			
			Statement stmt = conn.createStatement();
			String queryText = "SELECT * FROM CITY";
			rs = stmt.executeQuery(queryText);
			while (rs.next()) {
				comm += "\n"+rs;
			}
			rs.close();
			stmt.close();
			conn.close(); 
		} catch (Exception e) { 
			e.printStackTrace();
		}
		return comm;
	}
	
	public void closeCONN() throws SQLException{
		conn.close();
		System.out.println("Connection closed");
	}
	
}
