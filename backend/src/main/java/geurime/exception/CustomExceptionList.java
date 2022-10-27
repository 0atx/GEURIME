package geurime.exception;

/*
 *
 * CustomExceptionList
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum CustomExceptionList {

    REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E001", "리프레쉬 토큰 오류입니다."),
    USER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E002", "존재하지 않는 회원입니다."),
    ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E003", "엑세스 토큰 오류입니다."),
    DRAWING_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E004", "존재하지 않는 그림 기록입니다."),
    DRAWING_BOX_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E005", "존재하지 않는 그림 보관함입니다."),
    KID_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E006", "존재하지 않는 자녀입니다."),
    BOARD_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E007", "존재하지 않는 게시글입니다.");

    private final HttpStatus status;
    private final String code;
    private String message;


    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

}
