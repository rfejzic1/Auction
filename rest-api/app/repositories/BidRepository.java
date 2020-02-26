package repositories;

import models.Bid;
import models.Product;
import models.User;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public interface BidRepository extends Repository<Bid, Long> {
    CompletionStage<Stream<Bid>> getProductBids(Product product);
    CompletionStage<Stream<Bid>> getUserBids(User user);
}
