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
import com.housetally.Setting;
import com.housetally.dao.SettingDAO;

@Path("setting")
public class SettingService {

	SettingDAO dao = new SettingDAO();
	Authorization auth = new Authorization();
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Setting> getSettings() {
		return dao.getSettings();
	}
	
	@GET @Path("{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Setting getSetting(@PathParam("name") String name) {
		return dao.getSetting(name);		
	}
	
	@PUT @Path("{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Setting updateSetting(Setting setting) {
		
		if (auth.isAdmin())
		{
			return dao.save(setting);	
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
	public Setting deleteSetting(@PathParam("name") String name) {
		
		if (auth.isAdmin())
		{
			Setting setting = dao.getSetting(name);
			return dao.delete(setting);		
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
	public Setting newSetting(Setting setting) {
		
		if (auth.isAdmin())
		{
			return dao.save(setting);		
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
