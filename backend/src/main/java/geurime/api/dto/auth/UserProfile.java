package geurime.api.dto.auth;

import geurime.database.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfile {

    private String provider;
    private String email;
    private String name;
    private String nickname;

    public User toUser() {
        return User.builder()
                .provider(provider)
                .email(email)
                .userName(name)
                .build();
    }

}
