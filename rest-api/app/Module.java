import com.google.inject.AbstractModule;
import repositories.ProductJPARepository;
import repositories.ProductRepository;
import repositories.UserJPARepository;
import repositories.UserRepository;

public class Module extends AbstractModule {
    @Override
    public void configure() {
        bind(UserRepository.class).to(UserJPARepository.class).asEagerSingleton();
        bind(ProductRepository.class).to(ProductJPARepository.class).asEagerSingleton();
    }
}
