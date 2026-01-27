package com.example.backend.contorller;

import com.example.backend.constants.Roles;
import com.example.backend.dto.UserRequestDTO;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    //login
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO user) {
        //TODO: create separate flow to make admin
        user.setRole(Roles.USER);
        return ResponseEntity.ok(userService.registerUser(user));
    }
    //register
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestDTO user) {
        UserResponseDTO responseDTO = userService.findUser(user);
        if(Objects.isNull(responseDTO)){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifySession(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }
}
