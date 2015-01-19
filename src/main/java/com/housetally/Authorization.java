package com.housetally;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.NotFoundException;
import com.housetally.dao.HouseUserDAO;

public class Authorization {

	public HouseUser currentUser;
	public UserService userService;
	
	public Authorization() {
		
		HouseUserDAO dao = new HouseUserDAO();
		
		userService = UserServiceFactory.getUserService();
		
		User user = userService.getCurrentUser();
		
		String email = null;
		
		if (user != null)
		{
			email = user.getEmail();
			try {
				currentUser = dao.getHouseUser(email);
			} catch(NotFoundException e) {
				currentUser = new HouseUser();
				System.out.println(e);
			}			
		}
		else
		{
			currentUser = new HouseUser();
		}
		
	}
	
	public Boolean isAdmin() {
		
		return this.isSuperAdmin() || currentUser.getAdmin();
	}
	
	public Boolean isSuperAdmin() {
		if (userService.isUserLoggedIn())
		{
			return userService.isUserAdmin();
		}
		else
		{
			return false;
		}
	}
	
	public Boolean isUser() {
		return !currentUser.equals(null);
	}
	
	public Boolean isLoggedIn() {
		return userService.isUserLoggedIn();
	}
}
