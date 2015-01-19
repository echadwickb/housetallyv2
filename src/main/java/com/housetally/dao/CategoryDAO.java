package com.housetally.dao;

import static com.housetally.service.OfyService.ofy;

import java.util.List;

import com.housetally.Category;

public class CategoryDAO {

	public List<Category> getCategories()
	{
		return ofy().load().type(Category.class).list();
	}
	
	public Category getCategory(Long id) {
		
		return ofy().load().type(Category.class).first().now();
	}
	
	public Category save(Category category) {
		
		ofy().save().entity(category).now();
		
		return category;
	}
	
	public Category delete(Category category) {
		
		ofy().delete().entity(category).now();		
		
		return category;
	}
}
