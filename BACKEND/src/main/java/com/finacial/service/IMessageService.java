package com.finacial.service;

import com.finacial.dto.MessageDTO;
import com.finacial.model.Message;
import org.springframework.stereotype.Service;

@Service
public interface IMessageService {
    Message saveMessage(MessageDTO messageDTO);
}
