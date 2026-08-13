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
@RequestMapping("/api/user/addresses")
public class UserAddressesController {

    private static final Map<String, List<AddressDto>> STORE = new ConcurrentHashMap<>();

    @GetMapping
    public List<AddressDto> list(Principal principal) {
        if (principal == null) return Collections.emptyList();
        return STORE.getOrDefault(principal.getName(), new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<AddressDto> create(Principal principal, @RequestBody AddressDto req) {
        if (principal == null) return ResponseEntity.status(401).build();
        List<AddressDto> list = STORE.computeIfAbsent(principal.getName(), k -> new ArrayList<>());
        req.setId(System.currentTimeMillis());
        list.add(req);
        return ResponseEntity.ok(req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(Principal principal, @PathVariable long id) {
        if (principal == null) return ResponseEntity.status(401).build();
        List<AddressDto> list = STORE.getOrDefault(principal.getName(), new ArrayList<>());
        list.removeIf(a -> a.getId() == id);
        return ResponseEntity.ok("deleted");
    }

    public static class AddressDto {
        private long id;
        private String label;
        private String line1;
        private String city;
        private String postal;

        public long getId() { return id; }
        public void setId(long id) { this.id = id; }
        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public String getLine1() { return line1; }
        public void setLine1(String line1) { this.line1 = line1; }
        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
        public String getPostal() { return postal; }
        public void setPostal(String postal) { this.postal = postal; }
    }
}
