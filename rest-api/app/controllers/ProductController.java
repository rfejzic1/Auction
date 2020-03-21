package controllers;

import actions.JWTAuthenticated;
import common.Constants;
import common.JsonResponseObjects;
import models.Product;
import models.User;
import payload.Page;
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
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class ProductController extends Controller {
    private final ProductService productService;
    private final CategorizationService categorizationService;

    public CompletionStage<Result> getProducts(String category, String subcategory, String orderBy, Integer page, Integer size) {
        Page pageData = productService.makePage(orderBy, page, size);

        Function<List<Product>, Result> productsToJsonMapper = products -> ok(Json.toJson(productService.makeProductResponses(products)));

        if (category != null) {
            if (subcategory != null) {
                return productService.getProductsBySubcategory(category, subcategory, pageData).thenApply(productsToJsonMapper);
            }
            return productService.getProductsByCategory(category, pageData).thenApply(productsToJsonMapper);
        }

        return productService.getProducts(pageData).thenApply(productsToJsonMapper);
    }

    public CompletionStage<Result> get(String id) {
        return productService.getProduct(id)
                .thenApply(product -> {
                    if (product != null) {
                        return ok(Json.toJson(productService.makeProductResponse(product)));
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
                .thenApply(product -> ok(Json.toJson(productService.makeProductResponse(product))));
    }

}
