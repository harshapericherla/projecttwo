package com.niit.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.niit.backend.dao.PersonDao;
import com.niit.backend.model.Person;

@Service
public class PersonServiceImpl implements PersonService{
	@Autowired
	private PersonDao personDao;
	public Person addCustomer(Person person) {
	   return personDao.addCustomer(person);
	}
}
