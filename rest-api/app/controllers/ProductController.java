package controllers;

import actions.JWTAuthenticated;
import common.Constants;
import common.JsonResponseObjects;
import models.User;
import payload.ProductAuctionPayload;
import services.CategorizationService;
import services.ProductService;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class ProductController extends Controller {
    private final ProductService productService;
    private final CategorizationService categorizationService;

    public CompletionStage<Result> getProducts(String category, String subcategory) {
        if (category != null) {
            if (subcategory != null) {
                return productService.getProductsBySubcategory(category, subcategory)
                        .thenApply(products -> ok(Json.toJson(products)));
            }

            return productService.getProductsByCategory(category)
                    .thenApply(products -> ok(Json.toJson(products)));
        }

        return productService.getAll()
                .thenApply(products -> ok(Json.toJson(products)));
    }

    public CompletionStage<Result> get(String id) {
        UUID uuid;

        try {
            uuid = UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            return supplyAsync(() -> status(UNPROCESSABLE_ENTITY, JsonResponseObjects.json422(Constants.Messages.BAD_UUID)));
        }

        return productService.getProduct(uuid)
                .thenApply(product -> {
                    if (product == null) {
                        return notFound(JsonResponseObjects.json404(Constants.Messages.USER_NOT_FOUND));
                    }
                    return ok(Json.toJson(product));
                });
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
            .thenApply(product -> ok(Json.toJson(product)));
    }
}
