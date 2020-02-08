import com.google.inject.AbstractModule;
import repositories.JPAUserRepository;
import repositories.UserRepository;

public class Module extends AbstractModule {
    @Override
    public void configure() {
        bind(UserRepository.class).to(JPAUserRepository.class).asEagerSingleton();
    }
}
