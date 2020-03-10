package repositories;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

public interface Repository<T, ID> {
    CompletionStage<List<T>> getAll();
    CompletionStage<T> create(T data);
    CompletionStage<Optional<T>> get(ID id);
    CompletionStage<Optional<T>> update(ID id, T data);
    CompletionStage<Optional<T>> delete(ID id);
}
