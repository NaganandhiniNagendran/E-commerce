package E_commerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {
    
    @Min(value = 100, message = "Amount must be at least 100 paise")
    private int amount;
    
    @NotBlank(message = "Currency is required")
    private String currency = "INR";
    
    @NotBlank(message = "Receipt is required")
    private String receipt;
}
