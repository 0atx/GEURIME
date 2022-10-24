package geurime.api.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * A DTO for the {@link geurime.database.entity.User} entity
 */
@Data
public class UserDto implements Serializable {
    private final Long id;
    private final String email;
    private final String refreshToken;
    private final String userName;
    private final LocalDate createDate;
    private final String nickname;
    private final String userProfileImage;
    private final String simplePassword;
    private final Boolean isActive;
    private final String provider;
    private final Boolean isChild;
    private final FamilyDto family;

    /**
     * A DTO for the {@link geurime.database.entity.Family} entity
     */
    @Data
    public static class FamilyDto implements Serializable {
        private final Long id;
        private final String familyName;
        private final Long familyLeaderId;
        private final List<KidDto> kidList;

        /**
         * A DTO for the {@link geurime.database.entity.Kid} entity
         */
        @Data
        public static class KidDto implements Serializable {
            private final Long id;
            private final String kidName;
            private final String kidProfileImage;
            private final LocalDate kidBirth;
        }
    }
}