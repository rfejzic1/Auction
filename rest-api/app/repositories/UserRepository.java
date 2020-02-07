package repositories;

import models.User;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import java.util.UUID;

public class UserRepository extends JPARepository<User, UUID> {
    @Inject
    public UserRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, User.class);
    }
}
