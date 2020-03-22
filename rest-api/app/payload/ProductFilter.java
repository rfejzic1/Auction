package payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilter {
    private String category;
    private String subcategory;
    private Integer minPrice;
    private Integer maxPrice;
}
