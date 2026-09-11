package com.school.repository;

import com.school.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByStudentId(String studentId);
    
    List<Student> findByClassEntityId(Long classId);

    
    @Query("SELECT s FROM Student s WHERE s.name ILIKE %:searchTerm% OR s.studentId ILIKE %:searchTerm%")
    List<Student> searchByNameOrStudentId(@Param("searchTerm") String searchTerm);
}
