package E_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private String totalRevenue;
    private String revenueChange;
    private String activeOrders;
    private String ordersChange;
    private String customers;
    private String customersChange;
    private String conversion;
    private String conversionChange;
}
