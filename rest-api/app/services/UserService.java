package services;

import common.Constants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import lombok.RequiredArgsConstructor;
import models.User;
import org.mindrot.jbcrypt.BCrypt;
import payload.LoginPayload;
import payload.RegistrationPayload;
import play.libs.concurrent.HttpExecutionContext;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import static common.Constants.KEY;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class UserService {
    private final UserRepository userRepository;
    private final HttpExecutionContext ec;

    public CompletionStage<List<User>> getAll() {
        return userRepository.getAll()
                .thenApplyAsync(userStream -> userStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<String> loginUser(LoginPayload payload) {
        return userRepository
                .findByUsername(payload.username)
                .thenApplyAsync(user -> {
                    if(user == null) {
                        throw new RuntimeException(Constants.Messages.UNAUTHENTICATED);
                    }

                    boolean passwordsMatch = BCrypt.checkpw(payload.password, user.password);

                    if(passwordsMatch) {
                        return createJWT(user);
                    }

                    throw new RuntimeException(Constants.Messages.UNAUTHENTICATED);
                }, ec.current());
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
                .claim(Constants.Fields.USERNAME, user.username)
                .claim(Constants.Fields.EMAIL, user.email)
                .claim(Constants.Fields.ROLE, user.role)
                .signWith(SignatureAlgorithm.HS256, TextCodec.BASE64.encode(KEY))
                .compact();
    }
}
