package repositories;

import models.Product;
import payload.Page;
import payload.ProductFilter;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface ProductRepository extends Repository<Product, UUID> {
    CompletionStage<List<Product>> getProducts(ProductFilter filter, Page page);
}
