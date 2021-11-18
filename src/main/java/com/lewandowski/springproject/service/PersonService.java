package com.lewandowski.springproject.service;

import com.lewandowski.springproject.domain.Company;
import com.lewandowski.springproject.domain.Person;

import java.util.List;

public interface PersonService {

    List<Person> getAllPersons();

    Person addPerson (Person person);

    void deletePerson(long id);

    Person updatePerson(long id, Person person);

    Person getPersonById(long id);

    List<Person> getPersonsByCompany(String company);

    List<Company> getCompanyList();

    List<String> getCompanyNames();

}
