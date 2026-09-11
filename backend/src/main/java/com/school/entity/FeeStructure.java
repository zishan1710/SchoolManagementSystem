package com.school.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "fee_structures", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"class_id", "student_type"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeeStructure {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id", nullable = false)
    private Class classEntity;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StudentType studentType;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monthlyFee;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
