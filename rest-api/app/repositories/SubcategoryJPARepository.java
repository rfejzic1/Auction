package repositories;

import models.Subcategory;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class SubcategoryJPARepository extends JPARepository<Subcategory, Long> implements SubcategoryRepository {

    @Inject
    public SubcategoryJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Subcategory.class);
    }

}
