package models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "bids")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "user_id");
    public User user;

    @ManyToOne
    @JoinColumn(name = "product_id");
    public Product product;

    @PositiveOrZero
    public BigDecimal value;
}
