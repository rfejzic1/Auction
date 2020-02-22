package controllers;

import common.Constants;
import common.JsonResponseObjects;
import lombok.AllArgsConstructor;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.ProductService;

import javax.inject.Inject;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class ProductController extends Controller {
    private final ProductService productService;

    public CompletionStage<Result> getProducts(String category) {
        if(category == null) {
            return productService.getAll()
                    .thenApply(products -> ok(Json.toJson(products)));
        }

        return productService.getProductsBySubcategory(category)
                .thenApply(products -> ok(Json.toJson(products)));
    }

    public CompletionStage<Result> get(String uuidString) {
        UUID uuid;

        try {
            uuid = UUID.fromString(uuidString);
        } catch (IllegalArgumentException e) {
            return supplyAsync(() -> badRequest(JsonResponseObjects.json404(Constants.Messages.NOT_FOUND)));
        }

        return productService.getProduct(uuid)
                .thenApply(product -> ok(Json.toJson(product)));
    }
}
