package vakantieplanner.model;

import java.util.ArrayList;
import java.util.Iterator;

public class Vakantie {
	
	private ArrayList<Notitie> notities = new ArrayList<Notitie>();
	private ArrayList<ArtikelRegel> artikelregels = new ArrayList<ArtikelRegel>();
	private String bestemming;
	
	public Vakantie(String b){
		bestemming = b;
	}
	
	public Vakantie(){
		bestemming = "Fout tijdens aanmaken Vakantie";
	}
	
	public void addNot(Notitie n){
		notities.add(n);
	}
	
	public void addArt(ArtikelRegel ar){
		artikelregels.add(ar);
	}
	
	public void setBestemming(String b){
		bestemming = b;
	}

	public String getBestemming(){
		return bestemming;
	}
	
	public ArrayList<Notitie> getNotities(){
		return notities;
	}
	
	public ArrayList<ArtikelRegel> getArtikelRegel(){
		return artikelregels;
	}
	
	public void deleteNotitie(int id){
		Iterator<Notitie> it = notities.iterator();
	    while (it.hasNext()) {
	        if (it.next().getID() == id) {
	            it.remove();
	            break;
	        }
	    }
	}
	
	public void deleteArtikel(int id){
		Iterator<ArtikelRegel> it = artikelregels.iterator();
	    while (it.hasNext()) {
	        if (it.next().getArtikel().getID() == id) {
	            it.remove();
	            break;
	        }
	    }
	}
	
	public int getVakantieKosten(){
		int kosten = 0;
		
		for(ArtikelRegel ar: artikelregels){
			kosten += (ar.getAantal() * ar.getArtikel().getPrijs());
		}
		
		return kosten;
	}
}
