package com.chaker.dojosandninjas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// The entry point of our Spring Boot application
@SpringBootApplication
public class DojosandninjasApplication {

    // main() starts the embedded Tomcat server and the whole app
    public static void main(String[] args) {
        SpringApplication.run(DojosandninjasApplication.class, args);
    }
}