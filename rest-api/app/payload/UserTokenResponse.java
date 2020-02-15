package payload;

import lombok.Value;
import models.User;

@Value
public class UserTokenResponse {
    public String token;
    public User user;
}
