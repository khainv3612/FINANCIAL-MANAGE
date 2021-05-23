package com.finacial.controller;

import com.finacial.dto.ApplicationStats;
import com.finacial.dto.MessageDTO;
import com.finacial.ultils.ApplicationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class ChatController {

    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/chat.message")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "*")
    public MessageDTO sendMessage(@Payload MessageDTO message) {
        message.setCreatedDateStr(ApplicationUtils.getTime());
        return message;
    }

    @MessageMapping("/chat.user")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "*")
    public MessageDTO addUser(@Payload MessageDTO message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getUsername());
        message.setCreatedDateStr(ApplicationUtils.getTime());
        return message;
    }

    @Scheduled(fixedDelay = 1000)
    public void sendAdhocMessage() {
        // Send the updated user count to the chat.
        template.convertAndSend("/topic/stats", ApplicationStats.getUserCount());
    }
}

