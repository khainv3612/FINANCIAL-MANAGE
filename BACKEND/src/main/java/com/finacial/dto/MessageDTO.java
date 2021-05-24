package com.finacial.dto;

import com.finacial.model.Conversation;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageDTO implements Comparable<MessageDTO> {
    private Long messageId;
    private Long createId;
    private String username;
    private String content;
    private Type type;
    private String createdDateStr;
    private Date createdDate;
    private Conversation conversation;

    public MessageDTO() {
    }

    public MessageDTO(Builder builder) {
        this.username = builder.username;
        this.content = builder.content;
        this.type = builder.type;
        this.createdDateStr = builder.createDate;
        this.createdDate = builder.createdDate;
        this.messageId = builder.messageId;
        this.createId = builder.createId;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getCreatedDateStr() {
        return createdDateStr;
    }

    public void setCreatedDateStr(String createdDateStr) {
        this.createdDateStr = createdDateStr;
    }

    @Override
    public int compareTo(MessageDTO o) {
        return this.getMessageId().compareTo(o.getMessageId());
    }

    public enum Type {
        CHAT, JOIN, LEAVE
    }

    public static class Builder {
        private Long messageId;
        private String username;
        private String content;
        private Type type;
        private String createDate;
        private Date createdDate;
        private Long createId;

        public Builder(String username, String content) {
            this.username = username;
            this.content = content;
        }

        public Builder ofType(Type type) {
            this.type = type;
            return this;
        }

        public Builder atTime(String createDate) {
            this.createDate = createDate;
            return this;
        }

        public MessageDTO build() {
            return new MessageDTO(this);
        }
    }
}
