package com.school.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Entity
@Table(name = "fee_records", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "fee_month"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeeRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @Column(nullable = false)
    private String feeMonth; // Format: YYYY-MM
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal feeAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;
    
    @Column
    private LocalDate paymentDate;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recorded_by_user_id")
    private User recordedBy;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
