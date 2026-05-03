// dto/BuildingDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDto
{
    private Long id;
    private String name;
    private String address;
}