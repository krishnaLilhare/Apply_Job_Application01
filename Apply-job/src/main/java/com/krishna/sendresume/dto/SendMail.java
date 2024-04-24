package com.krishna.sendresume.dto;

import lombok.Data;

import java.io.File;

@Data
public class SendMail {
    
    private String to;
    private String subject;
    private String message;
    private String file;
}
