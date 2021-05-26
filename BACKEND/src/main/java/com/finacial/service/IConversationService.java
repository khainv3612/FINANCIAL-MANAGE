package com.finacial.service;

import com.finacial.dto.ConversationDTO;
import com.finacial.model.Account;
import com.finacial.model.Conversation;
import com.finacial.dto.ConversationSearchDto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Qualifier("conversationService")
public interface IConversationService {
    @Transactional
    Conversation createNewConversation(ConversationDTO conversation);


    List<Conversation> getAll();

    List<ConversationDTO> findAllByPaticipantsIs(Account account, int page, int size);

    List<ConversationDTO> searchConversation(ConversationSearchDto dto);
}
