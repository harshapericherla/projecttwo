package com.niit.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.niit.backend.dao.PersonDao;
import com.niit.backend.model.Person;
import com.niit.backend.service.PersonService;
import com.niit.backend.model.Error;;
@RestController  //automatially converts all java objects to json 
public class PersonController {
	@Autowired
  private PersonService personService;
	
	@Autowired
  private PersonDao personDao;
	
	@RequestMapping(value="/addPerson",method=RequestMethod.POST)
	
	//ReqeustBody - client to server - json to java object
	//ResponseBody - server to client - java object to json
	public @ResponseBody Person addPerson(@RequestBody Person person){
		
		return personService.addCustomer(person);
	}
	
	@RequestMapping(value="/getPerson/{id}",method=RequestMethod.GET)
    public ResponseEntity<?> getPerson( @PathVariable(value="id") int id){
		
		Person person = personDao.getPerson(id);
		if(person == null){
			Error error = new Error(1,"Person Id["+id+"]"+" doesnt exist");
			return new ResponseEntity<Error>(error,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Person>(person,HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateperson",method=RequestMethod.PUT)
	public ResponseEntity<?> updatePerson(@RequestBody Person person){
		
		Person currentPerson = personDao.getPerson(person.getId());
		if(currentPerson==null){
			Error error = new Error(1,"Person Id["+person.getId()+"]"+" doesnt exist");
			return new ResponseEntity<Error>(error,HttpStatus.NOT_FOUND);
		}
		
		Person updatedPerson = personDao.updatePerson(person);
		return new ResponseEntity<Person>(updatedPerson,HttpStatus.OK);
	}
	
	@RequestMapping(value="/deletePerson/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> deletePerson(@PathVariable int id){
		
		Person person = personDao.getPerson(id);
		if(person==null){
			Error error = new Error(1,"Person Id["+person.getId()+"]"+" doesnt exist");
			return new ResponseEntity<Error>(error,HttpStatus.NOT_FOUND);
		}
		personDao.deletePerson(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/getPersons",method=RequestMethod.GET)
	public ResponseEntity<?> getAllPersons(){
		List<Person> persons = personDao.getAllPersons();
		if(persons.size()==0){
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Person>>(persons,HttpStatus.OK);
	}
}
