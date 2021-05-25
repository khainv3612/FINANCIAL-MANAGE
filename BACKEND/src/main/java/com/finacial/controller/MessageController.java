package com.finacial.controller;

import com.finacial.dto.MessageDTO;
import com.finacial.dto.RequestDto;
import com.finacial.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {
    @Autowired
    private IMessageService messageService;

    @PostMapping("/api/get_message/{id}")
    public ResponseEntity<List<MessageDTO>> getAllMessageByConvId(@PathVariable("id") Long id, @RequestBody RequestDto requestDto) {
        List<MessageDTO> result = messageService.getAllByConversationId(id, requestDto.getPage(), requestDto.getSize());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
