package payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import models.AuctionStatusEnum;
import models.Image;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    public UUID uuid;
    public UUID owner;

    public String name;
    public String description;
    public List<Image> images;

    public Long startDate;
    public Long endDate;
    public BigDecimal startPrice;
    public AuctionStatusEnum status;
}
