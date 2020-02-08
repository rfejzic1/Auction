package repositories;

import models.User;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface UserRepository extends Repository<User, UUID> {
    CompletionStage<User> findByUsername(String username);
}
