package com.example.demo.dto;

import java.util.UUID;

import com.example.demo.entity.enums.UserRole;

import lombok.Data;

@Data
public class UserResponseDto {

    private UUID userId;

    private String name;

    private String email;

    private String mobile;

    private String location;

    private UserRole role;

    private String assignedCity;

    private String assignedArea;

    private UUID assignedManagerId;

    private String assignedManagerName;
}