package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Rent;
import java.util.List;

public interface RentService {

    Rent createRent(Rent rent);

    List<Rent> getAllRents();

    Rent getRentById(Long id);

    void deleteRent(Long id);
}