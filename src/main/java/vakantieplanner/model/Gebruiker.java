package vakantieplanner.model;

public class Gebruiker {
	int gebruikers_id;
	String gebruikersnaam;
	String wachtwoord;
	
	public Gebruiker(int gebruikers_id, String gebruikersnaam, String wachtwoord){
		this.gebruikers_id = gebruikers_id;
		this.gebruikersnaam = gebruikersnaam;
		this.wachtwoord = wachtwoord;
	}
	
	public int getGI(){
		return gebruikers_id;
	}
	
	public String getGB(){
		return gebruikersnaam;
	}

}
