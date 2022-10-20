package geurime.backend.database.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_image")
public class BoardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_image_id", nullable = false)
    private Long id;

    @Column(name = "board_image_path", nullable = false)
    private String boardImagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_board_id")
    private Board board;

}