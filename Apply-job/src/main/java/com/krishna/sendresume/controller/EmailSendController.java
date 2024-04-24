package com.krishna.sendresume.controller;

import com.krishna.sendresume.dto.SendMail;
import com.krishna.sendresume.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class EmailSendController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-mail")
    public ResponseEntity<String> sendMail(
            @RequestParam("subject") String subject,
            @RequestParam("message") String message,
            @RequestParam("attachment") MultipartFile attachment) throws MessagingException, IOException {

      return  ResponseEntity.status(HttpStatus.OK).body(emailService.sendEmailWithAttachment(subject,message,attachment));
    }
}
