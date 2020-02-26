package controllers;

import actions.JWTAuthenticated;
import com.fasterxml.jackson.databind.JsonNode;
import common.Constants;
import common.JsonResponseObjects;
import models.User;
import payload.BidPayload;
import play.mvc.Http;
import services.BiddingService;
import lombok.AllArgsConstructor;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class BidController extends Controller {
    private final BiddingService biddingService;

    public CompletionStage<Result> getProductBids(String id) {
        return biddingService.getProductBids(id)
                .thenApplyAsync(bids -> ok(Json.toJson(bids)));
    }

    public CompletionStage<Result> getUserBids(String id) {
        return biddingService.getProductBids(id)
                .thenApplyAsync(bids -> ok(Json.toJson(bids)));
    }

    @JWTAuthenticated
    public CompletionStage<Result> placeBid(Http.Request request) {
        JsonNode json = request.body().asJson();
        BidPayload payload = Json.fromJson(json, BidPayload.class);

        User user = request.attrs().get(Constants.TypedKeys.USER);

        return biddingService.placeBid(payload, user)
                .thenApplyAsync(bid -> ok(Json.toJson(bid)))
                .exceptionally(t -> status(UNPROCESSABLE_ENTITY, JsonResponseObjects.json422(Constants.Messages.BAD_UUID)));
    }
}
