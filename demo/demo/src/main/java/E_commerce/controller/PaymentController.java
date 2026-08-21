package E_commerce.controller;

import com.razorpay.RazorpayException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import E_commerce.dto.CreateOrderRequest;
import E_commerce.dto.CreateOrderResponse;
import E_commerce.dto.VerifyPaymentRequest;
import E_commerce.dto.VerifyPaymentResponse;
import E_commerce.service.RazorpayService;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private final RazorpayService razorpayService;

    public PaymentController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    @GetMapping("/payment-config")
    public ResponseEntity<?> paymentConfig() {
        // The key id is intentionally public; never return the Razorpay key secret.
        return ResponseEntity.ok(java.util.Map.of("keyId", razorpayService.getKeyId()));
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        try {
            CreateOrderResponse response = razorpayService.createOrder(request);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.status(500).body("Failed to create order: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody VerifyPaymentRequest request) {
        VerifyPaymentResponse response = razorpayService.verifyPayment(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body(response);
        }
    }
}
