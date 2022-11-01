package geurime.api.service;

import geurime.database.entity.Kid;
import org.springframework.web.multipart.MultipartFile;

public interface KidService {
    Kid.KidInfoResponse readKidInfo(Long kidId);
    Long createKid(Kid.KidPostRequest request, MultipartFile profileImage);
    Long updateKid(Kid.KidPutRequest request, MultipartFile profileImage);
    void deleteKid(Long kidId);
}
