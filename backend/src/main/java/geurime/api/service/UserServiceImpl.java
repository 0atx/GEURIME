package geurime.api.service;

import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import geurime.database.entity.User;
import geurime.database.repository.FamilyRepository;
import geurime.database.repository.KidRepository;
import geurime.database.repository.UserRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final KidRepository kidRepository;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    @Override
    public User.UserInfoResponse readUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        User.UserInfoResponse response = modelMapper.map(user, User.UserInfoResponse.class);

        return response;
    }

    @Override
    public void createNewUser(Long userId, User.UserSignUpRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        //새 가족 생성
        user.singUpUpdate(request);
        Family family = Family.builder()
                .familyName(request.getFamilyName())
                .familyLeaderId(userId)
                .build();

        family.setInviteCode(family.makeInviteCode());
        familyRepository.save(family);

        user.joinFamily(family);
        userRepository.save(user);

        //자녀 생성
        Kid kid = Kid.builder()
                .kidName(request.getKidName())
                .kidProfileImage(request.getKidProfileImage())
                .kidBirth(LocalDate.parse(request.getKidBirth(), DateTimeFormatter.ISO_DATE))
                .build();
        kid.joinFamily(family);
        kidRepository.save(kid);
    }

    @Override
    public void createInvitedUser(Long userId, User.UserInviteSignUpRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        user.inviteSingUpUpdate(request);

        //초대코드에 해당하는 가족에 추가
        Family family = familyRepository.findByInviteCode(request.getInviteCode());
        user.joinFamily(family);
        userRepository.save(user);
    }

    @Override
    public void updateUserInfo(Long userId, User.UserInfoUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        user.updateUserInfo(request);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        user.disableUser();
    }
}
