package repositories;

import models.Product;

import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public interface ProductRepository extends Repository<Product, UUID> {
    CompletionStage<Stream<Product>> findByCategory(String category);
    CompletionStage<Stream<Product>> findBySubcategory(String category, String subcategory);
}
