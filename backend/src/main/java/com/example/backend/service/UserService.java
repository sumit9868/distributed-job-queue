package com.example.backend.service;

import com.example.backend.dto.UserRequestDTO;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.exceptions.UserRegistrationException;
import com.example.backend.exceptions.UsernameAlreadyExistsException;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) {
        if(Objects.nonNull(getUserByUsername(userRequestDTO.getUsername()))){
            throw new UsernameAlreadyExistsException(userRequestDTO.getUsername());
        }
        log.info("Registering new user: {} with role :{}", userRequestDTO.getUsername(), userRequestDTO.getRole());

        try{
            User user = new User();
            user.setUsername(userRequestDTO.getUsername());
            user.setEmail(userRequestDTO.getEmail());
            user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
            user.setRole(userRequestDTO.getRole());
            UserResponseDTO responseDTO = buildResponse(userRepository.save(user));
            log.info("User registered successfully: {}", userRequestDTO.getUsername());
            return responseDTO;
        }catch (Exception e){
            throw new UserRegistrationException("Failed to register user:"+e.getMessage());
        }
    }

    public UserResponseDTO findUser(UserRequestDTO userRequestDTO) {
        User existingUser = getUserByUsername(userRequestDTO.getUsername());
        if (existingUser == null) {
            log.warn("User not found: {}", userRequestDTO.getUsername());
            throw new UserNotFoundException(userRequestDTO.getUsername());
        }
        boolean passwordMatches = passwordEncoder.matches(userRequestDTO.getPassword(), existingUser.getPassword());
        if (!passwordMatches) {
            log.warn("Invalid password for user: {}", userRequestDTO.getUsername());
        } else {
            log.info("User authenticated successfully: {}", userRequestDTO.getUsername());
        }
        return buildResponse(existingUser);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public UserResponseDTO buildResponse(User user){
        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
