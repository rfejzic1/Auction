package repositories;

import common.Constants;
import models.Product;
import common.DatabaseExecutionContext;
import payload.Page;
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
    private final String getProductsQuery = "select p from Product p order by :column";
    private final String findBySubcategoryQuery = "select p from Product p where p.subcategory.name = :subcategory and p.subcategory.category.name = :category order by :column";
    private final String findByCategoryQuery = "select p from Product p where p.subcategory.category.name = :category order by :column";

    @Inject
    public ProductJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Product.class);
    }

    @Override
    public CompletionStage<List<Product>> findByCategory(String category, Page page) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Product> query = em.createQuery(findByCategoryQuery, Product.class);
            query.setParameter(Constants.Fields.CATEGORY, category);
            setUpQueryForPagination(query, page);
            return query.getResultList();
        })).exceptionally(error -> new ArrayList<>());
    }

    @Override
    public CompletionStage<List<Product>> findBySubcategory(String category, String subcategory, Page page) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Product> query = em.createQuery(findBySubcategoryQuery, Product.class);
            query.setParameter(Constants.Fields.CATEGORY, category);
            query.setParameter(Constants.Fields.SUBCATEGORY, subcategory);
            setUpQueryForPagination(query, page);
            return query.getResultList();
        })).exceptionally(error -> new ArrayList<>());
    }

    @Override
    public CompletionStage<List<Product>> getProducts(Page page) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Product> query = em.createQuery(getProductsQuery, Product.class);
            setUpQueryForPagination(query, page);
            return query.getResultList();
        })).exceptionally(error -> new ArrayList<>());
    }

    private void setUpQueryForPagination(TypedQuery<Product> query, Page page) {
        query.setParameter(Constants.Fields.COLUMN, page.getOrderByOption().toString());
        query.setFirstResult(page.getPageNumber() * page.getPageSize());
        query.setMaxResults(page.getPageSize());
    }

}
