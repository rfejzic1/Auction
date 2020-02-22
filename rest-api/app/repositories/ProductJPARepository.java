package repositories;

import common.Constants;
import models.Product;
import models.Subcategory;
import models.User;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class ProductJPARepository extends JPARepository<Product, UUID> implements ProductRepository {
    private final String findBySubcategoryQuery = "select p from Product p where subcategory = :subcategory";

    @Inject
    public ProductJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Product.class);
    }

    @Override
    public CompletionStage<List<Product>> findBySubcategory(Subcategory subcategory) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Product> query = em.createQuery(findBySubcategoryQuery, Product.class);
            query.setParameter(Constants.Fields.SUBCATEGORY, subcategory.name);
            return query.getResultList();
        })).exceptionally(error -> new ArrayList<>());
    }
}
