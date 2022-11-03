package geurime.api.service.inferface;

import geurime.database.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User.UserInfoResponse readUserInfo(Long userId);
    Boolean checkNicknameExist(String nickname);
    User.UserInfoResponse createNewUser(Long userId, User.UserSignUpRequest request, MultipartFile profileImage);
    User.UserInfoResponse createInvitedUser(Long userId, User.UserInviteSignUpRequest request, MultipartFile profileImage);
    User.UserInfoResponse updateUserInfo(Long userId, User.UserInfoUpdateRequest request, MultipartFile profileImage);
    void deleteUser(Long userId);
}
