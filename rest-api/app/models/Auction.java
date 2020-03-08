package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auctions")
public class Auction {
    @JsonIgnore
    @Id
    private UUID uuid;

    @OneToOne
    @MapsId
    @JsonIgnore
    public Product product;

    @NotNull
    public Date startDate;

    @NotNull
    public Date endDate;

    @NotNull
    @PositiveOrZero
    public BigDecimal startPrice;

    @NotBlank
    @Enumerated(EnumType.STRING)
    public AuctionStatusEnum status;
}
