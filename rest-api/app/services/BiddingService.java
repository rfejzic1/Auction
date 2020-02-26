package services;

import lombok.RequiredArgsConstructor;
import models.Bid;
import models.Product;
import models.User;
import play.libs.concurrent.HttpExecutionContext;
import repositories.BidRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Collectors;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class BiddingService {
    private final BidRepository bidRepository;
    private final HttpExecutionContext ec;

    public CompletionStage<List<Bid>> getProductBids(String productUUID) {
        return bidRepository.getProductBids(productUUID)
                .thenApplyAsync(bidStream -> bidStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<List<Bid>> getUserBids(String userUUID) {
        return bidRepository.getUserBids(userUUID)
                .thenApplyAsync(bidStream -> bidStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<Bid> placeBid(Product product, User user, BigDecimal value) {
        Bid bid = new Bid(null, user, product, value);
        return bidRepository.create(bid)
                .thenApplyAsync(Function.identity(), ec.current());
    }

}
