package com.finacial.controller;

import com.finacial.dto.*;
import com.finacial.model.Account;
import com.finacial.dto.ConversationSearchDto;
import com.finacial.repository.AccountRepository;
import com.finacial.service.IConversationService;
import com.finacial.service.IMessageService;
import com.finacial.ultils.ApplicationUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatController {

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    private IConversationService conversationService;
    @Autowired
    private IMessageService messageService;

    @Autowired
    private AccountRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @MessageMapping("/chat.message")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "*")
    public MessageDTO sendMessage(@Payload MessageDTO message) {
        message.setCreatedDateStr(ApplicationUtils.getTime());
        message.setMessageId(messageService.saveMessage(message).getMessageId());
        return message;
    }

    @MessageMapping("/chat.user")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "*")
    public MessageDTO addUser(@Payload MessageDTO message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getCreatedName());
        message.setCreatedDateStr(ApplicationUtils.getTime());
        return message;
    }

    @MessageMapping("/chat.chanel")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "*")
    public ConversationDTO createNewConversation(@Payload ConversationDTO dto) {
        ConversationDTO result = modelMapper.map(conversationService.createNewConversation(dto), ConversationDTO.class);
        return result;
    }

    @Scheduled(fixedDelay = 1000)
    public void sendAdhocMessage() {
        // Send the updated user count to the chat.
        template.convertAndSend("/topic/stats", ApplicationStats.getUserCount());
    }

    @PostMapping("/api/get_chat/{id}")
    public ResponseEntity<List<ConversationDTO>> getAllConversationByIdAccount(@PathVariable("id") Long id, @RequestBody RequestDto requestDto) {
        List<ConversationDTO> list = conversationService.findAllByPaticipantsIs(new Account(id), requestDto.getPage(), requestDto.getSize());

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/api/get_chats")
    public ResponseEntity<List<ConversationDTO>> getListUserByUsername(@RequestBody ConversationSearchDto requestDto) {
        List<ConversationDTO> result = conversationService.searchConversation(requestDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

