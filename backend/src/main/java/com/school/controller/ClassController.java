package com.school.controller;

import com.school.dto.ClassDTO;
import com.school.entity.Class;
import com.school.repository.ClassRepository;
import com.school.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/classes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ClassController {
    
    private final ClassRepository classRepository;
    private final StudentRepository studentRepository;
    
    public ClassController(ClassRepository classRepository, StudentRepository studentRepository) {
        this.classRepository = classRepository;
        this.studentRepository = studentRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<ClassDTO>> getAllClasses() {
        List<ClassDTO> classes = classRepository.findAll()
                .stream()
                .map(classEntity -> new ClassDTO(
                        classEntity.getId(),
                        classEntity.getClassNumber(),
                        classEntity.getClassName(),
                        studentRepository.findByClassEntityId(classEntity.getId()).size()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(classes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ClassDTO> getClass(@PathVariable Long id) {
        Class classEntity = classRepository.findById(id).orElseThrow();
        ClassDTO classDTO = new ClassDTO(
                classEntity.getId(),
                classEntity.getClassNumber(),
                classEntity.getClassName(),
                studentRepository.findByClassEntityId(classEntity.getId()).size()
        );
        return ResponseEntity.ok(classDTO);
    }
}
