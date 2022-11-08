package geurime.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

/**
 * A Projection for the {@link geurime.database.entity.Drawing} entity
 */
public interface CountHeatMapResponse {
    @JsonFormat(pattern = "yyyy/MM/dd")
    LocalDate getCreateTime();
    Long getCount();
}