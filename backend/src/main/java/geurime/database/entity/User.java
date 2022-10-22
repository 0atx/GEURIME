package geurime.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "user_profile_image")
    private String userProfileImage;

    @Column(name = "simple_password", nullable = false, length = 6)
    private String simplePassword;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Board> boardList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family user;

    @Builder
    public User(Long id, String email, String refreshToken, String userName, LocalDate createDate, String nickname, String userProfileImage, String simplePassword, Boolean isActive, List<Board> boardList, Family user) {
        this.id = id;
        this.email = email;
        this.refreshToken = refreshToken;
        this.userName = userName;
        this.createDate = createDate;
        this.nickname = nickname;
        this.userProfileImage = userProfileImage;
        this.simplePassword = simplePassword;
        this.isActive = isActive;
        this.boardList = boardList;
        this.user = user;
    }
}