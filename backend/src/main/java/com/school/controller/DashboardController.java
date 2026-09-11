package com.school.controller;

import com.school.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    
    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = dashboardService.getAdminDashboard();
        return ResponseEntity.ok(dashboard);
    }
    
    @GetMapping("/finance")
    public ResponseEntity<Map<String, Object>> getFinanceDashboard() {
        Map<String, Object> dashboard = dashboardService.getFinanceDashboard();
        return ResponseEntity.ok(dashboard);
    }
}
