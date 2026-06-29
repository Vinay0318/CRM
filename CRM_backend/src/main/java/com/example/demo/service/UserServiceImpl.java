package com.example.demo.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.User;
import com.example.demo.entity.enums.UserRole;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===============================
    // Convert Entity to DTO
    // ===============================

    private UserResponseDto convertToDto(User user) {

        if (user == null) {
            return null;
        }

        UserResponseDto dto = new UserResponseDto();

        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setLocation(user.getLocation());
        dto.setRole(user.getRole());
        dto.setAssignedCity(user.getAssignedCity());
        dto.setAssignedArea(user.getAssignedArea());
        dto.setAssignedManagerId(user.getAssignedManagerId());
        dto.setAssignedManagerName(user.getAssignedManagerName());

        return dto;
    }

    // ===============================
    // Add User
    // ===============================

    @Override
    public UserResponseDto addManager(User user) {

        if(userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email Already Exists");
        }

        if(userRepo.existsByMobile(user.getMobile())) {
            throw new RuntimeException("Mobile Already Exists");
        }

        user.setRole(UserRole.MANAGER);

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()));

        User saved =
                userRepo.save(user);

        return convertToDto(saved);
    }
    
    @Override
    public UserResponseDto addAgent(User user) {

        if(userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email Already Exists");
        }

        if(userRepo.existsByMobile(user.getMobile())) {
            throw new RuntimeException("Mobile Already Exists");
        }

        User manager =
                userRepo.findById(
                        user.getAssignedManagerId())
                        .orElseThrow(()->
                        new RuntimeException(
                                "Manager Not Found"));

        user.setRole(UserRole.AGENT);

        user.setAssignedManagerName(
                manager.getName());

        user.setAssignedCity(
                manager.getAssignedCity());

        user.setLocation(
                manager.getLocation());

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()));

        User saved =
                userRepo.save(user);

        return convertToDto(saved);
    }

    // ===============================
    // Update User
    // ===============================

    @Override
    public UserResponseDto updateUser(
            UUID id,
            User user) {

        User old =
                userRepo.findById(id)
                        .orElse(null);

        if (old == null) {
            return null;
        }

        old.setName(user.getName());

        old.setEmail(user.getEmail());

        old.setMobile(user.getMobile());

        old.setLocation(user.getLocation());

        old.setAssignedCity(
                user.getAssignedCity());

        old.setAssignedArea(
                user.getAssignedArea());

        if (user.getPassword() != null
                && !user.getPassword().isBlank()) {

            old.setPassword(
                    passwordEncoder.encode(
                            user.getPassword()));
        }

        old.setAssignedManagerId(
                user.getAssignedManagerId());

        if (user.getAssignedManagerId() != null) {

            User manager =
                    userRepo.findById(
                            user.getAssignedManagerId())
                            .orElse(null);

            if (manager != null) {

                old.setAssignedManagerName(
                        manager.getName());

                old.setAssignedCity(
                        manager.getAssignedCity());
            }
        }

        User updatedUser =
                userRepo.save(old);

        return convertToDto(updatedUser);
    }

    // ===============================
    // Delete User
    // ===============================

    @Override
    public String deleteUser(UUID id) {

        userRepo.deleteById(id);

        return "User Deleted Successfully";
    }

    // ===============================
    // Get User By Id
    // ===============================

    @Override
    public UserResponseDto getUserById(UUID id) {

        return convertToDto(
                userRepo.findById(id)
                        .orElse(null));
    }

    // ===============================
    // Get User By Name
    // ===============================

    @Override
    public UserResponseDto getUserByName(
            String name) {

        return convertToDto(
                userRepo.findByName(name));
    }

    // ===============================
    // Get All Users
    // ===============================

    @Override
    public List<UserResponseDto> getAllUsers() {

        return userRepo.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ===============================
    // Users By City
    // ===============================

    @Override
    public List<UserResponseDto> getByAssignedCity(
            String city) {

        return userRepo.findByAssignedCity(city)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ===============================
    // Users By Area
    // ===============================

    @Override
    public List<UserResponseDto> getByAssignedArea(
            String area) {

        return userRepo.findByAssignedArea(area)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ===============================
    // Agents By Manager
    // ===============================

    @Override
    public List<UserResponseDto> getAgentsByManager(
            UUID managerId) {

        return userRepo.findByAssignedManagerId(managerId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ===============================
    // All Managers
    // ===============================

    @Override
    public List<UserResponseDto> getAllManagers() {

        return userRepo.findByRole(UserRole.MANAGER)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ===============================
    // All Agents
    // ===============================

    @Override
    public List<UserResponseDto> getAllAgents() {

        return userRepo.findByRole(UserRole.AGENT)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

}