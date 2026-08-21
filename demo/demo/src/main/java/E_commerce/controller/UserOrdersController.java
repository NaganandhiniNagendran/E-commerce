package E_commerce.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/orders")
public class UserOrdersController {

    // simple in-memory store: username -> orders
    private static final Map<String, List<OrderDto>> STORE = new ConcurrentHashMap<>();

    @GetMapping
    public List<OrderDto> list(Principal principal) {
        if (principal == null) return Collections.emptyList();
        return STORE.getOrDefault(principal.getName(), new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<OrderDto> create(Principal principal, @RequestBody OrderDto req) {
        if (principal == null) return ResponseEntity.status(401).build();
        List<OrderDto> list = STORE.computeIfAbsent(principal.getName(), k -> new ArrayList<>());
        req.setId("ORD" + (1000 + list.size() + 1));
        list.add(req);
        return ResponseEntity.ok(req);
    }

    public static class OrderDto {
        private String id;
        private List<String> items = new ArrayList<>();
        private String total;
        private String status;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public List<String> getItems() { return items; }
        public void setItems(List<String> items) { this.items = items; }
        public String getTotal() { return total; }
        public void setTotal(String total) { this.total = total; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
