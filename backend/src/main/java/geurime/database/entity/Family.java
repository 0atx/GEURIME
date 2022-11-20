package geurime.database.entity;

import lombok.*;
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

    @Column(name = "invite_code")
    private String inviteCode;

    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "family", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Kid> kidList = new ArrayList<>();

    @Builder
    public Family(Long id, String familyName, Long familyLeaderId, String inviteCode, List<User> users, List<Kid> kidList) {
        this.id = id;
        this.familyName = familyName;
        this.familyLeaderId = familyLeaderId;
        this.inviteCode = inviteCode;
        this.users = users;
        this.kidList = kidList;
    }

    static final char[] BASE62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();

    public String makeInviteCode() {
        final var sb = new StringBuilder();
        int value = this.id.intValue() + 100_000;
        do{
            int i = value % 62;
            sb.append(BASE62[i]);
            value /= 62;
        } while( value > 0);
        return sb.toString();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class FamilyMemberResponse{
        private Long userId;
        private String nickname;
        private String userProfileImage;
        @Builder
        public FamilyMemberResponse(Long userId, String nickname, String userProfileImage) {
            this.userId = userId;
            this.nickname = nickname;
            this.userProfileImage = userProfileImage;
        }
    }

    public void addMember(User user){
        this.users.add(user);
    }
    public void removeMember(User user){
        this.users.remove(user);
    }

    public void changeName(String familyName){
        this.familyName = familyName;
    }

    public void setInviteCode(String inviteCode){
        this.inviteCode = inviteCode;
    }
}