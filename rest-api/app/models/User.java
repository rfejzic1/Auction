package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import models.utils.UUIDGenerator;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(
    name = "users",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"username", "email"})}
)
public class User {
    @Id
    @NotNull
    @UUIDGenerator
    @GeneratedValue(generator = "UUID")
    public UUID uuid;

    @NotBlank
    @Size(min = 6, max = 30)
    public String username;

    @JsonIgnore
    @NotBlank
    @Size(min = 8, max = 100)
    public String password;

    @Email
    public String email;

    @Enumerated(EnumType.STRING)
    public UserRole role;

    @NotBlank
    public String firstName;

    @NotBlank
    public String lastName;

    @NotBlank
    public String gender;

    @NotNull
    @Past
    @Temporal(TemporalType.TIMESTAMP)
    public Date birthday;

    @NotBlank
    public String phoneNumber;
}
