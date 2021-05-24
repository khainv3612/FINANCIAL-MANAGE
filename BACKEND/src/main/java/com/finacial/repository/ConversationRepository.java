package com.finacial.repository;

import com.finacial.model.Account;
import com.finacial.model.Conversation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @EntityGraph(value = "Conversation.messages.paticipants", type = EntityGraph.EntityGraphType.FETCH)
    List<Conversation> findAll();
    @EntityGraph(value = "Conversation.messages.paticipants", type = EntityGraph.EntityGraphType.FETCH)
    List<Conversation> findAllByPaticipantsIs(Account account);
}
