/**
 * 
 */
package com.lix.ab.web;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 *
 * @author lix
 * Internet Banking System Group,CSII
 */
public class Starter {
	
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:/META-INF/spring/applicationContext.xml");
	}
	
	
}
