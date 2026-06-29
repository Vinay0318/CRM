package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService us;

    // ==========================
    // Add User (Admin/Manager/Agent)
    // ==========================

    @PostMapping("/add-manager")
    public UserResponseDto addManager(
            @RequestBody User user){

        return us.addManager(user);
    }

    @PostMapping("/add-agent")
    public UserResponseDto addAgent(
            @RequestBody User user){

        return us.addAgent(user);
    }
    // ==========================
    // Get All Users
    // ==========================

    @GetMapping("/displayAll")
    public List<UserResponseDto> getAllUsers() {

        return us.getAllUsers();
    }

    // ==========================
    // Get User By Id
    // ==========================

    @GetMapping("/{id}")
    public UserResponseDto getUserById(
            @PathVariable UUID id) {

        return us.getUserById(id);
    }

    // ==========================
    // Get User By Name
    // ==========================

    @GetMapping("/name/{name}")
    public UserResponseDto getUserByName(
            @PathVariable String name) {

        return us.getUserByName(name);
    }

    // ==========================
    // Users By City
    // ==========================

    @GetMapping("/city/{city}")
    public List<UserResponseDto> getByCity(
            @PathVariable String city) {

        return us.getByAssignedCity(city);
    }

    // ==========================
    // Users By Area
    // ==========================

    @GetMapping("/area/{area}")
    public List<UserResponseDto> getByArea(
            @PathVariable String area) {

        return us.getByAssignedArea(area);
    }

    // ==========================
    // Agents By Manager
    // ==========================

    @GetMapping("/manager/{managerId}")
    public List<UserResponseDto> getAgentsByManager(
            @PathVariable UUID managerId) {

        return us.getAgentsByManager(managerId);
    }

    // ==========================
    // Update User
    // ==========================

    @PutMapping("/update/{id}")
    public UserResponseDto updateUser(
            @PathVariable UUID id,
            @RequestBody User user) {

        return us.updateUser(id, user);
    }

    // ==========================
    // Delete User
    // ==========================

    @DeleteMapping("/delete/{id}")
    public String deleteUser(
            @PathVariable UUID id) {

        return us.deleteUser(id);
    }

    // ==========================
    // Get All Managers
    // ==========================

    @GetMapping("/managers")
    public List<UserResponseDto> getAllManagers() {

        return us.getAllManagers();
    }

    // ==========================
    // Get All Agents
    // ==========================

    @GetMapping("/agents")
    public List<UserResponseDto> getAllAgents() {

        return us.getAllAgents();
    }

}