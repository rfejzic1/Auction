package services;

import lombok.RequiredArgsConstructor;
import models.Product;
import models.Subcategory;
import play.libs.concurrent.HttpExecutionContext;
import repositories.ProductRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class ProductService {
    private final ProductRepository productRepository;
    private final HttpExecutionContext ec;

    public CompletionStage<List<Product>> getAll() {
        return productRepository.getAll()
                .thenApplyAsync(productStream -> productStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<Product> getProduct(UUID uuid) {
        return productRepository.get(uuid)
                .thenApplyAsync(product -> product.orElse(null), ec.current());
    }

    public CompletionStage<List<Product>> getProductsBySubcategory(String subcategory) {
        return productRepository.findBySubcategory(subcategory);
    }

}
