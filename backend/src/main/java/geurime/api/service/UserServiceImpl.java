package geurime.api.service;

import geurime.api.service.inferface.UserService;
import geurime.config.s3.S3Uploader;
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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final KidRepository kidRepository;
    private final S3Uploader s3Uploader;

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
     * 닉네임 중복체크
     * @param nickname
     * @return
     */
    @Override
    public Boolean checkNicknameExist(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if(user.isPresent()){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 유저 회원가입을 하고 가족 id를 반환한다.
     * @param userId
     * @param request
     * @return 가족 id
     */
    @Override
    public User.UserInfoResponse createNewUser(Long userId, User.UserSignUpRequest request, MultipartFile profileImage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        //중복닉네임 검사
        Optional<User> duplicateNickname = userRepository.findByNickname(request.getNickname());
        if(duplicateNickname.isPresent()){
            return null;
        }

        User.UserInfoResponse response = null;

        //이미 가족이 존재하면
        if(user.getFamily() != null){
            response = modelMapper.map(user, User.UserInfoResponse.class);
            return response;
        }

        //이미지 업로드 후 반환된 이미지경로 db에 저장
        if(profileImage != null && !profileImage.isEmpty()){
            String userProfileImage = s3Uploader.uploadAndGetUrl(profileImage);
            user.updateProfileImage(userProfileImage);
        }else{
            user.updateProfileImage("");
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

        response = modelMapper.map(user, User.UserInfoResponse.class);

        return response;
    }

    /**
     * 유저 회원가입을 하고 기존에 있는 가족에 추가한다.
     * @param userId
     * @param request
     * @param profileImage
     */
    @Override
    public User.UserInfoResponse createInvitedUser(Long userId, User.UserInviteSignUpRequest request, MultipartFile profileImage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        user.inviteSingUpUpdate(request);
        //이미지 업로드 후 반환된 이미지경로 db에 저장
        if(profileImage != null && !profileImage.isEmpty()){
            String userProfileImage = s3Uploader.uploadAndGetUrl(profileImage);
            user.updateProfileImage(userProfileImage);
        }else{
            user.updateProfileImage("");
        }

        //초대코드에 해당하는 가족에 추가
        Family family = familyRepository.findByInviteCode(request.getInviteCode());
        user.joinFamily(family);
        userRepository.save(user);

        return modelMapper.map(user, User.UserInfoResponse.class);
    }

    @Override
    public User.UserInfoResponse updateUserInfo(Long userId, User.UserInfoUpdateRequest request, MultipartFile imageFile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        Family family = familyRepository.findById(user.getFamily().getId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.FAMILY_NOT_FOUND_ERROR));
        family.changeName(request.getFamilyName());

        user.updateUserInfo(request);
        //이미지 업로드 후 반환된 이미지경로 db에 저장
        if(imageFile != null && !imageFile.isEmpty()){
            String userProfileImage = s3Uploader.uploadAndGetUrl(imageFile);
            user.updateProfileImage(userProfileImage);
        }
        return modelMapper.map(user, User.UserInfoResponse.class);
    }

    @Override
    public void deleteUser(Long userId) {
        //7일간 회원정보 유지하는 기능 추후 구현예정

        userRepository.deleteById(userId);

    }
}
