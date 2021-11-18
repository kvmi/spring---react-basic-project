package com.lewandowski.springproject.api;


import com.lewandowski.springproject.domain.Person;
import com.lewandowski.springproject.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PersonApi {

    private PersonService personService;

    @Autowired
    public PersonApi(PersonService personService) {this.personService = personService; }

    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getPersons(){

        return new ResponseEntity<>(personService.getAllPersons(), HttpStatus.OK);
    }

    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id){
        return new ResponseEntity<>(personService.getPersonById(id), HttpStatus.OK);
    }

    @GetMapping("/persons/company/{company}")
    public ResponseEntity<List<Person>> getPersonsByCompany(@PathVariable String company){
        return new ResponseEntity<>(personService.getPersonsByCompany(company), HttpStatus.OK);
    }


    @PostMapping("/persons")
    public ResponseEntity<Person> addPerson(@RequestBody Person person){
        Person addPerson = personService.addPerson(person);
        if (addPerson==null) return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);


        return new ResponseEntity<>(addPerson, HttpStatus.CREATED);
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<Person> updatePerson(@RequestBody Person person, @PathVariable long id){
        return new ResponseEntity<>(personService.updatePerson(id, person), HttpStatus.OK);
    }

    @DeleteMapping("/persons/{id}")
    public ResponseEntity deletePerson(@PathVariable long id){
        personService.deletePerson(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/company/names")
    public ResponseEntity<List<String>> getCompanyNames() {
        return new ResponseEntity<>(personService.getCompanyNames(), HttpStatus.OK);
    }
}
