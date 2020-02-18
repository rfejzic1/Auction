package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import models.utils.UUIDGenerator;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "users",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})}
)
public class User {
    @Id
    @NotNull
    @UUIDGenerator
    @GeneratedValue(generator = "UUID")
    public UUID uuid;

    @Email
    @NotBlank
    public String email;

    @JsonIgnore
    @NotBlank
    @Size(min = 8, max = 100)
    public String password;

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
