package repositories;

import models.Category;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class CategoryJPARepository extends JPARepository<Category, Long> implements CategoryRepository {

    @Inject
    public CategoryJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Category.class);
    }

}
