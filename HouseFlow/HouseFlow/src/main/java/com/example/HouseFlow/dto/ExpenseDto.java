// dto/ExpenseDto.java
package com.example.HouseFlow.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
    private Long id;
    private String type;
    private double amount;
    private LocalDate date;
    private Long buildingId;
}