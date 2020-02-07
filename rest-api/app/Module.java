import com.google.inject.AbstractModule;
import com.google.inject.TypeLiteral;
import models.User;
import repositories.Repository;
import repositories.UserRepository;

import java.util.UUID;

public class Module extends AbstractModule {
    @Override
    public void configure() {
        bind(new TypeLiteral<Repository<User, UUID>>(){}).to(UserRepository.class).asEagerSingleton();
    }
}
