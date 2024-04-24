package com.krishna.sendresume.controller;

import com.krishna.sendresume.model.HrMail;
import com.krishna.sendresume.service.HrMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
public class HrMailController {

    @Autowired
    private HrMailService hrMailService;

    @GetMapping("/get-mails")
    public ResponseEntity<List<HrMail>> getAllMails()
    {
        return ResponseEntity.status(HttpStatus.OK).body(hrMailService.getAllMails());
    }

    @PostMapping("/add-mails-csv")
    public ResponseEntity<List<HrMail>> insertHrMail(@RequestParam("attachment") MultipartFile csvFile)
    {
        return ResponseEntity.status(HttpStatus.OK).body(hrMailService.addMail(csvFile));
    }

    @PostMapping("/add-mail")
    public ResponseEntity<HrMail> addHrMail(@RequestBody  HrMail mail)
    {
        return ResponseEntity.status(HttpStatus.OK).body(hrMailService.addHrMail(mail));
    }

    @DeleteMapping("/delete-mail")
    public ResponseEntity<Boolean> deleteAllHrMail(){
        return ResponseEntity.status(HttpStatus.OK).body(hrMailService.deleteAllHrMails());
    }
}
