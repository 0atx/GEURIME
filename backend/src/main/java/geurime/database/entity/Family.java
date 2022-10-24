package geurime.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "family")
public class Family {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "family_id", nullable = false)
    private Long id;

    @Column(name = "family_name", length = 20)
    private String familyName;

    @Column(name = "family_leader_id")
    private Long familyLeaderId;

    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Kid> kidList = new ArrayList<>();

    @Builder
    public Family(Long id, String familyName, Long familyLeaderId, List<User> users, List<Kid> kidList) {
        this.id = id;
        this.familyName = familyName;
        this.familyLeaderId = familyLeaderId;
        this.users = users;
        this.kidList = kidList;
    }
}