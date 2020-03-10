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
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Collectors;

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
                    if (category != null) {
                        return category;
                    }

                    category = new Category(null, name, new HashSet<>());
                    return categoryRepository.create(category).toCompletableFuture().join();
                })
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<Subcategory> findOrCreateSubcategoryWithCategoryByName(String subcategoryName, String categoryName) {
        return findSubcategoryByName(subcategoryName)
                .thenApply(subcategory -> {
                    if (subcategory != null) {
                        return subcategory;
                    }

                    Category category = findOrCreateCategoryByName(categoryName).toCompletableFuture().join();
                    Subcategory newSubcategory = new Subcategory(null, subcategoryName, category);
                    category.subcategories.add(newSubcategory);

                    return subcategoryRepository.create(newSubcategory).toCompletableFuture().join();
                })
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<List<Category>> getCategories() {
        return categoryRepository.getAll()
                .thenApplyAsync(categoryStream -> categoryStream.collect(Collectors.toList()), ec.current());
    }
}
