package com.finacial.service;

import com.finacial.dto.MessageDTO;
import com.finacial.model.Message;
import com.finacial.repository.MessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("messageService")
public class IMessageServiceImpl implements IMessageService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MessageRepository repository;

    @Override
    public Message saveMessage(MessageDTO messageDTO) {
        messageDTO.setCreatedDate(new Date());
        Message bo = modelMapper.map(messageDTO, Message.class);
        bo.setCreatedDate(new Date());
        return repository.save(bo);
    }

    @Override
    public List<MessageDTO> getAllByConversationId(Long id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("messageId").descending());
        List<Message> list = repository.findAllByConversation_ConversationId(id, pageable);
        List<MessageDTO> result = new ArrayList<>();
        if (null != list && !list.isEmpty()) {
            result = Arrays.asList(modelMapper.map(list, MessageDTO[].class));
            Collections.sort(result);
        }
        return result;
    }
}
