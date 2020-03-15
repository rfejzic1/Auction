package repositories;

import common.Constants;
import models.Category;
import common.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class CategoryJPARepository extends JPARepository<Category, UUID> implements CategoryRepository {
    private final String findByNameQuery = "select c from Category c where name = :name";

    @Inject
    public CategoryJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Category.class);
    }

    @Override
    public CompletionStage<Category> findByName(String name) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Category> query = em.createQuery(findByNameQuery, Category.class);
            query.setParameter(Constants.Fields.NAME, name);
            return query.getSingleResult();
        })).exceptionally(error -> null);
    }
}
