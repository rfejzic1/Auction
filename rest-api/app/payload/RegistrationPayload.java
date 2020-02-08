package payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import models.UserRole;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationPayload {
    public String username;
    public String password;
    public String email;
    public UserRole role;
    public String firstName;
    public String lastName;
    public String gender;
    public Date birthday;
    public String phoneNumber;
}
