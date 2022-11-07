package geurime.database.repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import net.bytebuddy.asm.Advice;

import java.time.LocalDate;

/**
 * A Projection for the {@link geurime.database.entity.Drawing} entity
 */
public interface DrawingInfo {
    LocalDate getCreateTime();
    Long getCount();
}