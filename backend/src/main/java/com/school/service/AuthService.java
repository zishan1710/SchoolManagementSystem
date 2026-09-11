package com.school.service;

import com.school.dto.LoginRequest;
import com.school.dto.LoginResponse;
import com.school.entity.User;
import com.school.exception.AuthenticationException;
import com.school.repository.UserRepository;
import com.school.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    
    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }
    
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        
        if (user.isEmpty()) {
            throw new AuthenticationException("Invalid email or password");
        }
        
        User foundUser = user.get();
        
        if (!foundUser.getActive()) {
            throw new AuthenticationException("User account is deactivated");
        }
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }
        
        String token = jwtUtil.generateToken(foundUser.getEmail(), foundUser.getRole().toString());
        
        return new LoginResponse(
                token,
                foundUser.getEmail(),
                foundUser.getName(),
                foundUser.getRole().toString(),
                foundUser.getId()
        );
    }
}
