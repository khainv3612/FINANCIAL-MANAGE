package com.finacial.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "MESSAGE")
@Data
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
    @ManyToOne
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;

    @Column(name = "CREATED_DATE")
    private Date createdDate;

}
