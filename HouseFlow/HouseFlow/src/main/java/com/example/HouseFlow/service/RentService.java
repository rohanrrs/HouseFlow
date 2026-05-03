package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.RentDto;
import java.util.List;

public interface RentService {
    RentDto createRent(RentDto dto);
    List<RentDto> getAllRents();
    RentDto getRentById(Long id);
    void deleteRent(Long id);
}