package com.school.service;

import com.school.dto.FeeRecordDTO;
import com.school.entity.PaymentStatus;
import com.school.repository.FeeRecordRepository;
import com.school.repository.StudentRepository;
import com.school.repository.ClassRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

        private final FeeRecordRepository feeRecordRepository;
        private final StudentRepository studentRepository;
        private final ClassRepository classRepository;
        private final FeeRecordService feeRecordService;

        public ReportService(FeeRecordRepository feeRecordRepository,
                        StudentRepository studentRepository,
                        ClassRepository classRepository,
                        FeeRecordService feeRecordService) {
                this.feeRecordRepository = feeRecordRepository;
                this.studentRepository = studentRepository;
                this.classRepository = classRepository;
                this.feeRecordService = feeRecordService;
        }

        public Map<String, Object> getMonthlyReport(String feeMonth) {
                List<FeeRecordDTO> monthlyRecords = feeRecordService.getFeeRecordsByMonth(feeMonth);

                long totalStudents = studentRepository.count();
                long totalExpectedFees = monthlyRecords.size();
                long paidCount = monthlyRecords.stream()
                                .filter(r -> "PAID".equals(r.getPaymentStatus()))
                                .count();
                long unpaidCount = totalExpectedFees - paidCount;

                BigDecimal collectedFees = feeRecordRepository.sumCollectedFeesByMonth(feeMonth);
                if (collectedFees == null) {
                        collectedFees = BigDecimal.ZERO;
                }

                BigDecimal pendingFees = monthlyRecords.stream()
                                .filter(r -> "UNPAID".equals(r.getPaymentStatus()))
                                .map(r -> r != null && r.getFeeAmount() != null ? r.getFeeAmount() : BigDecimal.ZERO)
                                .reduce(BigDecimal.ZERO, (total, amount) -> total
                                                .add(amount != null ? amount : BigDecimal.ZERO));

                Map<String, Object> report = new HashMap<>();
                report.put("month", feeMonth);
                report.put("totalStudents", totalStudents);
                report.put("totalExpectedFees", totalExpectedFees);
                report.put("collectedFees", collectedFees);
                report.put("pendingFees", pendingFees);
                report.put("paidStudents", paidCount);
                report.put("unpaidStudents", unpaidCount);

                return report;
        }

        public Map<String, Object> getClassWiseMonthlyReport(String feeMonth) {
                List<FeeRecordDTO> monthlyRecords = feeRecordService.getFeeRecordsByMonth(feeMonth);

                Map<Integer, Map<String, Object>> classWiseData = new HashMap<>();

                classRepository.findAll().forEach(classEntity -> {
                        List<FeeRecordDTO> classRecords = monthlyRecords.stream()
                                        .filter(r -> r.getClassId().equals(classEntity.getId()))
                                        .collect(Collectors.toList());

                        long totalStudentsInClass = studentRepository.findByClassEntityId(classEntity.getId()).size();
                        long paidInClass = classRecords.stream()
                                        .filter(r -> "PAID".equals(r.getPaymentStatus()))
                                        .count();
                        long unpaidInClass = classRecords.size() - paidInClass;

                        BigDecimal collectedInClass = classRecords.stream()
                                        .filter(r -> "PAID".equals(r.getPaymentStatus()))
                                        .map(r -> r != null && r.getFeeAmount() != null ? r.getFeeAmount()
                                                        : BigDecimal.ZERO)
                                        .reduce(BigDecimal.ZERO, (total, amount) -> total
                                                        .add(amount != null ? amount : BigDecimal.ZERO));

                        BigDecimal pendingInClass = classRecords.stream()
                                        .filter(r -> "UNPAID".equals(r.getPaymentStatus()))
                                        .map(r -> r != null && r.getFeeAmount() != null ? r.getFeeAmount()
                                                        : BigDecimal.ZERO)
                                        .reduce(BigDecimal.ZERO, (total, amount) -> total
                                                        .add(amount != null ? amount : BigDecimal.ZERO));

                        BigDecimal expectedInClass = classRecords.stream()
                                        .map(r -> r != null && r.getFeeAmount() != null ? r.getFeeAmount()
                                                        : BigDecimal.ZERO)
                                        .reduce(BigDecimal.ZERO, (total, amount) -> total
                                                        .add(amount != null ? amount : BigDecimal.ZERO));

                        Map<String, Object> classData = new HashMap<>();
                        classData.put("className", classEntity.getClassName());
                        classData.put("totalStudents", totalStudentsInClass);
                        classData.put("paidStudents", paidInClass);
                        classData.put("unpaidStudents", unpaidInClass);
                        classData.put("expectedFees", expectedInClass);
                        classData.put("collectedFees", collectedInClass);
                        classData.put("pendingFees", pendingInClass);

                        classWiseData.put(classEntity.getClassNumber(), classData);
                });

                Map<String, Object> response = new HashMap<>();
                response.put("month", feeMonth);
                response.put("classWiseData", classWiseData);

                return response;
        }
}
