

package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.entity.enums.UserRole;
import com.example.demo.entity.enums.UserStatus;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService us;
    
    @Autowired
    UserRepository userRepo;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return us.addUser(user);
    }

    @GetMapping("/displayAll")
    public List<User> getAllUsers() {
        return us.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return us.getUserById(id);
    }

    @GetMapping("/name/{name}")
    public User getUserByName(@PathVariable String name) {
        return us.getUserByName(name);
    }

    @GetMapping("/city/{city}")
    public List<User> getByCity(@PathVariable String city) {
        return us.getByAssignedCity(city);
    }

    @GetMapping("/area/{area}")
    public List<User> getByArea(@PathVariable String area) {
        return us.getByAssignedArea(area);
    }

    @GetMapping("/manager/{managerId}")
    public List<User> getAgentsByManager(
            @PathVariable UUID managerId) {

        return us.getAgentsByManager(managerId);
    }

    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable UUID id,
            @RequestBody User user) {

        return us.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(
            @PathVariable UUID id) {

        return us.deleteUser(id);
    }
    @GetMapping("/managers")
    public List<User> getAllManagers() {

        return us.getAllManagers();
    }

    @GetMapping("/agents")
    public List<User> getAllAgents() {

        return us.getAllAgents();
    }
    @PutMapping("/approve/{agentId}/{managerId}")
    public User approveAgent(
            @PathVariable UUID agentId,
            @PathVariable UUID managerId) {

        User agent =
                us.getUserById(agentId);

        User manager =
                us.getUserById(managerId);

        agent.setStatus(UserStatus.APPROVED);

        agent.setAssignedManagerId(
                manager.getUserId());

        agent.setAssignedManagerName(
                manager.getName());

        return us.updateUser(agentId, agent);
    }
    
    @PutMapping("/reject/{id}")
    public User rejectAgent(
            @PathVariable UUID id) {

        User user =
                us.getUserById(id);

        user.setStatus(
                UserStatus.REJECTED);

        return us.updateUser(id, user);
    }
    
    @GetMapping("/pending-agents")
    public List<User> pendingAgents() {

        return userRepo.findByRoleAndStatus(
                UserRole.AGENT,
                UserStatus.PENDING);
    }
}

