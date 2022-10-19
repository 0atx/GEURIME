package geurime.backend.database.entity;

import geurime.backend.database.enums.BoxType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "drawing_box")
public class DrawingBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drawing_id", nullable = false)
    private Long id;

    @Column(name = "drawing_box_name", nullable = false, length = 40)
    private String drawingBoxName;

    @Column(name = "drawing_box_category", nullable = false)
    private BoxType drawingBoxCategory;
}