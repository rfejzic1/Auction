package payload;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BidPayload {
    public String productID;
    public BigDecimal value;
}
