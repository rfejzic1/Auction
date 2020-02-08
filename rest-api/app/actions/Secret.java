package actions;

import io.jsonwebtoken.impl.TextCodec;

public class Secret {
    public static final String key = TextCodec.BASE64.encode("auction-secret");
}
