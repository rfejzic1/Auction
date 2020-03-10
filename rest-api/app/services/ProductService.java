package services;

import lombok.RequiredArgsConstructor;
import models.*;
import payload.ProductAuctionPayload;
import play.libs.concurrent.HttpExecutionContext;
import repositories.ProductRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Collectors;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class ProductService {
    private final ProductRepository productRepository;
    private final HttpExecutionContext ec;
    private final CategorizationService categorizationService;

    public CompletionStage<List<Product>> getAll() {
        return productRepository.getAll()
                .thenApplyAsync(productStream -> productStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<Product> getProduct(String id) {
        UUID uuid = UUID.fromString(id);

        return productRepository.get(uuid)
                .thenApplyAsync(product -> product.orElse(null), ec.current());
    }

    public CompletionStage<List<Product>> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<List<Product>> getProductsBySubcategory(String category, String subcategory) {
        return productRepository.findBySubcategory(category, subcategory)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<Product> sellProduct(ProductAuctionPayload payload, User user) {
        Product product = makeProduct(payload, user);

        return productRepository.create(product)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    private Product makeProduct(ProductAuctionPayload payload, User user) {
        Product product = new Product();

        product.name = payload.name;
        product.description = payload.description;
        product.color = payload.color;
        product.size = payload.size;

        product.subcategory = categorizationService.findOrCreateSubcategoryWithCategoryByName(payload.subcategory, payload.category).toCompletableFuture().join();
        product.owner = user;
        product.auction = makeAuction(payload, product);

        product.images = payload.images.stream()
                .map(imageURI -> new Image(null, imageURI, product))
                .collect(Collectors.toList());

        return product;
    }

    private Auction makeAuction(ProductAuctionPayload payload, Product product) {
        Auction auction = new Auction();

        auction.startPrice = payload.startPrice;
        auction.startDate = payload.startDate;
        auction.endDate = payload.endDate;
        auction.status = AuctionStatusEnum.OPEN;
        auction.product = product;

        return auction;
    }
}
