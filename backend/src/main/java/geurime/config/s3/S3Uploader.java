package geurime.config.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;
    private String os = System.getProperty("os.name").toLowerCase();
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return upload(uploadFile, dirName);
    }

    public String upload(File uploadFile, String filePath) {
        String fileName = filePath + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        uploadFile.delete(); // 로컬 파일 삭제
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        String pathname = System.getProperty("user.dir") + "/" + file.getOriginalFilename();
        //리눅스 환경 (서버)인 경우 경로변경
        if(!os.contains("win")){
            pathname = "\\home\\ubuntu\\static\\" + file.getOriginalFilename();
        }
        log.debug(pathname);
        File convertFile = new File(pathname);

        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        log.debug("파일이 생성되지 않음");
        return Optional.empty();
    }

    /**
     * 이미지를 s3에 업로드 후 경로를 반환한다.
     * @param multipartFile
     * @return
     */
    public String uploadAndGetUrl(MultipartFile multipartFile){
        String imageUrl = "";
        try {
            //imageUrl 사진경로
            imageUrl = uploadFile(multipartFile, "static");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imageUrl;
    }

    /**
     * 여러 이미지를 s3에 업로드 후 경로 리스트를 반환한다.
     * @param multipartFileList
     * @return
     */
    public List<String> uploadMultiAndGetUrl(List<MultipartFile> multipartFileList){
        List<String> imagePathList = new ArrayList<>();

        for (MultipartFile imageFile : multipartFileList){
            imagePathList.add(uploadAndGetUrl(imageFile));
        }
        return imagePathList;
    }
}

