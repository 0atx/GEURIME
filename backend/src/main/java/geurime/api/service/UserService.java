package geurime.api.service;

import geurime.database.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User.UserInfoResponse readUserInfo(Long userId);
    Long createNewUser(Long userId, User.UserSignUpRequest request, MultipartFile profileImage);
    void createInvitedUser(Long userId, User.UserInviteSignUpRequest request, MultipartFile profileImage);
    void updateUserInfo(Long userId, User.UserInfoUpdateRequest request, MultipartFile profileImage);
    void deleteUser(Long userId);
}
