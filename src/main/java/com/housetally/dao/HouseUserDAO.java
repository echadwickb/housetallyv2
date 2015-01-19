package com.housetally.dao;

import static com.housetally.service.OfyService.ofy;

import java.util.List;

import com.housetally.HouseUser;

public class HouseUserDAO {

	public List<HouseUser> getHouseUsers() {
		return ofy().load().type(HouseUser.class).list();
	}

	public HouseUser getHouseUser(String email) {
		return ofy().load().type(HouseUser.class).first().now();
	}

	public HouseUser save(HouseUser houseUser) {
		ofy().save().entity(houseUser).now();

		return houseUser;
	}

	public HouseUser delete(HouseUser houseUser) {

		ofy().delete().entity(houseUser).now();

		return houseUser;
	}
}
