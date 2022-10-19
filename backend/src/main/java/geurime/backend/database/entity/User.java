package geurime.backend.database.entity;

import lombok.AccessLevel;
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
    private String refresh_token;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "user_profile_image")
    private String userProfileImage;

    @Column(name = "simple_password", nullable = false, length = 6)
    private String simplePassword;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    private List<Kid> kidList = new ArrayList<>();

}