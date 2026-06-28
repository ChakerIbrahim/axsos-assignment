package com.caresoft.clinicapp;

import java.util.ArrayList;
import java.util.Date;

public class AdminUser extends User implements HIPAACompliantUser, HIPAACompliantAdmin {
	private Integer employeeID;
    private String role;
    private ArrayList<String> securityIncidents;
    
    public AdminUser(Integer id, String role) {
    	this.id = id;
    	this.role = role;
    	this.securityIncidents = new ArrayList<String>();
    }
    @Override
    public boolean assignPin(int pin) {
    	String pinStr = String.valueOf(pin);
    	if(pinStr.length() >= 6) {
    		this.pin = pin;
    		return true;
    	}
    	return false;
    }
    
    @Override
    public boolean accessAuthorized(Integer confirmedAuthID) {
    		if(!this.id.equals(confirmedAuthID)) {
    			authIncident();
    		}
    		return true;
    }
    @Override
    public ArrayList<String> reportSecurityIncidents() {
    	return this.securityIncidents;
    }
    
    
    public void newIncident(String notes) {
        String report = String.format(
            "Datetime Submitted: %s \n,  Reported By ID: %s\n Notes: %s \n", 
            new Date(), this.id, notes
        );
        securityIncidents.add(report);
    }
    public void authIncident() {
        String report = String.format(
            "Datetime Submitted: %s \n,  ID: %s\n Notes: %s \n", 
            new Date(), this.id, "AUTHORIZATION ATTEMPT FAILED FOR THIS USER"
        );
        securityIncidents.add(report);
    }
    
    public Integer getEmployeeID() {
    	return employeeID;
    }
    public void setEmployeeID(Integer emplyeeID) {
    	this.employeeID = employeeID;
    }
    public String getRole() {
    	return role;
    }
    public void setRole(String role) {
    	this.role = role;
    }
    
}
