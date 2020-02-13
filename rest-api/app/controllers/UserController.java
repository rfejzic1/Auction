package controllers;

import actions.JWTAuthenticated;
import com.fasterxml.jackson.databind.JsonNode;
import common.Constants;
import lombok.AllArgsConstructor;
import payload.LoginPayload;
import payload.RegistrationPayload;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import services.UserService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;

import static common.JsonErrorObjects.json500;

@AllArgsConstructor(onConstructor=@__(@Inject))
public class UserController extends Controller {
    private final UserService userService;

    @JWTAuthenticated
    public CompletionStage<Result> index() {
        return userService.getAll().thenApply(users -> ok(Json.toJson(users)));
    }

    public CompletionStage<Result> register(Http.Request request) {
        JsonNode json = request.body().asJson();
        RegistrationPayload payload = Json.fromJson(json, RegistrationPayload.class);

        return userService.registerUser(payload)
                .thenApplyAsync(token -> ok(jsonResponse(token)))
                .exceptionally(t -> internalServerError(json500(t.getMessage())));
    }

    public CompletionStage<Result> login(Http.Request request) {
        JsonNode json = request.body().asJson();
        LoginPayload payload = Json.fromJson(json, LoginPayload.class);

        return userService.loginUser(payload)
                .thenApplyAsync(token -> ok(jsonResponse(token)))
                .exceptionally(t -> internalServerError(json500(t.getMessage())));
    }

    private JsonNode jsonResponse(String token) {
        return Json.newObject().put(Constants.Fields.TOKEN, token);
    }
}
