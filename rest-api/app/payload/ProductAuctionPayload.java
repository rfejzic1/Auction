package payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAuctionPayload {
    public String name;
    public String description;
    public String color;
    public String size;
    public String category;
    public String subcategory;
    public BigDecimal startPrice;
    public Date startDate;
    public Date endDate;
}
