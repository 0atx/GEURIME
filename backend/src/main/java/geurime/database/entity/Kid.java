package geurime.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
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

    @Column(name = "kid_name", length = 20)
    private String kidName;

    @Column(name = "kid_profile_image")
    private String kidProfileImage;

    @Column(name = "kid_birth")
    private LocalDate kidBirth;

    @OneToMany(mappedBy = "kid", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DrawingBox> drawingBoxList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    @Builder
    public Kid(Long id, String kidName, String kidProfileImage, LocalDate kidBirth, List<DrawingBox> drawingBoxList, Family family) {
        this.id = id;
        this.kidName = kidName;
        this.kidProfileImage = kidProfileImage;
        this.kidBirth = kidBirth;
        this.drawingBoxList = drawingBoxList;
        this.family = family;
    }
}