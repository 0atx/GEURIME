package geurime.api.service;

import geurime.database.entity.Kid;

public interface KidService {
    Kid.KidInfoResponse readKidInfo(Long kidId);
    Long createKid(Kid.KidPostRequest request);
    Long updateKid(Kid.KidPutRequest request);
    void deleteKid(Long kidId);
}
