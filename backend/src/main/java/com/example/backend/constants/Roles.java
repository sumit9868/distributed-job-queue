package com.example.backend.constants;

public enum Roles {
    USER("USER"), ADMIN("ADMIN");
    private final String role;
    Roles(String role) {
        this.role = role;
    }
    public String getName() {
        return role;
    }
}
