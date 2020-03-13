package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import models.utils.UUIDGenerator;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subcategories")
public class Subcategory {
    @Id
    @UUIDGenerator
    public UUID id;

    @NotBlank
    @Max(30)
    public String name;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    @JsonIgnore
    public Category category;
}
