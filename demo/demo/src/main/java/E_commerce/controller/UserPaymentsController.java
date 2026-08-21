package E_commerce.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/payments")
public class UserPaymentsController {

    private static final Map<String, List<CardDto>> STORE = new ConcurrentHashMap<>();

    @GetMapping
    public List<CardDto> list(Principal principal) {
        if (principal == null) return Collections.emptyList();
        return STORE.getOrDefault(principal.getName(), new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<CardDto> create(Principal principal, @RequestBody CardDto req) {
        if (principal == null) return ResponseEntity.status(401).build();
        List<CardDto> list = STORE.computeIfAbsent(principal.getName(), k -> new ArrayList<>());
        req.setId(System.currentTimeMillis());
        list.add(req);
        return ResponseEntity.ok(req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(Principal principal, @PathVariable long id) {
        if (principal == null) return ResponseEntity.status(401).build();
        List<CardDto> list = STORE.getOrDefault(principal.getName(), new ArrayList<>());
        list.removeIf(a -> a.getId() == id);
        return ResponseEntity.ok("deleted");
    }

    public static class CardDto {
        private long id;
        private String name;
        private String number;

        public long getId() { return id; }
        public void setId(long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getNumber() { return number; }
        public void setNumber(String number) { this.number = number; }
    }
}
