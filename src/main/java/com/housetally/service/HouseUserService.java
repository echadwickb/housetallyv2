package com.housetally.service;


import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.housetally.Authorization;
import com.housetally.HouseUser;
import com.housetally.dao.HouseUserDAO;

@Path("user")
public class HouseUserService {

	HouseUserDAO dao = new HouseUserDAO();
	Authorization auth = new Authorization();
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<HouseUser> getHouseUsers() {
		
		if (auth.isAdmin()) {
			return dao.getHouseUsers();
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
	
	@GET @Path("{email}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public HouseUser getHouseUser(@PathParam("email") String email) {
		
		if (auth.isAdmin())
		{
			return dao.getHouseUser(email);
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
	
	@PUT @Path("{email}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public HouseUser updateHouseUser(HouseUser houseUser) {
		
		if (auth.isAdmin())
		{
			return dao.save(houseUser);
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
	
	@DELETE @Path("{email}")
	@Produces(MediaType.APPLICATION_JSON)
	public HouseUser deleteHouseUser(@PathParam("email") String email) {
		
		if (auth.isAdmin())
		{
			HouseUser houseUser = dao.getHouseUser(email);
			return dao.delete(houseUser);
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
	public HouseUser newHouseUser(HouseUser houseUser) {
		
		if (auth.isAdmin())
		{
			return dao.save(houseUser);		
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
	
	@GET @Path("login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public HouseUser login() {
		
		auth.currentUser.setLoggedIn(auth.isLoggedIn());
		auth.currentUser.setSuperAdmin(auth.isSuperAdmin());
		auth.currentUser.setLoginUrl(auth.userService.createLoginURL("/"));
		auth.currentUser.setLogoutUrl(auth.userService.createLogoutURL("/"));
		
		return auth.currentUser;
	}
}
