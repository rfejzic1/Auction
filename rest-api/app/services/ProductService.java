package services;

import common.Constants;
import common.OrderByOption;
import lombok.RequiredArgsConstructor;
import models.*;
import payload.Page;
import payload.ProductAuctionPayload;
import payload.ProductResponse;
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


    public CompletionStage<Product> getProduct(String id) {
        UUID uuid = UUID.fromString(id);

        return productRepository.get(uuid)
                .thenApplyAsync(product -> product.orElse(null), ec.current());
    }

    public CompletionStage<List<Product>> getProducts(Page page) {
        return productRepository.getProducts(page)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<List<Product>> getProductsByCategory(String category, Page page) {
        return productRepository.findByCategory(category, page)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<List<Product>> getProductsBySubcategory(String category, String subcategory, Page page) {
        return productRepository.findBySubcategory(category, subcategory, page)
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

    public List<ProductResponse> makeProductResponses(List<Product> products) {
        return products.stream()
                .map(this::makeProductResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse makeProductResponse(Product product) {
        ProductResponse response = new ProductResponse();

        response.uuid = product.uuid;
        response.owner = product.owner.uuid;

        response.name = product.name;
        response.description = product.description;
        response.images = product.images;

        response.startDate = product.auction.startDate.getTime();
        response.endDate = product.auction.endDate.getTime();
        response.startPrice = product.auction.startPrice;
        response.status = product.auction.status;

        return response;
    }

    public Page makePage(String orderBy, Integer pageNumber, Integer pageSize) {
        OrderByOption orderByOption;

        try {
            orderByOption = Enum.valueOf(OrderByOption.class, orderBy);
        } catch (IllegalArgumentException | NullPointerException err) {
            orderByOption = OrderByOption.NAME;
        }

        if (pageNumber < 0) {
            pageNumber = 0;
        }

        if(pageSize < Constants.MIN_PAGE_SIZE || pageSize > Constants.MAX_PAGE_SIZE) {
            pageSize = Constants.DEFAULT_PAGE_SIZE;
        }

        return new Page(orderByOption, pageNumber, pageSize);
    }
}
