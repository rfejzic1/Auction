package common;

import models.User;
import play.libs.typedmap.TypedKey;

public class Constants {
    public static final class Messages {
        public static final String UNAUTHORIZED = "Unauthorized";
        public static final String UNAUTHENTICATED = "Unauthenticated";
        public static final String NOT_FOUND = "Resource not found";
    }

    public static final class Fields {
        public static final String EMAIL = "email";
        public static final String ROLE = "role";
        public static final String MESSAGE  = "message";
        public static final String STATUS  = "status";
        public static final String TOKEN  = "token";
        public static final String USER = "user";
        public static final String SUBCATEGORY = "subcategory";
        public static final String NAME = "name";
    }

    public static final class Queries {
        public static final String FIND_ALL = "select t from %s t";
    }

    public static final class TypedKeys {
        public final static TypedKey<User> USER = TypedKey.create(Fields.USER);
    }

    public static final String KEY = "auction-secret";
    public static final String BEARER_REGEX = "Bearer .+";
}
