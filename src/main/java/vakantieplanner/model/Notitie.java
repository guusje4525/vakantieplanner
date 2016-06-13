package vakantieplanner.model;

public class Notitie {
	
	private int n_id;
	private int v_id;
	private String notitie;
	
	public Notitie(int n_id, int v_id, String n){
		this.n_id = n_id;
		this.v_id = v_id;
		notitie = n;
	}
	
	public void setN(String n){
		notitie = n;
	}
	
	public int getID(){
		return n_id;
	}
	
	public String getNotitie(){
		return notitie;
	}

}
