package repositories;

import java.util.Optional;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public interface Repository<T, ID> {
    CompletionStage<Stream<T>> getAll();
    CompletionStage<T> create(T data);
    CompletionStage<Optional<T>> get(ID id);
    CompletionStage<Optional<T>> update(ID id, T data);
    CompletionStage<Optional<T>> delete(ID id);
}
