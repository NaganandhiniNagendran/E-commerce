package E_commerce.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import E_commerce.dto.CreateOrderRequest;
import E_commerce.dto.CreateOrderResponse;
import E_commerce.dto.VerifyPaymentRequest;
import E_commerce.dto.VerifyPaymentResponse;

@Service
public class RazorpayService {

    private final RazorpayClient razorpayClient;
    private final String keyId;
    private final String keySecret;

    public RazorpayService(@Value("${razorpay.key.id}") String keyId, 
                          @Value("${razorpay.key.secret}") String keySecret) throws RazorpayException {
        this.razorpayClient = new RazorpayClient(keyId, keySecret);
        this.keyId = keyId;
        this.keySecret = keySecret;
    }

    public String getKeyId() {
        return keyId;
    }

    public CreateOrderResponse createOrder(CreateOrderRequest request) throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", request.getAmount());
        orderRequest.put("currency", request.getCurrency());
        orderRequest.put("receipt", request.getReceipt());

        Order order = razorpayClient.orders.create(orderRequest);

        return new CreateOrderResponse(
            order.get("id"),
            order.get("amount"),
            order.get("currency")
        );
    }

    public VerifyPaymentResponse verifyPayment(VerifyPaymentRequest request) {
        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());

        try {
            // Razorpay signs order_id|payment_id with HMAC-SHA256 and the key secret.
            // Using their SDK helper prevents accepting an invalid signature.
            boolean isValid = Utils.verifyPaymentSignature(attributes, keySecret);
            if (isValid) {
                return new VerifyPaymentResponse(true, "Payment verified successfully");
            }
            return new VerifyPaymentResponse(false, "Invalid signature");
        } catch (RazorpayException e) {
            return new VerifyPaymentResponse(false, "Unable to verify payment signature");
        }
    }
}
