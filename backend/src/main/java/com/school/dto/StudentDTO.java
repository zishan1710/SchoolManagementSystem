package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String name;
    private String studentId;
    private String parentName;
    private String contactNumber;
    private Long classId;
    private String className;
    private Integer classNumber;
    private String studentType;
}
