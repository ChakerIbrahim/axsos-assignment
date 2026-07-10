package com.chaker.authentication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// The entry point of our Spring Boot application
@SpringBootApplication
public class AuthenticationApplication {

    // main() starts the embedded Tomcat server and the whole app
    public static void main(String[] args) {
        SpringApplication.run(AuthenticationApplication.class, args);
    }
}