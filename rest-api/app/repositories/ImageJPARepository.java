package repositories;

import models.Image;
import common.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.UUID;

@Singleton
public class ImageJPARepository extends JPARepository<Image, UUID> implements ImageRepository {

    @Inject
    public ImageJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Image.class);
    }
    
}
