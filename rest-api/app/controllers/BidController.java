package controllers;

import actions.JWTAuthenticated;
import com.fasterxml.jackson.databind.JsonNode;
import common.Constants;
import common.JsonResponseObjects;
import models.User;
import play.mvc.Http;
import services.BiddingService;
import lombok.AllArgsConstructor;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.concurrent.CompletionStage;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class BidController extends Controller {
    private final BiddingService biddingService;

    public CompletionStage<Result> getProductBids(String id) {
        return biddingService.getProductBids(id)
                .thenApplyAsync(bids -> ok(Json.toJson(bids)));
    }

    @JWTAuthenticated
    public CompletionStage<Result> getUserBids(Http.Request request) {
        User user = request.attrs().get(Constants.TypedKeys.USER);

        return biddingService.getUserBids(user.uuid.toString())
                .thenApplyAsync(bids -> ok(Json.toJson(bids)));
    }

    @JWTAuthenticated
    public CompletionStage<Result> placeBid(String id, Http.Request request) {
        JsonNode json = request.body().asJson();
        BigDecimal value = json.get("value").decimalValue();

        User user = request.attrs().get(Constants.TypedKeys.USER);

        return biddingService.placeBid(id, user, value)
                .thenApplyAsync(bid -> ok(Json.toJson(bid)))
                .exceptionally(t -> status(UNPROCESSABLE_ENTITY, JsonResponseObjects.json422(t.getMessage())));
    }
}
