package com.school.repository;

import com.school.entity.FeeStructure;
import com.school.entity.StudentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Optional;


public interface FeeStructureRepository extends JpaRepository<FeeStructure, Long> {

    @Query("""
                SELECT f
                FROM FeeStructure f
                WHERE f.classEntity.id = :classId
                AND f.studentType = :studentType
            """)
    Optional<FeeStructure> findByClassIdAndStudentType(
            @Param("classId") Long classId,
            @Param("studentType") StudentType studentType);
}