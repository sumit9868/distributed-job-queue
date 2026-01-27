package com.example.backend.dto;

import com.example.backend.constants.Roles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    private String username;
    private String email;
    private String password;
    private Roles role;
}
