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
public class UserJPARepository extends JPARepository<User, UUID> implements UserRepository {
    private final String findByEmailQuery = "select u from User u where email=:email";

    @Inject
    public UserJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, User.class);
    }

    @Override
    public CompletionStage<User> findByEmail(String email) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<User> query = em.createQuery(findByEmailQuery, User.class);
            query.setParameter(Constants.Fields.EMAIL, email);
            return query.getSingleResult();
        })).exceptionally(error -> null);
    }
}
