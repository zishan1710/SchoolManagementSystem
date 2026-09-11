package com.school.service;

import com.school.entity.PaymentStatus;
import com.school.repository.ClassRepository;
import com.school.repository.FeeRecordRepository;
import com.school.repository.StudentRepository;
import com.school.repository.UserRepository;
import com.school.entity.UserRole;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    
    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final FeeRecordRepository feeRecordRepository;
    
    public DashboardService(StudentRepository studentRepository,
                           ClassRepository classRepository,
                           UserRepository userRepository,
                           FeeRecordRepository feeRecordRepository) {
        this.studentRepository = studentRepository;
        this.classRepository = classRepository;
        this.userRepository = userRepository;
        this.feeRecordRepository = feeRecordRepository;
    }
    
    public Map<String, Object> getAdminDashboard() {
        String currentMonth = YearMonth.now().toString();
        
        long totalStudents = studentRepository.count();
        long totalClasses = classRepository.count();
        long financeUsers = userRepository.findByRole(UserRole.FINANCE).size();
        long paidStudents = feeRecordRepository.findByPaymentStatus(PaymentStatus.PAID).size();
        long unpaidStudents = feeRecordRepository.findByPaymentStatus(PaymentStatus.UNPAID).size();
        
        BigDecimal totalFeesCollected = feeRecordRepository.sumCollectedFeesByMonth(currentMonth);
        if (totalFeesCollected == null) {
            totalFeesCollected = BigDecimal.ZERO;
        }
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalStudents", totalStudents);
        dashboard.put("totalClasses", totalClasses);
        dashboard.put("financeUsers", financeUsers);
        dashboard.put("paidStudents", paidStudents);
        dashboard.put("unpaidStudents", unpaidStudents);
        dashboard.put("totalFeesCollected", totalFeesCollected);
        dashboard.put("currentMonth", currentMonth);
        
        return dashboard;
    }
    
    public Map<String, Object> getFinanceDashboard() {
        String currentMonth = YearMonth.now().toString();
        
        long totalStudents = studentRepository.count();
        long paidStudents = feeRecordRepository.findByPaymentStatus(PaymentStatus.PAID).size();
        long unpaidStudents = feeRecordRepository.findByPaymentStatus(PaymentStatus.UNPAID).size();
        
        BigDecimal collectedFees = feeRecordRepository.sumCollectedFeesByMonth(currentMonth);
        if (collectedFees == null) {
            collectedFees = BigDecimal.ZERO;
        }
        
        // Calculate expected fees for current month
        long totalFeeRecordsThisMonth = feeRecordRepository.countTotalFeesByMonth(currentMonth);
        BigDecimal expectedFees = BigDecimal.valueOf(totalFeeRecordsThisMonth).multiply(
                new BigDecimal("400") // Average of ₹300 and ₹500
        );
        
        BigDecimal pendingFees = expectedFees.subtract(collectedFees);
        if (pendingFees.compareTo(BigDecimal.ZERO) < 0) {
            pendingFees = BigDecimal.ZERO;
        }
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalStudents", totalStudents);
        dashboard.put("expectedFees", expectedFees);
        dashboard.put("collectedFees", collectedFees);
        dashboard.put("pendingFees", pendingFees);
        dashboard.put("paidStudents", paidStudents);
        dashboard.put("unpaidStudents", unpaidStudents);
        dashboard.put("currentMonth", currentMonth);
        
        return dashboard;
    }
}
