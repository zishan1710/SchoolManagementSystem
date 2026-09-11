package com.school.repository;

import com.school.entity.FeeRecord;
import com.school.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface FeeRecordRepository extends JpaRepository<FeeRecord, Long> {
    Optional<FeeRecord> findByStudentIdAndFeeMonth(Long studentId, String feeMonth);
    List<FeeRecord> findByStudentId(Long studentId);
    List<FeeRecord> findByFeeMonth(String feeMonth);
    List<FeeRecord> findByPaymentStatus(PaymentStatus paymentStatus);
    
    @Query("SELECT fr FROM FeeRecord fr WHERE fr.student.classEntity.id = :classId AND fr.feeMonth = :feeMonth")
    List<FeeRecord> findByClassAndMonth(@Param("classId") Long classId, @Param("feeMonth") String feeMonth);
    
    @Query("SELECT COUNT(fr) FROM FeeRecord fr WHERE fr.feeMonth = :feeMonth AND fr.paymentStatus = 'PAID'")
    Long countPaidFeesByMonth(@Param("feeMonth") String feeMonth);
    
    @Query("SELECT COUNT(fr) FROM FeeRecord fr WHERE fr.feeMonth = :feeMonth")
    Long countTotalFeesByMonth(@Param("feeMonth") String feeMonth);
    
    @Query("SELECT SUM(fr.feeAmount) FROM FeeRecord fr WHERE fr.feeMonth = :feeMonth AND fr.paymentStatus = 'PAID'")
    BigDecimal sumCollectedFeesByMonth(@Param("feeMonth") String feeMonth);
}
