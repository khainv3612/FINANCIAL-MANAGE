package com.finacial.service;

import com.finacial.model.Conversation;
import org.springframework.stereotype.Service;

@Service
public interface IConversationService {
    Conversation save(Conversation conversation);
}
