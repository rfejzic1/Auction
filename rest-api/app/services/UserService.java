package services;

import models.User;
import play.libs.concurrent.HttpExecutionContext;
import repositories.JPAUserRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

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

    public CompletionStage<User> createDummyUser(String username) {
        User user = new User();
        user.setUsername(username);
        return userRepository.create(user);
    }
}
