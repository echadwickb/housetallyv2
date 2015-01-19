package com.housetally.dao;

import static com.housetally.service.OfyService.ofy;

import java.util.List;

import com.housetally.Setting;

public class SettingDAO {
	
	public List<Setting> getSettings()
	{
		return ofy().load().type(Setting.class).list();
	}
	
	public Setting getSetting(String name) {
		return ofy().load().type(Setting.class).first().now();
	}
	
	public Setting save(Setting setting) {
		ofy().save().entity(setting).now();

		return setting;
	}
	
	public Setting delete(Setting setting) {
		ofy().delete().entity(setting).now();

		return setting;
	}
}
