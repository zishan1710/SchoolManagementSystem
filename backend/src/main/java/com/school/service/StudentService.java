package com.school.service;

import com.school.dto.StudentDTO;
import com.school.entity.Class;
import com.school.entity.Student;
import com.school.entity.StudentType;
import com.school.exception.ResourceNotFoundException;
import com.school.repository.ClassRepository;
import com.school.repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    
    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;
    
    public StudentService(StudentRepository studentRepository, ClassRepository classRepository) {
        this.studentRepository = studentRepository;
        this.classRepository = classRepository;
    }
    
    public StudentDTO addStudent(StudentDTO studentDTO) {
        // Check if student ID already exists
        if (studentRepository.findByStudentId(studentDTO.getStudentId()).isPresent()) {
            throw new IllegalArgumentException("Student ID already exists");
        }
        
        Class classEntity = classRepository.findById(studentDTO.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));
        
        Student student = new Student();
        student.setName(studentDTO.getName());
        student.setStudentId(studentDTO.getStudentId());
        student.setParentName(studentDTO.getParentName());
        student.setContactNumber(studentDTO.getContactNumber());
        student.setClassEntity(classEntity);
        student.setStudentType(StudentType.valueOf(studentDTO.getStudentType()));
        
        Student savedStudent = studentRepository.save(student);
        return convertToDTO(savedStudent);
    }
    
    public StudentDTO updateStudent(Long studentId, StudentDTO studentDTO) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        
        Class classEntity = classRepository.findById(studentDTO.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));
        
        student.setName(studentDTO.getName());
        student.setParentName(studentDTO.getParentName());
        student.setContactNumber(studentDTO.getContactNumber());
        student.setClassEntity(classEntity);
        student.setStudentType(StudentType.valueOf(studentDTO.getStudentType()));
        
        Student updatedStudent = studentRepository.save(student);
        return convertToDTO(updatedStudent);
    }
    
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        studentRepository.delete(student);
    }
    
    public StudentDTO getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return convertToDTO(student);
    }
    
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<StudentDTO> getStudentsByClass(Long classId) {
        return studentRepository.findByClassEntityId(classId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<StudentDTO> searchStudents(String searchTerm) {
        return studentRepository.searchByNameOrStudentId(searchTerm)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private StudentDTO convertToDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getName(),
                student.getStudentId(),
                student.getParentName(),
                student.getContactNumber(),
                student.getClassEntity().getId(),
                student.getClassEntity().getClassName(),
                student.getClassEntity().getClassNumber(),
                student.getStudentType().toString()
        );
    }
}
