package com.niit.backend.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.backend.model.Person;



@Repository
public class PersonDaoImpl implements PersonDao{
  
  @Autowired
  private SessionFactory sessionFactory;
	
  public Person addCustomer(Person person) {
		Session session = sessionFactory.openSession();
		session.save(person);
		session.flush();
		session.close();
		return person;
  }
  
  public Person getPerson(int id){
	  Session session = sessionFactory.openSession();
	  Person person = (Person)session.get(Person.class, id);
	  session.close();
	  return person;
  }
  
  public Person updatePerson(Person person) {
	Session session = sessionFactory.openSession();
	session.update(person);
	session.flush();
	Person update = (Person)session.get(Person.class, person.getId());
	session.close();
	return update;
  }
  
  public void deletePerson(int id) {
	Session session = sessionFactory.openSession();
	Person person = (Person)session.get(Person.class, id);
	session.delete(person);
	session.flush();
	session.close();
  }

  public List<Person> getAllPersons() {
	Session session = sessionFactory.openSession();
	List<Person> persons = session.createQuery("from Person").list();
	return persons;
	
  }

}
