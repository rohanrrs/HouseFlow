// dto/UnitDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UnitDto {
    private Long id;
    private String unitNumber;
    private double rent;
    private Long floorId;
}