package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.User;
import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    void deleteUser(Long id);
}