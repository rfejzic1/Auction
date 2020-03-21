package common;

import models.User;
import play.libs.typedmap.TypedKey;

public class Constants {
    public static final class Messages {
        public static final String UNAUTHORIZED = "Unauthorized";
        public static final String UNAUTHENTICATED = "Unauthenticated";
        public static final String NOT_FOUND = "Resource not found";
        public static final String BAD_UUID = "Bad UUID";
        public static final String USER_NOT_FOUND = "User not found";
        public static final String BAD_ORDER_BY = "No such ordering option";
        public static final String NEGATIVE_PAGE_NUMBER = "Negative page number";
        public static final String BAD_PAGE_SIZE = "Bad page size";
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
        public static final String CATEGORY = "category";
        public static final String PRODUCT_ID = "product_id";
        public static final String USER_ID = "user_id";
        public static final String VALUE = "value";
        public static final String COLUMN = "column";
    }

    public static final class Queries {
        public static final String FIND_ALL = "select t from %s t";
    }

    public static final class TypedKeys {
        public final static TypedKey<User> USER = TypedKey.create(Fields.USER);
    }

    public static final String KEY = "auction-secret";
    public static final String BEARER_REGEX = "Bearer .+";
    public static final Integer MIN_PAGE_SIZE = 1;
    public static final Integer DEFAULT_PAGE_SIZE = 8;
    public static final Integer MAX_PAGE_SIZE = 32;
}
