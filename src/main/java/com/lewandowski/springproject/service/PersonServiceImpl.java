package com.lewandowski.springproject.service;


import com.lewandowski.springproject.domain.Company;
import com.lewandowski.springproject.domain.Person;
import com.lewandowski.springproject.repository.CompanyRepository;
import com.lewandowski.springproject.repository.PersonRepository;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


@Service
public class PersonServiceImpl implements PersonService {

    private List<Person> personList = new ArrayList<>();
    private List<Company> companyList = new ArrayList<>();

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private CompanyRepository companyRepository;


    public PersonServiceImpl() {
//        loadPersonCSV();
    }

    @Override
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @Override
    public Person addPerson(Person person) {
        if(isValidEmailAddress(person.getEmail())) {
            if (firstNameValidation(person.getFirstName())&&firstNameValidation(person.getLastName())) {
                return personRepository.save(person);
            }
        }
        return null;
    }

    @Override
    public void deletePerson(long id) {
        personRepository.deleteById(id);
    }

    @Override
    public Person updatePerson(long id, Person person) {
        Person personToUpdate = getPersonById(id);
        personToUpdate.setCompany(person.getCompany());
        personToUpdate.setDateOfEmployment(person.getDateOfEmployment());
        personToUpdate.setEmail(person.getEmail());
        personToUpdate.setFirstName(person.getFirstName());
        personToUpdate.setLastName(person.getLastName());

        return personRepository.save(personToUpdate);
    }

    @Override
    public Person getPersonById(long id) {

        return personRepository.findById(id).orElse(null);

    }

    @Override
    public List<Person> getPersonsByCompany(String company) {
        return personRepository.findAllByCompany(company);
    }

    public List<Company> getCompanyList() {
        return companyList;
    }

    public List<String> getCompanyNames() {
        List<String> companyNames = new ArrayList<>();
        for (Company company :
                companyList) {
            companyNames.add(company.getCompanyName());
        }
        return companyNames;
    }


//    private void loadPersonCSV() {
//        try {
//
//            // Create an object of filereader
//            // class with CSV file as a parameter.
//            FileReader filereader = new FileReader("D:\\Git\\projekt\\src\\main\\java\\com\\lewandowski\\springproject\\service\\Data.csv");
//
//            // create csvReader object passing
//            // file reader as a parameter
//            CSVReader csvReader = new CSVReader(filereader);
//            String[] nextRecord;
//            csvReader.readNext();
//
//            // we are going to read data line by line
//            while ((nextRecord = csvReader.readNext()) != null) {
//                Company company = Company.builder().companyName(nextRecord[4]).build();
//                Person person = Person.builder().id(Long.parseLong(nextRecord[0])).firstName(nextRecord[1]).lastName(nextRecord[2]).email(nextRecord[3]).company(company).dateOfEmployment(new SimpleDateFormat("dd/MM/yyyy").parse(nextRecord[5])).build();
//                personList.add(person);
//                companyList.add(company);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    private boolean isValidEmailAddress(String email) {
        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException ex) {
            result = false;
        }
        return result;
    }

    private boolean firstNameValidation(String firstName){


        return firstName.matches("(?i)(^[a-z])((?![ .,'-]$)[a-z .,'-]){0,24}$");
    }


}
