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

    public CompletionStage<Product> getProduct(UUID uuid) {
        return productRepository.get(uuid)
                .thenApplyAsync(product -> product.orElse(null), ec.current());
    }

    public CompletionStage<List<Product>> getProductsBySubcategory(String subcategory) {
        return productRepository.findBySubcategory(subcategory);
    }

    public CompletionStage<Product> sellProduct(ProductAuctionPayload payload, User user) {
        Product product = makeProduct(payload, user);

        return productRepository.create(product)
                .thenApplyAsync(newProduct -> newProduct, ec.current());
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
