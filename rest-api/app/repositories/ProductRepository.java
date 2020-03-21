package repositories;

import models.Product;
import payload.Page;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface ProductRepository extends Repository<Product, UUID> {
    CompletionStage<List<Product>> getProducts(Page page);
    CompletionStage<List<Product>> findByCategory(String category, Page page);
    CompletionStage<List<Product>> findBySubcategory(String category, String subcategory, Page page);
}
