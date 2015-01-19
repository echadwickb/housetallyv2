package com.housetally.service;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;
import com.housetally.Category;
import com.housetally.House;
import com.housetally.HouseUser;
import com.housetally.Points;
import com.housetally.Setting;

public class OfyService {
    static {
        factory().register(House.class);		
		factory().register(Points.class);
		factory().register(HouseUser.class);
		factory().register(Category.class);
		factory().register(Setting.class);
    }

    public static Objectify ofy() {
        return ObjectifyService.ofy();
    }

    public static ObjectifyFactory factory() {
        return ObjectifyService.factory();
    }
}