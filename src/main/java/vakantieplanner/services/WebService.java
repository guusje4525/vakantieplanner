package vakantieplanner.services;

import java.io.IOException;
import java.io.PrintWriter;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vakantieplanner.dao.ServiceHandler;
import vakantieplanner.model.ArtikelRegel;
import vakantieplanner.model.Gebruiker;
import vakantieplanner.model.Notitie;
import vakantieplanner.model.Vakantie;

public class WebService extends HttpServlet {
	
	private Vakantie vakantie;
	private ServiceHandler service = ServiceProvider.getServiceHandler();
	private boolean runOnce = true;
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		PrintWriter out = response.getWriter();
		String type = request.getParameter("type");
		System.out.println(request.getRemoteAddr() + " is requesting " + type);
		JsonArrayBuilder jab = Json.createArrayBuilder();
		JsonObjectBuilder job = Json.createObjectBuilder();
		Gebruiker g = (Gebruiker) request.getSession().getAttribute("gebruiker");
		
		if(g != null && runOnce){
			service.initialize();
			runOnce = false;
		}
		//getVakantie && getGebruikersdata
		if("getGebruiker".equals(type)){
			String gb = request.getParameter("gb");
			String ww = request.getParameter("ww");
			if(gb != null && ww != null && !"".equals(gb) && !"".equals(ww)){
				int gebruiker = service.getGebruiker(gb, ww);
				if(gebruiker == 0 || "".equals(gebruiker)){
					job.add("error", true);
					job.add("response", "Gebruiker bestaat niet!");
				} else {		
					request.getSession().setAttribute("gebruiker", new Gebruiker(gebruiker, gb, ww));
					job.add("error", false);
					job.add("response", gebruiker);
				}
			} else {
				job.add("error", true);
				job.add("response", "Geen geldige gegevens meegegeven!");
			}
			out.println((jab.add(job)).build().toString());
		} else if("getGebruikerData".equals(type)){
			if(g != null){
				job.add("error", false);
				job.add("g_id", g.getGI());
				job.add("g_naam", g.getGB());
			} else {
				job.add("error", true);
				job.add("msg", "Gebruiker kan niet gevonden worden");
			}
			out.println((jab.add(job)).build().toString());
		} else if("editNotitie".equals(type)){
			service.editNotitie(Integer.parseInt(request.getParameter("id")), request.getParameter("msg"));
		} else if("editArtikel".equals(type)){
			int art_id = Integer.parseInt(request.getParameter("artikel_id"));
			String naam = request.getParameter("artikel_naam");
			double prijs = Double.parseDouble(request.getParameter("artikel_prijs"));
			int aantal = Integer.parseInt(request.getParameter("artikel_aantal"));
			String status_str = request.getParameter("artikel_status");
			boolean status;
			if("ja".equals(status_str)){ status = Boolean.parseBoolean("true"); }
			else { status = Boolean.parseBoolean("false"); }
			service.editArtikel(art_id, naam, prijs, aantal, status);
		} else if("getVakantieInfo".equals(type)){
			if(g != null){
				job.add("error", false);
				job.add("g_id", g.getGI());
				job.add("g_naam", g.getGB());
			} else {
				job.add("error", true);
				job.add("msg", "Gebruiker kan niet gevonden worden");
			}
			out.println(service.getVakantieInfo(job));
		} else if("getArtikelen".equals(type)){
			out.println(service.getJsonArtikelen());
		} else if("getNotitie".equals(type)){
			out.println(service.getJsonNotities());
		} else if("deleteArtikel".equals(type)){
			int id = Integer.parseInt(request.getParameter("id"));
			service.deleteArtikel(id);
			job.add("error", false);
			jab.add(job);
			out.println(jab.build().toString());
		} else if("deleteNotitie".equals(type)){
			int id = Integer.parseInt(request.getParameter("id"));
			service.deleteNotitie(id);
			job.add("error", false);
			jab.add(job);
			out.println(jab.build().toString());
		} else if("addArtikel".equals(type)){
			job.add("error", false);
			job.add("artikel_id", service.addArtikel());
			jab.add(job);
			out.println(jab.build().toString());
		} else if("addNotitie".equals(type)){			
			job.add("error", false);
			job.add("n_id", service.addNotitie());
			jab.add(job);
			out.println(jab.build().toString());
		} else if("logout".equals(type)){
			request.getSession().removeAttribute("gebruiker");
			job.add("error", false);
			job.add("msg", "uitgelogd");
			out.println((jab.add(job)).build().toString());
		} else {
			out.println((jab.add(job.add("error", true))).build().toString());
		}
	}
	
}

