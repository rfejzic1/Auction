package controllers;

import actions.JWTAuthenticated;
import common.Constants;
import common.JsonResponseObjects;
import models.Product;
import models.User;
import payload.ProductAuctionPayload;
import payload.ProductResponse;
import services.CategorizationService;
import services.ProductService;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class ProductController extends Controller {
    private final ProductService productService;
    private final CategorizationService categorizationService;

    public CompletionStage<Result> getProducts(String category, String subcategory) {
        if (category != null) {
            if (subcategory != null) {
                return productService.getProductsBySubcategory(category, subcategory)
                        .thenApply(products -> ok(Json.toJson(makeProductResponses(products))));
            }

            return productService.getProductsByCategory(category)
                    .thenApply(products -> ok(Json.toJson(makeProductResponses(products))));
        }

        return productService.getAll()
                .thenApply(products -> ok(Json.toJson(makeProductResponses(products))));
    }

    public CompletionStage<Result> get(String id) {
        return productService.getProduct(id)
                .thenApply(product -> {
                    if (product != null) {
                        return ok(Json.toJson(makeProductResponse(product)));
                    }
                    return notFound(JsonResponseObjects.json404(Constants.Messages.USER_NOT_FOUND));
                })
                .exceptionally(t -> status(UNPROCESSABLE_ENTITY, JsonResponseObjects.json422(Constants.Messages.BAD_UUID)));
    }

    public CompletionStage<Result> getCategories() {
        return categorizationService.getCategories()
                .thenApply(categories -> ok(Json.toJson(categories)));
    }

    @JWTAuthenticated
    public CompletionStage<Result> sell(Http.Request request) {
        JsonNode json = request.body().asJson();
        ProductAuctionPayload payload = Json.fromJson(json, ProductAuctionPayload.class);

        User user = request.attrs().get(Constants.TypedKeys.USER);
        return productService.sellProduct(payload, user)
                .thenApply(product -> ok(Json.toJson(makeProductResponse(product))));
    }

    private List<ProductResponse> makeProductResponses(List<Product> products) {
        return products.stream()
                .map(this::makeProductResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse makeProductResponse(Product product) {
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
}
