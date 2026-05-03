package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.UserDto;
import java.util.List;

public interface UserService {
    UserDto createUser(UserDto dto);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto getUserByName(String name);
    void deleteUser(Long id);
}