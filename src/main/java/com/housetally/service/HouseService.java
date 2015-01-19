package com.housetally.service;


import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.housetally.Authorization;
import com.housetally.House;
import com.housetally.dao.HouseDAO;

@Path("house")
public class HouseService {

	HouseDAO dao = new HouseDAO();
	Authorization auth = new Authorization();
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<House> getHouses() {
		return dao.getHouses();
	}
	
	@GET @Path("{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public House getHouse(@PathParam("name") String name) {
		return dao.getHouse(name);		
	}
	
	@PUT @Path("{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public House updateHouse(House house) {
		
		if (auth.isAdmin())
		{
			return dao.save(house);	
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
	
	@DELETE @Path("{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public House deleteHouse(@PathParam("name") String name) {
		
		if (auth.isAdmin())
		{
			House house = dao.getHouse(name);
			return dao.delete(house);		
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
	public House newHouse(House house) {
		
		if (auth.isAdmin())
		{
			return dao.save(house);		
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
