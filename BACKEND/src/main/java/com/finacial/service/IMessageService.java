package com.finacial.service;

import com.finacial.dto.MessageDTO;
import com.finacial.model.Message;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public interface IMessageService {
    @Transactional
    Message saveMessage(MessageDTO messageDTO);
}
