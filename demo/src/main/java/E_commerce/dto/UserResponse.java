package E_commerce.dto;

import E_commerce.entity.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;

    public static UserResponse fromEntity(User u) {
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setName(u.getName());
        r.setEmail(u.getEmail());
        r.setRole(u.getRole() != null ? u.getRole().name() : null);
        return r;
    }
}
