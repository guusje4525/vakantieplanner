package vakantieplanner.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import vakantieplanner.model.ArtikelRegel;
import vakantieplanner.model.Notitie;
import vakantieplanner.model.Vakantie;

public class ServiceDao extends BaseDao {
    
    public List<String> getAll(){
    	ArrayList<String> list = new ArrayList<String>();
    	
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM gebruikers");
            while(rs.next()) {
                 list.add(rs.getString("gebruikersnaam"));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return list;
    }
    
    public int getGebruiker(String gbn, String ww){
    	int g_id = 0;
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM gebruikers WHERE gebruikersnaam = '" + gbn + "' AND wachtwoord = '" + ww + "'");
            while(rs.next()) {
            	g_id = rs.getInt("gebruikers_id");
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return g_id;
    }
    
    public Vakantie getVakantie(){
    	Vakantie vakantie = new Vakantie();
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM vakantie");
            while(rs.next()) {
            	vakantie.setBestemming(rs.getString("bestemming"));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return vakantie;
    }
    
    public ArrayList<ArtikelRegel> getArtikelen(){
    	ArrayList<ArtikelRegel> ar = new ArrayList<ArtikelRegel>();
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM artikelen");
            while(rs.next()) {
            	int artikel_id = rs.getInt("artikel_id");
            	int vakantie_id = rs.getInt("vakantie_id");
            	String artikel_naam = rs.getString("artikel_naam");
            	double artikel_prijs = rs.getDouble("artikel_prijs");
            	int artikel_aantal = rs.getInt("artikel_aantal");
            	boolean artikel_status = rs.getBoolean("artikel_status");
            	ar.add(new ArtikelRegel(artikel_id, vakantie_id, artikel_naam, artikel_prijs, artikel_aantal, artikel_status));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return ar;
    }
    
    public ArrayList<Notitie> getNotities(){
    	ArrayList<Notitie> not = new ArrayList<Notitie>();
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM notities");
            while(rs.next()) {
            	int notitie_id = rs.getInt("notitie_id");
            	int vakantie_id = rs.getInt("vakantie_id");
            	String notitie = rs.getString("notitie");
            	not.add(new Notitie(notitie_id, vakantie_id, notitie));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return not;
    }
    
    public int addNotitie(){
    	int id = 0;
    	try {
            Statement stmt = super.getConnection().createStatement();
            int rs = stmt.executeUpdate("INSERT INTO notities (notitie_id, vakantie_id, notitie) VALUES (NULL, '1', 'Bericht');");
            ResultSet lastID = stmt.executeQuery("SELECT * FROM notities WHERE notitie_id = (SELECT MAX(notitie_id) FROM notities)");
            while(lastID.next()) {
            	id += lastID.getInt("notitie_id");
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return id;
    }
    
    public int addArtikel(){
    	int id = 0;
    	try {
            Statement stmt = super.getConnection().createStatement();
            int rs = stmt.executeUpdate("INSERT INTO artikelen (artikel_id, vakantie_id, artikel_naam, artikel_prijs, artikel_aantal, artikel_status) VALUES (NULL, '1', 'Artikel naam', '1', '1', '0');");
            ResultSet lastID = stmt.executeQuery("SELECT * FROM artikelen WHERE artikel_id = (SELECT MAX(artikel_id) FROM artikelen)");
            while(lastID.next()) {
            	id += lastID.getInt("artikel_id");
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return id;
    }
    
    public void deleteNotitie(int id){
    	try {
            Statement stmt = super.getConnection().createStatement();
            stmt.executeUpdate("DELETE FROM notities WHERE notitie_id = "+id);
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void deleteArtikel(int id){
    	try {
            Statement stmt = super.getConnection().createStatement();
            stmt.executeUpdate("DELETE FROM artikelen WHERE artikel_id = "+id);
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void editNotitie(int id, String msg){
    	try {
            Statement stmt = super.getConnection().createStatement();
            stmt.executeUpdate("UPDATE notities set notitie = '"+msg+"' WHERE notitie_id = "+id);
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void editArtikel(int id, String naam, double prijs, int aantal, boolean status){
    	int new_status = 0;
    	if(status) new_status = 1;
    	try {
            Statement stmt = super.getConnection().createStatement();
            stmt.executeUpdate("UPDATE artikelen set artikel_prijs = '"+prijs+"', artikel_aantal = '"+aantal+"', artikel_naam = '"+naam+"', artikel_status = '"+new_status+"' WHERE artikel_id = "+id);
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
    
    public int getVakantieKosten(){
    	int v_kosten = 0;
    	try {
            Statement stmt = super.getConnection().createStatement();
            ResultSet rs = stmt.executeQuery("SELECT artikel_prijs FROM artikelen");
            while(rs.next()) {
            	v_kosten += rs.getInt("artikel_prijs");
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    	return v_kosten;
    }

    
}
