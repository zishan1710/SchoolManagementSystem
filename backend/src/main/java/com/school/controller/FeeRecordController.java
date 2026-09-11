package com.school.controller;

import com.school.dto.FeeRecordDTO;
import com.school.service.FeeRecordService;
import com.school.entity.PaymentStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/fee-records")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FeeRecordController {
    
    private final FeeRecordService feeRecordService;
    
    public FeeRecordController(FeeRecordService feeRecordService) {
        this.feeRecordService = feeRecordService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<FeeRecordDTO> createFeeRecord(
            @RequestParam Long studentId,
            @RequestParam String feeMonth,
            @RequestParam Long userId) {
        FeeRecordDTO feeRecord = feeRecordService.createOrGetFeeRecord(studentId, feeMonth, userId);
        return new ResponseEntity<>(feeRecord, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}/mark-paid")
    public ResponseEntity<FeeRecordDTO> markAsPaid(
            @PathVariable Long id,
            @RequestParam Long userId) {
        FeeRecordDTO feeRecord = feeRecordService.markAsPaid(id, userId);
        return ResponseEntity.ok(feeRecord);
    }
    
    @PutMapping("/{id}/mark-unpaid")
    public ResponseEntity<FeeRecordDTO> markAsUnpaid(@PathVariable Long id) {
        FeeRecordDTO feeRecord = feeRecordService.markAsUnpaid(id);
        return ResponseEntity.ok(feeRecord);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FeeRecordDTO> getFeeRecord(@PathVariable Long id) {
        FeeRecordDTO feeRecord = feeRecordService.getFeeRecord(id);
        return ResponseEntity.ok(feeRecord);
    }
    
    @GetMapping
    public ResponseEntity<List<FeeRecordDTO>> getAllFeeRecords() {
        List<FeeRecordDTO> feeRecords = feeRecordService.getAllFeeRecords();
        return ResponseEntity.ok(feeRecords);
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeeRecordDTO>> getFeeRecordsByStudent(@PathVariable Long studentId) {
        List<FeeRecordDTO> feeRecords = feeRecordService.getFeeRecordsByStudent(studentId);
        return ResponseEntity.ok(feeRecords);
    }
    
    @GetMapping("/month/{feeMonth}")
    public ResponseEntity<List<FeeRecordDTO>> getFeeRecordsByMonth(@PathVariable String feeMonth) {
        List<FeeRecordDTO> feeRecords = feeRecordService.getFeeRecordsByMonth(feeMonth);
        return ResponseEntity.ok(feeRecords);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<FeeRecordDTO>> getFeeRecordsByStatus(@PathVariable String status) {
        PaymentStatus paymentStatus = PaymentStatus.valueOf(status.toUpperCase());
        List<FeeRecordDTO> feeRecords = feeRecordService.getFeeRecordsByPaymentStatus(paymentStatus);
        return ResponseEntity.ok(feeRecords);
    }
    
    @GetMapping("/class/{classId}/month/{feeMonth}")
    public ResponseEntity<List<FeeRecordDTO>> getFeeRecordsByClassAndMonth(
            @PathVariable Long classId,
            @PathVariable String feeMonth) {
        List<FeeRecordDTO> feeRecords = feeRecordService.getFeeRecordsByClassAndMonth(classId, feeMonth);
        return ResponseEntity.ok(feeRecords);
    }
}
