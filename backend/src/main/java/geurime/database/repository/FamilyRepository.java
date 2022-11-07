package geurime.database.repository;

import geurime.database.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<Family, Long> {
    Family findByInviteCode(String inviteCode);

}