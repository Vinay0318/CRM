package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.User;

public interface UserService {

    UserResponseDto addManager(User user);

    UserResponseDto addAgent(User user);

    UserResponseDto updateUser(UUID id, User user);

    String deleteUser(UUID id);

    UserResponseDto getUserById(UUID id);

    UserResponseDto getUserByName(String name);

    List<UserResponseDto> getAllUsers();

    List<UserResponseDto> getByAssignedCity(String city);

    List<UserResponseDto> getByAssignedArea(String area);

    List<UserResponseDto> getAgentsByManager(UUID managerId);

    List<UserResponseDto> getAllManagers();

    List<UserResponseDto> getAllAgents();
}