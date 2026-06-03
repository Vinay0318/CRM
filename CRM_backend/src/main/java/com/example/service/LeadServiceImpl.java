package com.example.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Lead;
import com.example.repository.LeadRepository;

@Service
public class LeadServiceImpl implements LeadService {

	@Autowired
	LeadRepository lr;
	
	@Override
	public Lead addlead(Lead l) {
		
		return lr.save(l);
	}

	@Override
	public List<Lead> getAllLeads() {
	
		return lr.findAll();
	}

	@Override
	public Lead updateLead(UUID id, Lead l) {
		Lead old = lr.findById(id).orElse(null);
		if(old != null)
		{
			
		old.setEmail(l.getEmail());
		old.setMobile_no(l.getMobile_no());
		old.setLocation(l.getLocation());
		old.setProperty_type(l.getProperty_type());
		}
		return null;
	
	}

	@Override
	public String deleteLead(UUID id) {
		lr.deleteById(id);
		return "Lead Deleted";
	}

	@Override
	public Lead getLeadById(UUID id) {
		
		return lr.findById(id).orElse(null);
	}

}
