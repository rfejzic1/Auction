package actions;

import actions.JWTAuthenticated;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.TextCodec;
import jdk.nashorn.internal.runtime.regexp.joni.Regex;
import models.User;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.libs.typedmap.TypedKey;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import repositories.UserRepository;

import javax.inject.Inject;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;
import static play.mvc.Http.HeaderNames.AUTHORIZATION;

public class JWTAuthenticationAction extends Action<JWTAuthenticated> {
    private final HttpExecutionContext ec;
    private final UserRepository userRepository;
    private final static TypedKey<User> userTypedKey = TypedKey.create("user");
    private final String key = TextCodec.BASE64.encode("auction-secret");

    @Inject
    public JWTAuthenticationAction(HttpExecutionContext ec, UserRepository userRepository) {
        this.ec = ec;
        this.userRepository = userRepository;
    }

    @Override
    public CompletionStage<Result> call(Http.Request request) {
        Optional<String> authHeader = request.header(AUTHORIZATION);

        if(!authHeader.isPresent())
            return supplyAsync(() -> unauthorized(Json.newObject().put("message", "Unauthorized")));

        if(!authHeader.get().matches("Bearer .+"))
            return supplyAsync(() -> unauthorized(Json.newObject().put("message", "Unauthorized2")));

        String jwtString = authHeader.get().split(" ")[1];

        Jws<Claims> jws;
        String username;

        try {
            jws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwtString);
            username = jws.getBody().get("username", String.class);
        } catch (JwtException ex) {
            return supplyAsync(() -> unauthorized(Json.newObject().put("message", "Unauthorized3")));
        }

        return userRepository
                .findByUsername(username)
                .thenApplyAsync(user -> {
                    request.addAttr(userTypedKey, user);
                    return delegate.call(request).toCompletableFuture().join();
                }, ec.current());
    }
}

