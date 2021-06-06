package com.finacial.service;

import com.finacial.dto.ConversationDTO;
import com.finacial.model.Account;
import com.finacial.model.Conversation;
import com.finacial.dto.ConversationSearchDto;
import com.finacial.repository.ConversationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service("conversationService")
public class IConversationServiceImpl implements IConversationService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ConversationRepository repository;

    @Override
    public Conversation createNewConversation(ConversationDTO dto) {
        dto.setCreateDate(new Date());
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
        List<Conversation> list = repository.findAllByPaticipantsContains(account, pageable);
        return convertBoToDto(list);
    }

    @Override
    public List<ConversationDTO> searchConversation(ConversationSearchDto dto) {
        Pageable page = PageRequest.of(dto.getPage(), dto.getSize(), Sort.by("conversationId").descending());
        List<Conversation> list = repository.findAllByPaticipantsContainsAndConversationNameContains(new Account(dto.getIdUser()), dto.getKey().trim(), page);
        return convertBoToDto(list);
    }

    private List<ConversationDTO> convertBoToDto(List<Conversation> list) {
        List<ConversationDTO> result = new ArrayList<>();
        if (null != list) {
            result = Arrays.asList(modelMapper.map(list, ConversationDTO[].class));
        }
        return result;
    }
}
