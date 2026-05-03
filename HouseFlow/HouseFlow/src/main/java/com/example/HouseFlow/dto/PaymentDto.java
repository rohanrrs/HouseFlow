// dto/PaymentDto.java
package com.example.HouseFlow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private Long id;
    private double amount;
    private String month;
    private String status;
    private Long unitId;
    private Long tenantId;
}