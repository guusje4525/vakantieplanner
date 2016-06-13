package vakantieplanner.dao;

import java.util.ArrayList;
import java.util.List;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import vakantieplanner.model.ArtikelRegel;
import vakantieplanner.model.Notitie;
import vakantieplanner.model.Vakantie;

public class ServiceHandler {

	private ServiceDao ServiceDao = new ServiceDao();
	private boolean runOnce = true;
	private Vakantie vakantie = ServiceDao.getVakantie();
	JsonArrayBuilder jab = Json.createArrayBuilder();
	
	public int getGebruiker(String gbn, String ww){
		return ServiceDao.getGebruiker(gbn, ww);
	}
	
	public ArrayList<ArtikelRegel> getArtikelen(){
		return ServiceDao.getArtikelen();
	}
	
	public String getJsonArtikelen(){
		jab = Json.createArrayBuilder();
		for(ArtikelRegel art : vakantie.getArtikelRegel()){
			JsonObjectBuilder not = Json.createObjectBuilder();
			//Artikel
			not.add("artikel_id", art.getArtikel().getID());
			not.add("artikel_naam", art.getArtikel().getNaam());
			not.add("artikel_prijs", art.getArtikel().getPrijs());
			//ArtikelRegel
			not.add("artikel_aantal", art.getAantal());
			not.add("artikel_status", art.getStatus());
			jab.add(not);
		}
		return jab.build().toString();
	}
	
	public String getJsonNotities(){
		jab = Json.createArrayBuilder();
		for(Notitie n : vakantie.getNotities()){
			JsonObjectBuilder not = Json.createObjectBuilder();
			not.add("n_id", n.getID());
			not.add("n_msg", n.getNotitie());
			jab.add(not);
		}
		return jab.build().toString();
	}
	
	public ArrayList<Notitie> getNotities(){
		return ServiceDao.getNotities();
	}
	
	public String getVakantieInfo(JsonObjectBuilder j){
		jab.add(j);
		JsonObjectBuilder job = Json.createObjectBuilder();
		job.add("error", false);
		job.add("v_bestemming", vakantie.getBestemming());
		job.add("v_kosten", vakantie.getVakantieKosten());
		jab.add(job);
		return jab.build().toString();
	}
	
	public int addNotitie(){
		int id = ServiceDao.addNotitie();
		vakantie.addNot(new Notitie(id, 1, "Bericht"));
		return id;
	}
	
	public void deleteNotitie(int id){
		vakantie.deleteNotitie(id);
		ServiceDao.deleteNotitie(id);
	}
	
	public void editNotitie(int id, String msg){
		for(Notitie n : vakantie.getNotities()){
			if(n.getID() == id) n.setN(msg);
		}
		ServiceDao.editNotitie(id, msg);
	}
	
	public void deleteArtikel(int id){
		vakantie.deleteArtikel(id);
		ServiceDao.deleteArtikel(id);
	}
	
	public int addArtikel(){
		int id = ServiceDao.addArtikel();
		vakantie.addArt(new ArtikelRegel(id));
		return id;
	}
	
	public void editArtikel(int art_id, String naam, double prijs, int aantal, boolean status){
		for(ArtikelRegel art : vakantie.getArtikelRegel()){
			if(art.getArtikel().getID() == art_id){
				art.getArtikel().setNaam(naam);
				art.getArtikel().setPrijs(prijs);
				art.setAantal(aantal);
				art.setStatus(status);
			}
		}
		ServiceDao.editArtikel(art_id, naam, prijs, aantal, status);
	}
	
	public void initialize(){
		if(runOnce){
			for(ArtikelRegel arr : getArtikelen()){
				vakantie.addArt(arr);
			}
			for(Notitie not : getNotities()){
				vakantie.addNot(not);
			}
			System.out.println("vakantie has been set");
		}
	}
}
