// dto/FloorDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FloorDto {
    private Long id;
    private int floorNumber;
    private Long buildingId;
}