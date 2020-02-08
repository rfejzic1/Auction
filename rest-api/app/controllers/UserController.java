package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import payload.LoginPayload;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import services.UserService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;

import static play.mvc.Results.*;
import static java.util.concurrent.CompletableFuture.supplyAsync;

public class UserController {
    private final UserService userService;

    @Inject
    public UserController(UserService userService) {
        this.userService = userService;
    }

    public CompletionStage<Result> index() {
        return userService.getAll().thenApply(users -> ok(Json.toJson(users)));
    }

    public CompletionStage<Result> create(Http.Request request) {
        JsonNode json = request.body().asJson();
        LoginPayload loginPayload = Json.fromJson(json, LoginPayload.class);
        return userService.createUser(loginPayload)
                .thenApplyAsync(user -> ok(Json.toJson(user)));
    }
}
