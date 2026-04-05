package com.example.JobPortalSystem;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;
import com.example.JobPortalSystem.enums.Role;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class JobPortalSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalSystemApplication.class, args);
    }

    // ✅ OUTSIDE main method
    @Bean
    CommandLineRunner init(AuthUserRepository repo, PasswordEncoder encoder) {
        return args -> {

            if (repo.findByEmail("admin@gmail.com").isEmpty()) {

                AuthUserEntity admin = new AuthUserEntity();
                admin.setUsername("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                repo.save(admin);

                System.out.println("✅ Admin created");
            }
        };
    }
}