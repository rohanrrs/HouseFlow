package com.example.HouseFlow.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String unitNumber;
    private double rent;

    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;
}