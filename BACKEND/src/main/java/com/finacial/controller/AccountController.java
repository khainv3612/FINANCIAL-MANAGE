package com.finacial.controller;

import com.finacial.config.Constants;
import com.finacial.dto.AccountDTO;
import com.finacial.dto.AccountSearchDto;
import com.finacial.dto.MessageResponse;
import com.finacial.dto.RequestDto;
import com.finacial.security.service.TokenVerifyService;
import com.finacial.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {
    @Autowired
    TokenVerifyService tokenVerifyService;
    @Autowired
    private IAccountService accountService;

    @GetMapping("/active/**")
    public RedirectView activeAccount(HttpServletRequest request) {
        String token = request.getRequestURI().split(request.getContextPath() + "/active/")[1];
        MessageResponse messageResponse = tokenVerifyService.VerifyToken(token);
        RedirectView redirectView = new RedirectView();
        switch (messageResponse.getMessage()) {
            case Constants
                    .activeSuccess: {
                redirectView.setUrl("http://localhost:4200/login");
                break;
            }
            case Constants
                    .activeExpired: {
                redirectView.setUrl("http://localhost:4200/active_expired");
                break;
            }
            case Constants
                    .activeUnSuccess: {
                redirectView.setUrl("http://localhost:4200/error_page");
                break;
            }
            default: {
                break;
            }
        }
        return redirectView;
    }

    @PostMapping("/api/get_friends")
    public ResponseEntity<List<AccountDTO>> getListUserByUsername(@RequestBody AccountSearchDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.getPage(), requestDto.getSize());
        List<AccountDTO> result = accountService.findAllByUsernameContaining(requestDto.getKey(), pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
