package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public void joinFamily(Family family){
        this.family = family;
    }

    public void updateKidInfo(Kid.KidPutRequest request){
        this.kidName = request.getKidName();
        this.kidBirth = LocalDate.parse(request.getKidBirth(), DateTimeFormatter.ISO_DATE);
    }

    public void updateProfile(String kidProfileImage){
        this.kidProfileImage = kidProfileImage;
    }

    /**
     * 자녀 수정 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KidPutRequest{
        private Long kidId;
        private String kidName;
        private String kidBirth;
    }

    /**
     * 자녀 등록 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KidPostRequest{
        private Long familyId;
        private String kidName;
        private String kidBirth;
    }

    /**
     * 자녀 정보 조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class KidInfoResponse{
        private Long kidId;
        private String kidName;
        private String kidProfileImage;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate kidBirth;
        private List<DrawingBoxDto> drawingBoxDtoList;

        @Builder
        public KidInfoResponse(Long kidId, String kidName, String kidProfileImage, LocalDate kidBirth, List<DrawingBoxDto> drawingBoxDtoList) {
            this.kidId = kidId;
            this.kidName = kidName;
            this.kidProfileImage = kidProfileImage;
            this.kidBirth = kidBirth;
            this.drawingBoxDtoList = drawingBoxDtoList;
        }
    }

    /**
     * 그림 보관함 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingBoxDto {
        private Long drawingBoxId;
        private String drawingBoxName;
        private String drawingBoxCategory;
    }
}