package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeeStructureDTO {
    private Long id;
    private Long classId;
    private String className;
    private Integer classNumber;
    private String studentType;
    private BigDecimal monthlyFee;
}
