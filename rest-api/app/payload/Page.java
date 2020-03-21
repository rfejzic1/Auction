package payload;

import common.OrderByOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Page {
    private OrderByOption orderByOption;
    private Integer pageNumber;
    private Integer pageSize;
}
