package actions;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.TextCodec;
import lombok.RequiredArgsConstructor;
import models.User;
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

import static common.Constants.*;
import static common.JsonResponseObjects.*;

@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class JWTAuthenticationAction extends Action<JWTAuthenticated> {
    private final HttpExecutionContext ec;
    private final UserRepository userRepository;
    private final static TypedKey<User> userTypedKey = TypedKey.create("user");

    @Override
    public CompletionStage<Result> call(Http.Request request) {
        Optional<String> authHeader = request.header(AUTHORIZATION);

        if(!authHeader.isPresent()) {
            return supplyAsync(() -> unauthorized(jsonUnauthorized()));
        }

        if(!authHeader.get().matches(BEARER_REGEX)) {
            return supplyAsync(() -> unauthorized(jsonUnauthorized()));
        }

        String jwtString = authHeader.get().split(" ")[1];

        Jws<Claims> jws;
        String username;

        try {
            jws = Jwts.parser().setSigningKey(TextCodec.BASE64.encode(KEY)).parseClaimsJws(jwtString);
            username = jws.getBody().get(Fields.USERNAME, String.class);
        } catch (JwtException ex) {
            return supplyAsync(() -> unauthorized(jsonUnauthorized()));
        }

        return userRepository
                .findByUsername(username)
                .thenApplyAsync(user -> {
                    request.addAttr(userTypedKey, user);
                    return delegate.call(request).toCompletableFuture().join();
                }, ec.current());
    }
}
