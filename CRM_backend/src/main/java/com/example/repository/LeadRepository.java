package com.example.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Lead;

public interface LeadRepository extends JpaRepository<Lead, UUID> {

	
}
