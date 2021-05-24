package com.finacial.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "MESSAGE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MESSAGE_ID")
    private Long messageId;

    private String content;

    @Column(name = "CREATE_USER_ID")
    private Long createId;

    //    @Column(name = "CONVERSATION_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID")
    @JsonIgnore
    private Conversation conversation;

    @Column(name = "CREATED_DATE")
    private Date createdDate;

}
