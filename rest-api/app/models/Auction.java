package models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auctions")
public class Auction {
    @Id
    @NotNull
    private UUID id;

    @OneToOne
    @MapsId
    public Product product;

    @NotNull
    @Temporal(value = TemporalType.TIMESTAMP)
    public Date startDate;

    @NotNull
    @Temporal(value = TemporalType.TIMESTAMP)
    public Date endDate;

    @NotNull
    @PositiveOrZero
    public BigDecimal startPrice;

    @NotBlank
    @Size(max = 10)
    public String status;
}
