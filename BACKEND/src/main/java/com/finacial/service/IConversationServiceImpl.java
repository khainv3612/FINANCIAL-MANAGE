package com.finacial.service;

import com.finacial.dto.ConversationDTO;
import com.finacial.model.Account;
import com.finacial.model.Conversation;
import com.finacial.repository.ConversationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service("conversationService")
public class IConversationServiceImpl implements IConversationService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ConversationRepository repository;

    @Override
    public Conversation createNewConversation(ConversationDTO dto) {
        Conversation bo = modelMapper.map(dto, Conversation.class);
        return repository.save(bo);
    }

    @Override
    public List<Conversation> getAll() {
        return repository.findAll();
    }

    @Override
    public List<ConversationDTO> findAllByPaticipantsIs(Account account, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("conversationId").descending());
        List<Conversation> list = repository.findAllByPaticipantsIs(account, pageable);
        List<ConversationDTO> result = new ArrayList<>();
        if (null != list) {
            result = Arrays.asList(modelMapper.map(list, ConversationDTO[].class));
        }
        return result;
    }
}
