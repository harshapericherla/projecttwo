package com.niit.backend.dao;

import java.util.List;

import com.niit.backend.model.Person;

public interface PersonDao {
Person addCustomer(Person person);
Person getPerson(int id);
Person updatePerson(Person person);
void deletePerson(int id);
List<Person> getAllPersons();
}
