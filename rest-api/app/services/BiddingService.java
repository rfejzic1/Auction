package services;

import lombok.RequiredArgsConstructor;
import models.Bid;
import models.User;
import play.libs.concurrent.HttpExecutionContext;
import repositories.BidRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class BiddingService {
    private final BidRepository bidRepository;
    private final HttpExecutionContext ec;

    private final ProductService productService;

    public CompletionStage<List<Bid>> getProductBids(String productUUID) {
        return bidRepository.getProductBids(productUUID)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<List<Bid>> getUserBids(String userUUID) {
        return bidRepository.getUserBids(userUUID)
                .thenApplyAsync(Function.identity(), ec.current());
    }

    public CompletionStage<Bid> placeBid(String productID, User user, BigDecimal value) {
        return bidRepository.getProductBids(productID)
                .thenApplyAsync(bids -> {
                    boolean notHighestBid = bids.stream().anyMatch(bid -> bid.value.compareTo(value) >= 0);

                    if (notHighestBid) {
                        throw new RuntimeException("Bid not the highest for this product");
                    }

                    return productService.getProduct(productID)
                            .thenApply(product -> {
                                if (product != null) {
                                    if (value.compareTo(product.auction.startPrice) < 0) {
                                        throw new RuntimeException("Bid value must be greater than the starting price");
                                    }

                                    Bid bid = new Bid(null, product, user, value);
                                    return bidRepository.create(bid).toCompletableFuture().join();
                                }

                                throw new IllegalArgumentException("No product with UUID '" + productID + "'");
                            })
                            .thenApplyAsync(Function.identity(), ec.current()).toCompletableFuture().join();
                });
    }
}
