package com.school.repository;

import com.school.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ClassRepository extends JpaRepository<Class, Long> {
    Optional<Class> findByClassNumber(Integer classNumber);
}
