// dto/RentDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RentDto {
    private Long id;
    private int month;
    private int year;
    private double baseRent;
    private double electricity;
    private double water;
    private double serviceCharge;
    private double totalAmount;
    private String status;
    private Long unitId;
}