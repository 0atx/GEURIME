package geurime.api.dto.common;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BasicResponse<T> {

    private String message;
    private T data;

    @Builder
    public BasicResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

}
