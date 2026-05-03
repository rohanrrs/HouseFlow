// dto/TenantDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantDto {
    private Long id;
    private String name;
    private String phone;
    private Long unitId;
}