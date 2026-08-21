package E_commerce.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import E_commerce.dto.AuthResponse;
import E_commerce.dto.LoginRequest;
import E_commerce.dto.RegisterRequest;
import E_commerce.dto.UserResponse;
import E_commerce.entity.User;
import E_commerce.repository.UserRepository;
import E_commerce.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${admin.email:admin@shopease.com}")
    private String adminEmail;

    @Value("${admin.password:Admin@123}")
    private String adminPassword;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        if (req.getEmail() != null && req.getEmail().equalsIgnoreCase(adminEmail)) {
            throw new RuntimeException("This email is reserved and cannot be used to register");
        }

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(User.Role.CUSTOMER);

        User saved = userRepository.save(user);

        UserResponse ur = UserResponse.fromEntity(saved);
        String token = jwtService.generateToken(org.springframework.security.core.userdetails.User
                .withUsername(saved.getEmail()).password(saved.getPassword()).roles(saved.getRole().name()).build());

        return new AuthResponse(token, ur);
    }

    public AuthResponse login(LoginRequest req) {
        // Hard-coded admin login using properties
        if (req.getEmail() != null && req.getEmail().equalsIgnoreCase(adminEmail)
                && req.getPassword() != null && req.getPassword().equals(adminPassword)) {
            UserResponse ur = new UserResponse();
            ur.setId(0L);
            ur.setName("Administrator");
            ur.setEmail(adminEmail);
            ur.setRole(User.Role.ADMIN.name());

            String token = jwtService.generateToken(org.springframework.security.core.userdetails.User
                    .withUsername(adminEmail).password(adminPassword).roles(User.Role.ADMIN.name()).build());

            return new AuthResponse(token, ur);
        }

        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail()).password(user.getPassword()).roles(user.getRole() != null ? user.getRole().name() : "CUSTOMER").build());

        return new AuthResponse(token, UserResponse.fromEntity(user));
    }
}
