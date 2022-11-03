package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.nio.channels.AsynchronousChannelGroup;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "refresh_token", unique = true)
    private String refreshToken;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @CreatedDate
    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column(name = "user_profile_image")
    private String userProfileImage;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "provider", length = 10, nullable = false)
    private String provider;

    @Column(name = "is_child")
    private Boolean isChild;

    @Column(name = "user_birth")
    private LocalDate userBirth;

    @Column(name = "user_gender")
    private String userGender;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Board> boardList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @PrePersist
    public void prePersist() {
        this.isActive = true;
    }

    public void joinFamily(Family family){
        this.family = family;
    }

    @Builder
    public User(Long id, String email, String refreshToken, String userName, LocalDate createDate, String nickname, String userProfileImage, Boolean isActive, String provider, Boolean isChild, LocalDate userBirth, String userGender, List<Board> boardList, Family family) {
        this.id = id;
        this.email = email;
        this.refreshToken = refreshToken;
        this.userName = userName;
        this.createDate = createDate;
        this.nickname = nickname;
        this.userProfileImage = userProfileImage;
        this.isActive = isActive;
        this.provider = provider;
        this.isChild = isChild;
        this.userBirth = userBirth;
        this.userGender = userGender;
        this.boardList = boardList;
        this.family = family;
    }

    public User update(String userName, String email) {
        this.userName = userName;
        this.email = email;
        return this;
    }

    /**
     * 유저 회원가입 method
     * user
     * @param request
     * @return
     */
    public User singUpUpdate(User.UserSignUpRequest request){
        this.createDate = LocalDate.now();
        this.nickname = request.getNickname();
        this.isChild = request.getIsChild();
        this.userBirth = LocalDate.parse(request.getUserBirth(), DateTimeFormatter.ISO_DATE);
        this.userGender = request.getUserGender();
        this.isActive = true;

        return this;
    }

    /**
     * 초대된 유저 회원가입 method
     * @param request
     * @return
     */
    public User inviteSingUpUpdate(User.UserInviteSignUpRequest request){
        this.createDate = LocalDate.now();
        this.nickname = request.getNickname();
        this.isChild = request.getIsChild();
        this.userBirth = LocalDate.parse(request.getUserBirth(), DateTimeFormatter.ISO_DATE);
        this.userGender = request.getUserGender();
        this.isActive = true;

        return this;
    }

    /**
     * 회원정보 수정 method
     * @param request
     */
    public void updateUserInfo(User.UserInfoUpdateRequest request){
        this.nickname = request.getNickname();
        this.userBirth = LocalDate.parse(request.getUserBirth(), DateTimeFormatter.ISO_DATE);
        this.userGender = request.getUserGender();
    }

    /**
     * 회원프로필 변경
     * @param userProfileImage
     */
    public void updateProfileImage(String userProfileImage){
        this.userProfileImage = userProfileImage;
    }

    /**
     * 회원정보 수정 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfoUpdateRequest{
        private Long userId;
        private String nickname;
        private String userBirth;
        private String userGender;
    }

    /**
     * 유저 회원가입 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserSignUpRequest{
        private String nickname;
        private Boolean isChild;
        private String userBirth;
        private String userGender;

        private String familyName;
    }

    /**
     * 유저 초대 회원가입 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInviteSignUpRequest{
        private String nickname;
        private Boolean isChild;
        private String userBirth;
        private String userGender;

        private String inviteCode;
    }

    /**
     * 유저 조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class UserInfoResponse{
        private Long userId;
        private String email;
        private String userName;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate createDate;
        private String nickname;
        private String userProfileImage;
        private String provider;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate userBirth;
        private String userGender;

        private Long familyId;
        private String familyName;
        private Long familyLeaderId;
        private String inviteCode;
        private Boolean isActive;

        List<UserInfoKidDto> kidDtoList;

        @Builder
        public UserInfoResponse(Long userId, String email, String userName, LocalDate createDate, String nickname, String userProfileImage, String provider, LocalDate userBirth, String userGender, Long familyId, String familyName, Long familyLeaderId, String inviteCode, List<UserInfoKidDto> kidDtoList) {
            this.userId = userId;
            this.email = email;
            this.userName = userName;
            this.createDate = createDate;
            this.nickname = nickname;
            this.userProfileImage = userProfileImage;
            this.provider = provider;
            this.userBirth = userBirth;
            this.userGender = userGender;
            this.familyId = familyId;
            this.familyName = familyName;
            this.familyLeaderId = familyLeaderId;
            this.inviteCode = inviteCode;
            this.kidDtoList = kidDtoList;
        }
    }

    /**
     * 유저 조회 kid DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class UserInfoKidDto{
        private Long kidId;
        private String kidName;
        private String kidProfileImage;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate kidBirth;

        @Builder
        public UserInfoKidDto(Long kidId, String kidName, String kidProfileImage, LocalDate kidBirth) {
            this.kidId = kidId;
            this.kidName = kidName;
            this.kidProfileImage = kidProfileImage;
            this.kidBirth = kidBirth;
        }
    }

}