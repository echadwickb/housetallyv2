package com.housetally;

import javax.xml.bind.annotation.XmlRootElement;
import javax.persistence.Id;

@XmlRootElement
public class Category {
	
	@Id private Long id;
	private String category1;	
	private String category2;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
}
