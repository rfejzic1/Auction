package repositories;

import models.Bid;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletionStage;

public interface BidRepository extends Repository<Bid, UUID> {
    CompletionStage<List<Bid>> getProductBids(String productUUID);
    CompletionStage<List<Bid>> getUserBids(String userUUID);
}
