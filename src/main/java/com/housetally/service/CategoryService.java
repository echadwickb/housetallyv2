package com.housetally.service;


import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.POST;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.housetally.Authorization;
import com.housetally.Category;
import com.housetally.dao.CategoryDAO;

@Path("category")
public class CategoryService {
	
	CategoryDAO dao = new CategoryDAO();
	Authorization auth = new Authorization();
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Category> getCategories() {
		
		return dao.getCategories();
	}
	
	@GET @Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Category getCategory(@PathParam("id") Long id) {
		
		return dao.getCategory(id);
	}
	
	@PUT @Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Category updateCategory(Category category) {
		
		if (auth.isAdmin())
		{
			return dao.save(category);		
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
	@Produces(MediaType.APPLICATION_JSON)
	public Category deleteCategory(@PathParam("id") Long id) {
		
		if (auth.isAdmin())
		{
			Category category = dao.getCategory(id);
			return dao.delete(category);	
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
	public Category newCategory(Category category) {
		
		if (auth.isAdmin())
		{
			return dao.save(category);
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
