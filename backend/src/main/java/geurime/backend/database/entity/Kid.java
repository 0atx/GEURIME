package geurime.backend.database.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "kid")
public class Kid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kid_id", nullable = false)
    private Long id;

    @Column(name = "kid_name", nullable = false, length = 20)
    private String kidName;

    @Column(name = "kid_profile_image")
    private String kidProfileImage;

    @Column(name = "kid_gender", length = 1)
    private String kidGender;

    @Column(name = "kid_birth")
    private LocalDate kidBirth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "kid", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DrawingBox> drawingBoxList = new ArrayList<>();



}