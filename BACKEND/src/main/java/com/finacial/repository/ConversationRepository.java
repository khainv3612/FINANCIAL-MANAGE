package com.finacial.repository;

import com.finacial.model.Account;
import com.finacial.model.Conversation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findAll();

    List<Conversation> findAllByPaticipantsContains(Account account, Pageable pageable);

    List<Conversation> findAllByPaticipantsContainsAndConversationNameContains(Account account, String name, Pageable pageable);
}
