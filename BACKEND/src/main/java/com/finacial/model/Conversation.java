package com.finacial.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "CONVERSATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CONVERSATION_ID")
    private Long conversationId;
    @Column(name = "ADMIN_ID")
    private Long adminId;
    @Column(name = "CONVERSATION_NAME")
    private String conversationName;
    @Column(name = "CREATE_DATE")
    private Date createDate;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Message> messages;

    @ManyToMany
    @JoinTable(name = "conversation_paticipants",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "paticipants_id"))
    private List<Account> paticipants;

}
