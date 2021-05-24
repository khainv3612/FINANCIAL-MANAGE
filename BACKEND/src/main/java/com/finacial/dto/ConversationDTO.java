package com.finacial.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.finacial.model.Account;
import com.finacial.model.Message;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ConversationDTO implements Serializable,Comparable<ConversationDTO> {
    private Long conversationId;
    private Long adminId;
    private String conversationName;
    private Date createDate;

    private List<Message> messages;
    private List<Account> paticipants;

    @Override
    public int compareTo(ConversationDTO o) {
        return this.getConversationId().compareTo(o.getConversationId());
    }
}
