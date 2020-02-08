package controllers;

import play.libs.Json;
import play.mvc.Result;
import services.UserService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;

import static play.mvc.Results.ok;

public class UserController {
    private final UserService userService;

    @Inject
    public UserController(UserService userService) {
        this.userService = userService;
    }

    public CompletionStage<Result> index() {
        return userService.getAll().thenApply(users -> ok(Json.toJson(users)));
    }
}
