package com.school.config;

import com.school.entity.*;
import com.school.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final StudentRepository studentRepository;
    private final FeeStructureRepository feeStructureRepository;
    private final FeeRecordRepository feeRecordRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
            ClassRepository classRepository,
            StudentRepository studentRepository,
            FeeStructureRepository feeStructureRepository,
            FeeRecordRepository feeRecordRepository,
            BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
        this.studentRepository = studentRepository;
        this.feeStructureRepository = feeStructureRepository;
        this.feeRecordRepository = feeRecordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Admin User
        User admin = new User();
        admin.setEmail("admin@school.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("Admin User");
        admin.setPhone("9876543210");
        admin.setRole(UserRole.ADMIN);
        admin.setActive(true);
        userRepository.save(admin);

        // Create Finance User
        User finance = new User();
        finance.setEmail("finance@school.com");
        finance.setPassword(passwordEncoder.encode("finance123"));
        finance.setName("Finance User");
        finance.setPhone("9876543211");
        finance.setRole(UserRole.FINANCE);
        finance.setActive(true);
        userRepository.save(finance);

        // Create Classes (1-10)
        List<com.school.entity.Class> classes = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            com.school.entity.Class classEntity = new com.school.entity.Class();
            classEntity.setClassNumber(i);
            classEntity.setClassName("Class " + i);
            classes.add(classRepository.save(classEntity));
        }

        // Create Fee Structures for each class
        for (com.school.entity.Class classEntity : classes) {
            // Day Scholar
            FeeStructure dayScholar = new FeeStructure();
            dayScholar.setClassEntity(classEntity);
            dayScholar.setStudentType(StudentType.DAY_SCHOLAR);
            dayScholar.setMonthlyFee(new BigDecimal("500"));
            feeStructureRepository.save(dayScholar);

            // Hostler
            FeeStructure hostler = new FeeStructure();
            hostler.setClassEntity(classEntity);
            hostler.setStudentType(StudentType.HOSTLER);
            hostler.setMonthlyFee(new BigDecimal("300"));
            feeStructureRepository.save(hostler);
        }

        // Create Students
        String[] names = { "Aditya", "Bhavna", "Chirag", "Deepak", "Esha", "Farhan", "Gauri",
                "Harsh", "Isha", "Jatin", "Kavya", "Laxmi", "Mohan", "Neha", "Omkar",
                "Priya", "Quicksilver", "Rohan", "Sonam", "Tanvi", "Uday", "Vanya",
                "Waqar", "Xander", "Yash", "Zara", "Ashok", "Bhumi", "Chitra", "Dhruv",
                "Esha", "Farah", "Geet", "Hima", "Isha", "Jaya", "Karan", "Laksh",
                "Mridula", "Nitin", "Ojas", "Pooja", "Quincy", "Ravi", "Sneha", "Tara",
                "Uma", "Vedant", "Wanda", "Xavier", "Yuki", "Zoe" };

        int studentCount = 0;
        for (int i = 1; i <= 10 && studentCount < 50; i++) {
            com.school.entity.Class classEntity = classes.get(i - 1);
            for (int j = 0; j < 5 && studentCount < 50; j++) {
                Student student = new Student();
                student.setName(names[studentCount % names.length]);
                student.setStudentId("STU" + String.format("%04d", studentCount + 1));
                student.setParentName("Parent of " + names[studentCount % names.length]);
                student.setContactNumber("98765" + String.format("%05d", studentCount + 1));
                student.setClassEntity(classEntity);
                student.setStudentType(studentCount % 2 == 0 ? StudentType.DAY_SCHOLAR : StudentType.HOSTLER);

                Student savedStudent = studentRepository.save(student);

                // Create fee records for multiple months
                String[] months = { "2024-09", "2024-10", "2024-11", "2024-12", "2025-01" };
                for (String month : months) {
                    FeeRecord feeRecord = new FeeRecord();
                    feeRecord.setStudent(savedStudent);
                    feeRecord.setFeeMonth(month);

                    // Get fee structure
                    FeeStructure feeStructure = feeStructureRepository
                            .findByClassIdAndStudentType(classEntity.getId(), savedStudent.getStudentType())
                            .orElseThrow();
                    feeRecord.setFeeAmount(feeStructure.getMonthlyFee());
                    feeRecord.setPaymentStatus(studentCount % 3 == 0 ? PaymentStatus.PAID : PaymentStatus.UNPAID);
                    feeRecord.setRecordedBy(finance);

                    if (feeRecord.getPaymentStatus() == PaymentStatus.PAID) {
                        feeRecord.setPaymentDate(java.time.LocalDate.now());
                    }

                    feeRecordRepository.save(feeRecord);
                }

                studentCount++;
            }
        }
    }
}
