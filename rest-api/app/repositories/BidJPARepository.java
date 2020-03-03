package repositories;

import common.Constants;
import models.Bid;
import models.Product;
import models.User;
import models.utils.DatabaseExecutionContext;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.TypedQuery;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class BidJPARepository extends JPARepository<Bid, Long> implements BidRepository {
    private final String getProductBidsQuery = "select b from Bid b where cast(b.product.uuid as string)=:product_id order by b.value desc";
    private final String getUserBidsQuery = "select b from Bid b where cast(b.user.uuid as string)=:user_id";

    @Inject
    public BidJPARepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        super(jpaApi, executionContext, Bid.class);
    }

    @Override
    public CompletionStage<Stream<Bid>> getProductBids(String productUUID) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Bid> query = em.createQuery(getProductBidsQuery, Bid.class);
            query.setParameter(Constants.Fields.PRODUCT_ID, productUUID);
            return query.getResultList().stream();
        })).exceptionally(error -> Stream.empty());
    }

    @Override
    public CompletionStage<Stream<Bid>> getUserBids(String userUUID) {
        return supplyAsync(() -> with(em -> {
            TypedQuery<Bid> query = em.createQuery(getUserBidsQuery, Bid.class);
            query.setParameter(Constants.Fields.USER_ID, userUUID);
            return query.getResultList().stream();
        })).exceptionally(error -> Stream.empty());
    }
}
