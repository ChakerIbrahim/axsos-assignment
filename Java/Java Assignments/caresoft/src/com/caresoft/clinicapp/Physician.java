package com.caresoft.clinicapp;

import java.util.ArrayList;
import java.util.Date;
import java.util.Date;

public class Physician extends User implements HIPAACompliantUser {
	private ArrayList<String> patientNotes;
	
	public Physician(Integer id) {
		this.id = id;
		this.patientNotes = new ArrayList<String>();
	}
	@Override
	public boolean assignPin(int pin) {
		if(pin >= 1000 && pin <=9999) {
			this.pin = pin;
			return true;
		}
		return false;
	}
	
	@Override
	public boolean accessAuthorized(Integer confirmedAuthID) {
		return this.id.equals(confirmedAuthID);
	}
	
	public void newPatientNotes(String notes, String patientName, Date date) {
        String report = String.format(
            "Datetime Submitted: %s \n", date);
        report += String.format("Reported By ID: %s\n", this.id);
        report += String.format("Patient Name: %s\n", patientName);
        report += String.format("Notes: %s \n", notes);
        this.patientNotes.add(report);
    }
	
    public ArrayList<String> getpatientNotes() {
    	return patientNotes;
    }
    public void setPatientNotes(ArrayList<String> patientNotes) {
    	this.patientNotes = patientNotes;
    }
    
}
