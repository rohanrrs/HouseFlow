// exception/ResourceNotFoundException.java
package com.example.HouseFlow.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}