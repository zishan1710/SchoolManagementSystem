package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeeRecordDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentType;
    private Long classId;
    private Integer classNumber;
    private String feeMonth;
    private BigDecimal feeAmount;
    private String paymentStatus;
    private LocalDate paymentDate;
    private String recordedByName;
}
