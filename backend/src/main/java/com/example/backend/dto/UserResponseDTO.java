package com.example.backend.dto;

import com.example.backend.constants.Roles;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private Roles role;

}
