package repositories;

import models.Category;

import java.util.concurrent.CompletionStage;

public interface CategoryRepository extends Repository<Category, Long> {
    CompletionStage<Category> findByName(String name);
}
