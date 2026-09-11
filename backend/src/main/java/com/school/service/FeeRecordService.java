package com.school.service;

import com.school.dto.FeeRecordDTO;
import com.school.entity.*;
import com.school.exception.ResourceNotFoundException;
import com.school.repository.FeeRecordRepository;
import com.school.repository.FeeStructureRepository;
import com.school.repository.StudentRepository;
import com.school.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeeRecordService {
    
    private final FeeRecordRepository feeRecordRepository;
    private final StudentRepository studentRepository;
    private final FeeStructureRepository feeStructureRepository;
    private final UserRepository userRepository;
    
    public FeeRecordService(FeeRecordRepository feeRecordRepository, 
                           StudentRepository studentRepository,
                           FeeStructureRepository feeStructureRepository,
                           UserRepository userRepository) {
        this.feeRecordRepository = feeRecordRepository;
        this.studentRepository = studentRepository;
        this.feeStructureRepository = feeStructureRepository;
        this.userRepository = userRepository;
    }
    
    public FeeRecordDTO createOrGetFeeRecord(Long studentId, String feeMonth, Long userId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        
        // Check if fee record already exists for this month
        Optional<FeeRecord> existingRecord = feeRecordRepository.findByStudentIdAndFeeMonth(studentId, feeMonth);
        if (existingRecord.isPresent()) {
            return convertToDTO(existingRecord.get());
        }
        
        // Get fee structure
        FeeStructure feeStructure = feeStructureRepository.findByClassIdAndStudentType(
                student.getClassEntity().getId(),
                student.getStudentType()
        ).orElseThrow(() -> new ResourceNotFoundException("Fee structure not found"));
        
        // Create new fee record
        FeeRecord feeRecord = new FeeRecord();
        feeRecord.setStudent(student);
        feeRecord.setFeeMonth(feeMonth);
        feeRecord.setFeeAmount(feeStructure.getMonthlyFee());
        feeRecord.setPaymentStatus(PaymentStatus.UNPAID);
        
        User recordedByUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        feeRecord.setRecordedBy(recordedByUser);
        
        FeeRecord savedRecord = feeRecordRepository.save(feeRecord);
        return convertToDTO(savedRecord);
    }
    
    public FeeRecordDTO markAsPaid(Long feeRecordId, Long userId) {
        FeeRecord feeRecord = feeRecordRepository.findById(feeRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee record not found"));
        
        feeRecord.setPaymentStatus(PaymentStatus.PAID);
        feeRecord.setPaymentDate(LocalDate.now());
        
        User recordedByUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        feeRecord.setRecordedBy(recordedByUser);
        
        FeeRecord updatedRecord = feeRecordRepository.save(feeRecord);
        return convertToDTO(updatedRecord);
    }
    
    public FeeRecordDTO markAsUnpaid(Long feeRecordId) {
        FeeRecord feeRecord = feeRecordRepository.findById(feeRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee record not found"));
        
        feeRecord.setPaymentStatus(PaymentStatus.UNPAID);
        feeRecord.setPaymentDate(null);
        
        FeeRecord updatedRecord = feeRecordRepository.save(feeRecord);
        return convertToDTO(updatedRecord);
    }
    
    public FeeRecordDTO getFeeRecord(Long feeRecordId) {
        FeeRecord feeRecord = feeRecordRepository.findById(feeRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee record not found"));
        return convertToDTO(feeRecord);
    }
    
    public List<FeeRecordDTO> getFeeRecordsByStudent(Long studentId) {
        return feeRecordRepository.findByStudentId(studentId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeeRecordDTO> getFeeRecordsByMonth(String feeMonth) {
        return feeRecordRepository.findByFeeMonth(feeMonth)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeeRecordDTO> getFeeRecordsByPaymentStatus(PaymentStatus paymentStatus) {
        return feeRecordRepository.findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeeRecordDTO> getFeeRecordsByClassAndMonth(Long classId, String feeMonth) {
        return feeRecordRepository.findByClassAndMonth(classId, feeMonth)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeeRecordDTO> getAllFeeRecords() {
        return feeRecordRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private FeeRecordDTO convertToDTO(FeeRecord feeRecord) {
        return new FeeRecordDTO(
                feeRecord.getId(),
                feeRecord.getStudent().getId(),
                feeRecord.getStudent().getName(),
                feeRecord.getStudent().getStudentType().toString(),
                feeRecord.getStudent().getClassEntity().getId(),
                feeRecord.getStudent().getClassEntity().getClassNumber(),
                feeRecord.getFeeMonth(),
                feeRecord.getFeeAmount(),
                feeRecord.getPaymentStatus().toString(),
                feeRecord.getPaymentDate(),
                feeRecord.getRecordedBy() != null ? feeRecord.getRecordedBy().getName() : null
        );
    }
}
