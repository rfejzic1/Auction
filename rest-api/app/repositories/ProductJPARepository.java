package repositories;

import common.OrderByOption;
import models.Product;
import common.DatabaseExecutionContext;
import payload.Page;
import payload.ProductFilter;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class ProductJPARepository extends JPARepository<Product, UUID> implements ProductRepository {

    @Inject
    public ProductJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Product.class);
    }

    @Override
    public CompletionStage<List<Product>> getProducts(ProductFilter filter, Page page) {
        return supplyAsync(() -> with(em -> {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery<Product> criteriaQuery = criteriaBuilder.createQuery(Product.class);
            Root<Product> root = criteriaQuery.from(Product.class);

            Predicate[] predicates = getPredicates(criteriaBuilder, root, filter);
            Order order = getOrder(criteriaBuilder, root, page.getOrderByOption());

            criteriaQuery.select(root).where(predicates);
            criteriaQuery.orderBy(order);

            TypedQuery<Product> query = em.createQuery(criteriaQuery);
            query.setFirstResult(page.getPageNumber() * page.getPageSize());
            query.setMaxResults(page.getPageSize());

            return query.getResultList();
        })).exceptionally(error -> new ArrayList<>());
    }

    private Predicate[] getPredicates(CriteriaBuilder criteriaBuilder, Root<Product> root, ProductFilter filter) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getCategory() != null) {
            predicates.add(criteriaBuilder.like(root.get("subcategory").get("category").get("name"), filter.getCategory()));

            if(filter.getSubcategory() != null) {
                predicates.add(criteriaBuilder.like(root.get("subcategory").get("name"), filter.getSubcategory()));
            }
        }

        if (filter.getMinPrice() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("auction").get("startPrice"), filter.getMinPrice()));
        }

        if (filter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("auction").get("startPrice"), filter.getMaxPrice()));
        }

        return predicates.toArray(new Predicate[0]);
    }

    private Order getOrder(CriteriaBuilder criteriaBuilder, Root<Product> root, OrderByOption orderByOption) {
        switch(orderByOption) {
            case PRICE_LOWEST:
                return criteriaBuilder.asc(root.get("auction").get("startPrice"));
            case NEWEST:
                return criteriaBuilder.desc(root.get("auction").get("startDate"));
            default:
                return criteriaBuilder.asc(root.get("name"));
        }
    }

}
