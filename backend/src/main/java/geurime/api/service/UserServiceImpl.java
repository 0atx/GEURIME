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
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final KidRepository kidRepository;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    /**
     * 유저에 연관된 가족, 자녀에 대한 정보를 함께 불러온다
     * @param userId
     * @return
     */
    @Override
    public User.UserInfoResponse readUserInfo(Long userId) {
        User user = userRepository.findByIdFetch(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        User.UserInfoResponse response = modelMapper.map(user, User.UserInfoResponse.class);

        response.setInviteCode(user.getFamily().getInviteCode());

        List<Kid> kidList = kidRepository.findByFamily(user.getFamily());
        List<User.UserInfoKidDto> kidDtoList = new ArrayList<>(kidList.size());

        for (Kid kid : kidList){
            User.UserInfoKidDto kidDto = User.UserInfoKidDto.builder()
                    .kidId(kid.getId())
                    .kidName(kid.getKidName())
                    .kidProfileImage(kid.getKidProfileImage())
                    .kidBirth(kid.getKidBirth())
                    .build();
            kidDtoList.add(kidDto);
        }

        response.setKidDtoList(kidDtoList);

        return response;
    }

    /**
     * 유저 회원가입을 하고 가족 id를 반환한다.
     * @param userId
     * @param request
     * @return 가족 id
     */
    @Override
    public Long createNewUser(Long userId, User.UserSignUpRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        //이미 가족이 존재하면
        if(user.getFamily() != null){
            return user.getFamily().getId();
        }

        //새 가족 생성
        user.singUpUpdate(request);
        Family family = Family.builder()
                .familyName(request.getFamilyName())
                .familyLeaderId(userId)
                .build();

        familyRepository.save(family);
        family.setInviteCode(family.makeInviteCode());

        user.joinFamily(family);
        userRepository.save(user);

        return family.getId();
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
        //7일간 회원정보 유지하는 기능 추후 구현예정

        userRepository.deleteById(userId);

    }
}
