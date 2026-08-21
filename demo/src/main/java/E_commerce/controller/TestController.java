package E_commerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("public: ok");
    }

    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint(@AuthenticationPrincipal UserDetails user) {
        String name = user != null ? user.getUsername() : "anonymous";
        return ResponseEntity.ok("protected: " + name);
    }
}
