package com.housetally.dao;

import static com.housetally.service.OfyService.ofy;

import java.util.List;

import com.housetally.House;

public class HouseDAO {
	
	public List<House> getHouses()
	{
		return ofy().load().type(House.class).list();
	}
	
	public House getHouse(String name) {
		return ofy().load().type(House.class).first().now();
	}
	
	public House save(House house) {
		
		ofy().save().entity(house).now();
		
		return house;
	}
	
	public House delete(House house) {

		ofy().delete().entity(house).now();		
		
		return house;
	}
}
