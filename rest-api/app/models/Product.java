package models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import models.utils.UUIDGenerator;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @NotNull
    @UUIDGenerator
    @GeneratedValue(generator = "UUID")
    public UUID uuid;

    @NotBlank
    @Max(60)
    public String name;

    @NotBlank
    @Max(700)
    public String description;

    @NotBlank
    @Max(10)
    public String color;

    @NotBlank
    @Max(10)
    public String size;

    @ManyToOne
    @JoinColumn(name="subcategory_id", nullable=false)
    public Subcategory subcategory;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    public User owner;

    @OneToOne(mappedBy = "product")
    public Auction auction;
}
