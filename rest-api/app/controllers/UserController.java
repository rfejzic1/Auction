package controllers;

import actions.JWTAuthenticated;
import com.fasterxml.jackson.databind.JsonNode;
import payload.LoginPayload;
import payload.RegistrationPayload;
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

    @JWTAuthenticated
    public CompletionStage<Result> index() {
        return userService.getAll().thenApply(users -> ok(Json.toJson(users)));
    }

    public CompletionStage<Result> register(Http.Request request) {
        JsonNode json = request.body().asJson();
        RegistrationPayload payload = Json.fromJson(json, RegistrationPayload.class);
        return userService.registerUser(payload)
                .thenApplyAsync(token -> ok("jwt: " + token))
                .exceptionally(t -> internalServerError(Json.newObject().put("message", t.getMessage())));
    }

    public CompletionStage<Result> login(Http.Request request) {
        JsonNode json = request.body().asJson();
        LoginPayload payload = Json.fromJson(json, LoginPayload.class);
        return userService.loginUser(payload)
                .thenApplyAsync(token -> ok("jwt: " + token))
                .exceptionally(t -> internalServerError(Json.newObject().put("message", t.getMessage())));
    }
}
