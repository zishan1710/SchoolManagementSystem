package com.school.controller;

import com.school.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReportController {
    
    private final ReportService reportService;
    
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }
    
    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyReport(@RequestParam String month) {
        Map<String, Object> report = reportService.getMonthlyReport(month);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/class-wise-monthly")
    public ResponseEntity<Map<String, Object>> getClassWiseMonthlyReport(@RequestParam String month) {
        Map<String, Object> report = reportService.getClassWiseMonthlyReport(month);
        return ResponseEntity.ok(report);
    }
}
