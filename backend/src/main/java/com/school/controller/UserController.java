package com.school.controller;

import com.school.dto.UserDTO;
import com.school.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/finance")
    public ResponseEntity<UserDTO> addFinanceUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userService.addFinanceUser(userDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/finance/all")
    public ResponseEntity<List<UserDTO>> getAllFinanceUsers() {
        List<UserDTO> users = userService.getAllFinanceUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/finance/active")
    public ResponseEntity<List<UserDTO>> getActiveFinanceUsers() {
        List<UserDTO> users = userService.getActiveFinanceUsers();
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateFinanceUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateFinanceUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateFinanceUser(@PathVariable Long id) {
        userService.deactivateFinanceUser(id);
        return ResponseEntity.noContent().build();
    }
}
