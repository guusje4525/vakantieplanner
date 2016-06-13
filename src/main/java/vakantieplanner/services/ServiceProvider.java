package vakantieplanner.services;

import vakantieplanner.dao.ServiceHandler;

public class ServiceProvider {
	private static ServiceHandler ServiceHandler = new ServiceHandler();

	public static ServiceHandler getServiceHandler() {
		return ServiceHandler;
	}
}