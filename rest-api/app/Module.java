import com.google.inject.AbstractModule;
import repositories.*;

public class Module extends AbstractModule {
    @Override
    public void configure() {
        bind(UserRepository.class).to(UserJPARepository.class).asEagerSingleton();
        bind(ProductRepository.class).to(ProductJPARepository.class).asEagerSingleton();
        bind(CategoryRepository.class).to(CategoryJPARepository.class).asEagerSingleton();
        bind(SubcategoryRepository.class).to(SubcategoryJPARepository.class).asEagerSingleton();
        bind(ImageRepository.class).to(ImageJPARepository.class).asEagerSingleton();
        bind(BidRepository.class).to(BidJPARepository.class).asEagerSingleton();
    }
}
