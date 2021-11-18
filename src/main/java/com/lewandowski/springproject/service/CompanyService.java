package com.lewandowski.springproject.service;

import com.lewandowski.springproject.domain.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    Company addCompany (Company company);

    void deleteCompany(String companyName);

    Company updateCompany(String companyName, Company company);

    Company getCompanyByName(String companyName);

}
