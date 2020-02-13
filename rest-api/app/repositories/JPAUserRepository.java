package repositories;

import common.Constants;
import models.User;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class JPAUserRepository extends JPARepository<User, UUID> implements UserRepository {
    private final String findByUsernameQuery = "select u from User u where username=:username";

    @Inject
    public JPAUserRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, User.class);
    }

    @Override
    public CompletionStage<User> findByUsername(String username) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<User> query = em.createQuery(findByUsernameQuery, User.class);
            query.setParameter(Constants.Fields.USERNAME, username);
            return query.getSingleResult();
        })).exceptionally(error -> null);
    }
}
