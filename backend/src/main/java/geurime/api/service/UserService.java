package geurime.api.service;

import geurime.database.entity.User;

public interface UserService {
    User.UserInfoResponse readUserInfo(Long userId);
    void createNewUser(Long userId, User.UserSignUpRequest request);
    void createInvitedUser(Long userId, User.UserInviteSignUpRequest request);
    void updateUserInfo(Long userId, User.UserInfoUpdateRequest request);
    void deleteUser(Long userId);
}
