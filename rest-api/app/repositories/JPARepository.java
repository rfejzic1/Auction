package repositories;

import lombok.AllArgsConstructor;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Optional;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@AllArgsConstructor
public abstract class JPARepository<T, ID> implements Repository<T, ID> {
    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;
    private final Class<T> genericClassType;

    @Override
    public CompletionStage<Stream<T>> getAll() {
        return supplyAsync(() -> with(this::findAll), executionContext);
    }

    @Override
    public CompletionStage<T> create(T data) {
        return supplyAsync(() -> with(em -> em.merge(data)), executionContext);
    }

    @Override
    public CompletionStage<Optional<T>> get(ID id) {
        return supplyAsync(() -> with(em -> findIt(em, id)), executionContext);
    }

    @Override
    public CompletionStage<Optional<T>> update(ID id, T data) {
        return supplyAsync(() -> with(em -> updateEntity(em, id, data)), executionContext);
    }

    @Override
    public CompletionStage<Optional<T>> delete(ID id) {
        return supplyAsync(() -> with(em -> remove(em, id)));
    }

    <R> R with(Function<EntityManager, R> function) {
        return jpaApi.withTransaction(function);
    }

    private Stream<T> findAll(EntityManager em) {
        String findAllQuery = "select t from " + genericClassType.getSimpleName() + " t";
        TypedQuery<T> query = em.createQuery(findAllQuery, genericClassType);
        return query.getResultList().stream();
    }

    private Optional<T> findIt(EntityManager em, ID id) {
        return Optional.ofNullable(em.find(genericClassType, id));
    }

    private Optional<T> updateEntity(EntityManager em, ID id, T data) {
        Optional<T> found = findIt(em, id);
        found.ifPresent(t -> em.merge(data));
        return found;
    }

    private Optional<T> remove(EntityManager em, ID id) {
        Optional<T> found = findIt(em, id);
        found.ifPresent(em::remove);
        return found;
    }

}