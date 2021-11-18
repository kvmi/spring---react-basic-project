package com.lewandowski.springproject.repository;

import com.lewandowski.springproject.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByCompany(String companyName);
}
