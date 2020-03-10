package repositories;

import models.Bid;

import java.util.List;
import java.util.concurrent.CompletionStage;

public interface BidRepository extends Repository<Bid, Long> {
    CompletionStage<List<Bid>> getProductBids(String productUUID);
    CompletionStage<List<Bid>> getUserBids(String userUUID);
}
