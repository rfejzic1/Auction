package services;

import actions.Secret;
import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import models.User;
import models.UserRole;
import org.mindrot.jbcrypt.BCrypt;
import payload.LoginPayload;
import payload.RegistrationPayload;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import repositories.JPAUserRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class UserService {
    private final UserRepository userRepository;
    private final HttpExecutionContext ec;

    @Inject
    public UserService(JPAUserRepository userRepository, HttpExecutionContext httpExecutionContext) {
        this.userRepository = userRepository;
        this.ec = httpExecutionContext;
    }

    public CompletionStage<List<User>> getAll() {
        return userRepository.getAll()
                .thenApplyAsync(userStream -> userStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<User> createUser(LoginPayload payload) {
        User user = new User();
        user.username = payload.username;
        user.password = payload.password;
        user.email = payload.email;
        return userRepository.create(user);
    }

    public CompletionStage<String> loginUser(LoginPayload payload) {
        return userRepository
                .findByUsername(payload.username)
                .thenApplyAsync(user -> {
                    if(user == null)
                        throw new RuntimeException("unauthenticated");

                    boolean passwordsMatch = BCrypt.checkpw(payload.password, user.password);

                    if(passwordsMatch)
                        return createJWT(user);

                    throw new RuntimeException("unauthenticated");
                });
    }

    public CompletionStage<String> registerUser(RegistrationPayload payload) {
        User user = new User();
        String passwordHash = BCrypt.hashpw(payload.password, BCrypt.gensalt());

        user.username = payload.username;
        user.email = payload.email;
        user.password = passwordHash;
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.role = payload.role;
        user.phoneNumber = payload.phoneNumber;
        user.gender = payload.gender;
        user.birthday = payload.birthday;

        return userRepository.create(user).thenApplyAsync(this::createJWT, ec.current());
    }

    private String createJWT(User user) {
        return Jwts.builder()
                .setIssuedAt(new Date())
                .claim("username", user.username)
                .claim("email", user.email)
                .claim("role", user.role)
                .signWith(SignatureAlgorithm.HS256, Secret.key)
                .compact();
    }
}
