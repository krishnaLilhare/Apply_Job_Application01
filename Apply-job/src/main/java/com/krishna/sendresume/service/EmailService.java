package com.krishna.sendresume.service;

import com.krishna.sendresume.model.HrMail;
import com.krishna.sendresume.repository.HrMailRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private HrMailRepository hrMailRepository;

    public String sendEmailWithAttachment(String subject, String message, MultipartFile attachment) throws MessagingException, IOException {

        try {
            MimeMessage mes = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mes, true);

            List<HrMail> hrMails = new ArrayList<>();

            hrMails = hrMailRepository.findAll();

            for(HrMail hrMail : hrMails){

                if(!hrMail.getHrMail().isEmpty()) {
                    System.out.println("mail is sending to ... = "+hrMail.getHrMail().replace("\"",""));
                    helper.setTo(hrMail.getHrMail());
                    helper.setSubject(subject);
                    helper.setText(message);

                    System.out.println("resume file is attach..............");
                    //FileSystemResource file = new FileSystemResource(new File(sendMail.getFile()));
                    helper.addAttachment("resume.pdf", attachment);
                    System.out.println("resume file attach done............");
                    System.out.println("now..... mail sending process ............");
                    mailSender.send(mes);
                    hrMail.setDateOfSend(new Date());
                    hrMail.setSend(true);
                    hrMailRepository.save(hrMail);
                }
            }
//            helper.setTo("chaudharipankaj415@gmail.com");
//            helper.setSubject(subject);
//            helper.setText(message);
//

//            System.out.println("resume file is attach..............");
//            // FileSystemResource file = new FileSystemResource(new File(sendMail.getFile()));
//            helper.addAttachment("resume.pdf", attachment);
//            System.out.println("resume file attach done............");
//            System.out.println("now,//..... mail sending process ............");
//            mailSender.send(mes);
            return "All mail send successful.................";
        }catch (Exception e)
        {
            e.printStackTrace();;
        }
        return  "mail send fail..............";
    }
}
