package repositories;

import models.Product;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.UUID;

@Singleton
public class ProductJPARepository extends JPARepository<Product, UUID> implements ProductRepository {

    @Inject
    public ProductJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Product.class);
    }

}
