package vakantieplanner.model;

public class Artikel {
	
	private int artikel_id;
	private String artikel_naam;
	private double artikel_prijs;

	public Artikel(int id, String naam, double prijs){
		artikel_id = id;
		artikel_naam = naam;
		artikel_prijs = prijs;
	}
	
	public Artikel(int id){
		//Voorbeeld data tijdens aanmaken nieuw artikel
		artikel_id = id;
		artikel_naam = "Artikel naam";
		artikel_prijs = 1;
	}
	
	public void setNaam(String n){
		artikel_naam = n;
	}
	
	public void setPrijs(double prijs){
		artikel_prijs = prijs;
	}
	
	public int getID(){
		return artikel_id;
	}
	
	public String getNaam(){
		return artikel_naam;
	}
	
	public double getPrijs(){
		return artikel_prijs;
	}
	
}
