package com.lewandowski.springproject.service;

import com.lewandowski.springproject.domain.Company;

import com.lewandowski.springproject.domain.Person;
import com.lewandowski.springproject.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    private PersonService personService;
    private List<Company> companyList;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    public CompanyServiceImpl(PersonService personService) {
        this.personService = personService;

//        this.companyList = personService.getCompanyList();
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }



    @Override
    public void deleteCompany(String companyName) {
        companyRepository.deleteByCompanyName(companyName);
    }

    @Override
    public Company updateCompany(String companyName, Company company) {
        Company companyToUpdate = getCompanyByName(companyName);
        companyToUpdate.setCompanyName(company.getCompanyName());
        companyToUpdate.setCompanyPresident(company.getCompanyPresident());
        return companyRepository.save(companyToUpdate);
    }

    @Override
    public Company getCompanyByName(String companyName) {

        return companyRepository.findAllByCompanyName(companyName);
    }

}
