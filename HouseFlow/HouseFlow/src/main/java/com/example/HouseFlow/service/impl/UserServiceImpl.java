package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.UserDto;
import com.example.HouseFlow.entity.Role;
import com.example.HouseFlow.entity.User;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.UserRepository;
import com.example.HouseFlow.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDto createUser(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setRole(Role.valueOf(dto.getRole()));
        return toDto(userRepo.save(user));
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        return toDto(user);
    }

    @Override
    public UserDto getUserByName(String name) {
        User user = userRepo.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + name));
        return toDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new ResourceNotFoundException("User not found: " + id);
        }
        userRepo.deleteById(id);
    }

    private UserDto toDto(User u) {
        return new UserDto(u.getId(), u.getName(), u.getEmail(), u.getPhone(), u.getRole().name());
    }
}