package services;

import lombok.RequiredArgsConstructor;
import models.Bid;
import models.User;
import payload.BidPayload;
import play.libs.concurrent.HttpExecutionContext;
import repositories.BidRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Collectors;

@Singleton
@RequiredArgsConstructor(onConstructor=@__(@Inject))
public class BiddingService {
    private final BidRepository bidRepository;
    private final HttpExecutionContext ec;

    private final ProductService productService;

    public CompletionStage<List<Bid>> getProductBids(String productUUID) {
        return bidRepository.getProductBids(productUUID)
                .thenApplyAsync(bidStream -> bidStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<List<Bid>> getUserBids(String userUUID) {
        return bidRepository.getUserBids(userUUID)
                .thenApplyAsync(bidStream -> bidStream.collect(Collectors.toList()), ec.current());
    }

    public CompletionStage<Bid> placeBid(BidPayload payload, User user) {
        return productService.getProduct(payload.productID)
                .thenApply(product -> {
                    Bid bid = new Bid(null, user, product, payload.value);
                    return bidRepository.create(bid).toCompletableFuture().join();
                })
                .thenApplyAsync(Function.identity(), ec.current());
    }

}
