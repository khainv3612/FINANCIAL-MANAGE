package com.finacial.service;

import com.finacial.dto.MessageDTO;
import com.finacial.model.Message;
import com.finacial.repository.MessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class IMessageServiceImpl implements IMessageService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MessageRepository repository;

    @Override
    public Message saveMessage(MessageDTO messageDTO) {
        Message bo = modelMapper.map(messageDTO, Message.class);
        return repository.save(bo);
    }
}
