// repository/PaymentRepository.java
package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}