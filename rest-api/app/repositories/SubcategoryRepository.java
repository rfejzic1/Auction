package repositories;

import models.Subcategory;

import java.util.concurrent.CompletionStage;

public interface SubcategoryRepository extends Repository<Subcategory, Long> {
    CompletionStage<Subcategory> findByName(String name);
}
