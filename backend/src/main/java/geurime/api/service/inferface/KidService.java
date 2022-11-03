package geurime.api.service.inferface;

import geurime.database.entity.Kid;
import org.springframework.web.multipart.MultipartFile;

public interface KidService {
    Kid.KidInfoResponse readKidInfo(Long kidId);
    Kid.KidInfoResponse createKid(Kid.KidPostRequest request, MultipartFile profileImage);
    Kid.KidInfoResponse updateKid(Kid.KidPutRequest request, MultipartFile profileImage);
    void deleteKid(Long kidId);
}
