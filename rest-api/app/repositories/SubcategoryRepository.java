package repositories;

import models.Subcategory;

import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface SubcategoryRepository extends Repository<Subcategory, UUID> {
    CompletionStage<Subcategory> findByName(String name);
}
