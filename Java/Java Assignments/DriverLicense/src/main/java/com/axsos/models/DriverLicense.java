package com.axsos.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name="drivers")
public class DriverLicense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(min = 2 , max = 50)
	private String vehicleType;

	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date expirationDate;

	@NotNull
	@Size(max = 5)
	private String bloodType;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
