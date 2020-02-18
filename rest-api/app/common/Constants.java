package common;

public class Constants {
    public static final class Messages {
        public static final String UNAUTHORIZED = "Unauthorized";
        public static final String UNAUTHENTICATED = "Unauthenticated";
    }

    public static final class Fields {
        public static final String EMAIL = "email";
        public static final String ROLE = "role";
        public static final String MESSAGE  = "message";
        public static final String STATUS  = "status";
        public static final String TOKEN  = "token";
        public static final String USER = "user";
    }

    public static final class Queries {
        public static final String FIND_ALL = "select t from %s t";
    }

    public static final String KEY = "auction-secret";
    public static final String BEARER_REGEX = "Bearer .+";
}
