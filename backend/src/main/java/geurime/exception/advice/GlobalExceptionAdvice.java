package geurime.exception.advice;

import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import geurime.exception.ExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {
    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException e) {
        return makeResponseEntity(e.getException());
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ExceptionResponse> runtimeExceptionHandler(RuntimeException e) {
        log.error(e.getMessage());
        return makeResponseEntity(CustomExceptionList.RUNTIME_EXCEPTION);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e) {
        log.error(e.getMessage());
        return makeResponseEntity(CustomExceptionList.INTERNAL_SERVER_ERROR);

    }

    private ResponseEntity makeResponseEntity(CustomExceptionList exceptionType) {
        return ResponseEntity
                .status(exceptionType.getStatus())
                .body(ExceptionResponse.builder()
                        .code(exceptionType.getCode())
                        .message(exceptionType.getMessage())
                        .build());
    }

}
