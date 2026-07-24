package com.chaker.projectmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// The entry point of our Spring Boot application
@SpringBootApplication
public class ProjectmanagerApplication {

    // main() starts the embedded Tomcat server and the whole app
    public static void main(String[] args) {
        SpringApplication.run(ProjectmanagerApplication.class, args);
    }
}
