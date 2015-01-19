package com.housetally.dao;

import static com.housetally.service.OfyService.ofy;

import java.util.Date;
import java.util.List;

import com.housetally.Points;

public class PointsDAO {
	
	public List<Points> getAllPoints()
	{
		return ofy().load().type(Points.class).list();
	}
	
	public List<Points> getPointsSince(Date timeSince)
	{
		return ofy().load().type(Points.class).filter("time >=", timeSince).list();
	}
	
	public Points getPoints(Long id) {
		return ofy().load().type(Points.class).first().now();
	}
	
	public Points save(Points points) {
		ofy().save().entity(points).now();

		return points;
	}
	
	public Points delete(Points points) {
		ofy().delete().entity(points).now();

		return points;
	}
}
