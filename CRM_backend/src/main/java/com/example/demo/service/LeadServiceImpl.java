package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Lead;
import com.example.demo.repository.LeadRepository;

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

        Lead oldLead =
                lr.findById(id)
                  .orElse(null);

        if (oldLead != null) {

            oldLead.setStatus(
                    l.getStatus()
            );

            return lr.save(oldLead);
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
