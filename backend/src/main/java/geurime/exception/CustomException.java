package geurime.exception;

/*
 *
 * CustomException
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final CustomExceptionList exception;

    public CustomException(CustomExceptionList e) {
        super(e.getMessage());
        this.exception = e;
    }

}
