package com.lewandowski.springproject.repository;


import com.lewandowski.springproject.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findAllByCompanyName(String companyName);
    Company deleteByCompanyName(String companyName);
}
