package com.finacial.service;

import com.finacial.dto.ConversationDTO;
import com.finacial.model.Account;
import com.finacial.model.Conversation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Qualifier("conversationService")
public interface IConversationService {
    @Transactional
    Conversation createNewConversation(ConversationDTO conversation);


    List<Conversation> getAll();
    List<ConversationDTO> findAllByPaticipantsIs(Account account);
}
