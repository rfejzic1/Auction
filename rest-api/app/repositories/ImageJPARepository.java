package repositories;

import models.Image;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ImageJPARepository extends JPARepository<Image, Long> implements ImageRepository {

    @Inject
    public ImageJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Image.class);
    }
    
}
