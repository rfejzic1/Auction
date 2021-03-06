package repositories;

import common.Constants;
import models.Subcategory;
import common.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class SubcategoryJPARepository extends JPARepository<Subcategory, UUID> implements SubcategoryRepository {
    private final String findByNameQuery = "select s from Subcategory s where name = :name";

    @Inject
    public SubcategoryJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Subcategory.class);
    }

    @Override
    public CompletionStage<Subcategory> findByName(String name) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Subcategory> query = em.createQuery(findByNameQuery, Subcategory.class);
            query.setParameter(Constants.Fields.NAME, name);
            return query.getSingleResult();
        })).exceptionally(error -> null);
    }
}
