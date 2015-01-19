package com.housetally.service;


import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.housetally.Authorization;
import com.housetally.Points;
import com.housetally.dao.PointsDAO;

@Path("points")
public class PointService {
	
	PointsDAO dao = new PointsDAO();
	Authorization auth = new Authorization();
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Points> getAllPoints(@QueryParam("sinceTime") String sinceTime) {
		
		if (sinceTime == null)
		{
			System.out.println("Returning all points");
			return dao.getAllPoints();
		}
		else
		{
			Date date = new Date ();
			date.setTime(Long.parseLong(sinceTime));
			
			System.out.println("Returning filtered points");
		    return dao.getPointsSince(date);
		}
		
	}
	
	@GET @Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Points getPoints(@PathParam("id") Long id) {
		return dao.getPoints(id);		
	}
	
	@PUT @Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Points updatePoints(Points points) {
		
		if (auth.isAdmin())
		{
			return dao.save(points);	
		}
		else
		{
			throw new WebApplicationException(
			        Response
			          .status(Status.UNAUTHORIZED)
			          .build()
			      );
		}
	}
	
	@DELETE @Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Points deletePoints(@PathParam("id") Long id) {
		
		if (auth.isAdmin())
		{
			Points points = dao.getPoints(id);
			return dao.delete(points);		
		}
		else
		{
			throw new WebApplicationException(
			        Response
			          .status(Status.UNAUTHORIZED)
			          .build()
			      );
		}
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Points newPoints(Points points) {
		
		if (auth.isUser())
		{
			return dao.save(points);	
		}
		else
		{
			throw new WebApplicationException(
			        Response
			          .status(Status.UNAUTHORIZED)
			          .build()
			      );
		}
	}
}
