package repositories;

import models.Product;
import models.Subcategory;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface ProductRepository extends Repository<Product, UUID> {
    CompletionStage<List<Product>> findBySubcategory(Subcategory subcategory);
}
