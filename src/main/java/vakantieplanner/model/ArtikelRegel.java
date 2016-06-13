package vakantieplanner.model;

public class ArtikelRegel {
	
	private int artikel_aantal;
	private boolean artikel_status;
	private int vakantie_id;
	private Artikel artikel;
	
	public ArtikelRegel(int a_id, int v_id, String naam, double prijs, int aantal, boolean status){
		artikel_aantal = aantal;
		artikel_status = status;
		vakantie_id = v_id;
		artikel = new Artikel(a_id, naam, prijs);
	}
	
	public ArtikelRegel(int a_id){
		//Voorbeeld data tijdens aanmaken nieuw artikel
		artikel_aantal = 1;
		artikel_status = false;
		vakantie_id = 1;
		artikel = new Artikel(a_id);
	}
	
	public void setAantal(int aantal){
		artikel_aantal = aantal;
	}
	
	public void setStatus(boolean status){
		artikel_status = status;
	}
	
	public int getAantal(){
		return artikel_aantal;
	}
	
	public boolean getStatus(){
		return artikel_status;
	}
	
	public Artikel getArtikel(){
		return artikel;
	}
	
}
