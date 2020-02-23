package services;

import lombok.RequiredArgsConstructor;
import models.Category;
import models.Subcategory;
import play.libs.concurrent.HttpExecutionContext;
import repositories.CategoryRepository;
import repositories.SubcategoryRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.HashSet;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class CategorizationService {
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final HttpExecutionContext ec;

    public CompletionStage<Category> findCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    public CompletionStage<Subcategory> findSubcategoryByName(String name) {
        return subcategoryRepository.findByName(name);
    }

    public CompletionStage<Category> findOrCreateCategoryByName(String name) {
        return findCategoryByName(name)
                .thenApply(category -> {
                    if(category == null) {
                        category = new Category(null, name, new HashSet<>());
                        return categoryRepository.create(category).toCompletableFuture().join();
                    }

                    return category;
                })
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<Subcategory> findOrCreateSubcategoryWithCategoryByName(String subcategoryName, String categoryName) {
        return findSubcategoryByName(subcategoryName)
                .thenApply(subcategory -> {
                    if(subcategory == null) {
                        Category category = findOrCreateCategoryByName(categoryName).toCompletableFuture().join();
                        Subcategory newSubcategory = new Subcategory(null, subcategoryName, category);
                        category.subcategories.add(newSubcategory);

                        return subcategoryRepository.create(newSubcategory).toCompletableFuture().join();
                    }

                    return subcategory;
                })
                .thenApplyAsync(Function.identity(), ec.current());
    }

}
