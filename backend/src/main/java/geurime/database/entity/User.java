package geurime.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.nio.channels.AsynchronousChannelGroup;
import java.time.LocalDate;
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

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column(name = "user_profile_image")
    private String userProfileImage;

    @Column(name = "simple_password", length = 6)
    private String simplePassword;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "provider", length = 10)
    private String provider;

    @Column(name = "is_child")
    private Boolean isChild;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Board> boardList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    @Builder
    public User(Long id, String email, String refreshToken, String userName, LocalDate createDate, String nickname, String userProfileImage, String simplePassword, Boolean isActive, String provider, Boolean isChild, List<Board> boardList, Family family) {
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @PrePersist
    public void prePersist() {
        this.isActive = true;
    }

    @Builder
    public User(Long id, String email, String provider, String refreshToken, String userName, LocalDate createDate, String nickname, String userProfileImage, String simplePassword, Boolean isActive, List<Kid> kidList, List<Board> boardList) {
        this.id = id;
        this.email = email;
        this.provider = provider;
        this.refreshToken = refreshToken;
        this.userName = userName;
        this.createDate = createDate;
        this.nickname = nickname;
        this.userProfileImage = userProfileImage;
        this.simplePassword = simplePassword;
        this.isActive = isActive;
        this.provider = provider;
        this.isChild = isChild;
        this.boardList = boardList;
        this.family = family;
    }

    public User update(String userName, String email) {
        this.userName = userName;
        this.email = email;
        return this;
    }

}