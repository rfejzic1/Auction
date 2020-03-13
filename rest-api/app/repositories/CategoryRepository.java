package repositories;

import models.Category;

import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface CategoryRepository extends Repository<Category, UUID> {
    CompletionStage<Category> findByName(String name);
}
