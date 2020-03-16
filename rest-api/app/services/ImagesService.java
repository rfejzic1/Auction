package services;

import lombok.RequiredArgsConstructor;
import models.Image;
import play.libs.concurrent.HttpExecutionContext;
import repositories.ImageRepository;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class ImagesService {
    private final ImageRepository imageRepository;
    private final HttpExecutionContext ec;

    // TODO: Image upload
    //       Have a number of image names be stored in the database as UUIDs
    //       and save the files to local storage with those names

}
